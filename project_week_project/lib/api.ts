import { CommunityAlert, Coordinates, DisasterEvent, SeverityLevel } from "@/types";
import { haversineDistance } from "./geo";

const USGS_ENDPOINT = "https://earthquake.usgs.gov/fdsnws/event/1/query";
const EONET_ENDPOINT = "https://eonet.gsfc.nasa.gov/api/v3/events?status=open";
const DEFAULT_ALERT_FEED =
  process.env.NEXT_PUBLIC_NWS_ALERT_FEED ??
  "https://api.weather.gov/alerts/active?status=actual&message_type=alert";

const magnitudeToSeverity = (mag?: number): SeverityLevel => {
  if (!mag || Number.isNaN(mag)) return "info";
  if (mag >= 6) return "emergency";
  if (mag >= 4) return "alert";
  return "info";
};

const categoryToSeverity = (category?: string): SeverityLevel => {
  if (!category) return "info";
  const normalized = category.toLowerCase();
  if (["wildfire", "volcano", "severe storms"].some((label) => normalized.includes(label))) {
    return "emergency";
  }
  if (["earthquake", "floods", "hurricanes"].some((label) => normalized.includes(label))) {
    return "alert";
  }
  return "info";
};

const nwsSeverityToLevel = (severity?: string): SeverityLevel => {
  switch (severity?.toLowerCase()) {
    case "extreme":
    case "severe":
      return "emergency";
    case "moderate":
      return "alert";
    default:
      return "info";
  }
};

type FetchDisastersInput = {
  location: Coordinates;
  radiusKm: number;
};

export async function fetchEarthquakes({
  location,
  radiusKm,
}: FetchDisastersInput): Promise<DisasterEvent[]> {
  const params = new URLSearchParams({
    format: "geojson",
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    maxradiuskm: radiusKm.toString(),
    limit: "25",
    orderby: "time",
  });

  const response = await fetch(`${USGS_ENDPOINT}?${params.toString()}`, {
    headers: { "User-Agent": "community-pulse" },
  });

  if (!response.ok) {
    throw new Error("Unable to contact USGS");
  }

  const payload = await response.json() as {
    features?: Array<{
      id: string;
      geometry: { coordinates: [number, number, number] };
      properties: {
        mag?: number;
        title?: string;
        place?: string;
        time: number;
      };
    }>;
  };

  return (payload.features ?? []).map((feature) => {
    const [lng, lat] = feature.geometry.coordinates;
    const magnitude = Number(feature.properties.mag);
    const coordinates = { latitude: lat, longitude: lng };
    return {
      id: feature.id,
      title: feature.properties.title ?? "Earthquake",
      description: feature.properties.place ?? "Nearby seismic activity detected.",
      source: "USGS" as const,
      coordinates,
      magnitude: Number.isFinite(magnitude) ? magnitude.toFixed(1) : "N/A",
      severity: magnitudeToSeverity(magnitude),
      distanceKm: haversineDistance(location, coordinates),
      timestamp: new Date(feature.properties.time).toISOString(),
    };
  });
}

export async function fetchEonetEvents({
  location,
  radiusKm,
}: FetchDisastersInput): Promise<DisasterEvent[]> {
  const response = await fetch(EONET_ENDPOINT, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Unable to contact NASA EONET");
  }

  const payload = await response.json() as {
    events?: Array<{
      id: string;
      title: string;
      description?: string;
      geometry?: Array<{
        coordinates: [number, number] | number[];
        date?: string;
      }>;
      categories?: Array<{ title?: string }>;
    }>;
  };
  const events = payload.events ?? [];

  return events
    .map((event) => {
      const geometry = event.geometry?.[0];
      if (!geometry) return null;

      const coords = geometry.coordinates;
      const [lng, lat] =
        typeof coords?.[0] === "number" && typeof coords?.[1] === "number"
          ? coords
          : [0, 0];
      const coordinates = {
        latitude: lat,
        longitude: lng,
      };

      const distance = haversineDistance(location, coordinates);
      if (distance > radiusKm) return null;

      const categoryName = event.categories?.[0]?.title ?? "";

      return {
        id: event.id,
        title: event.title,
        description: event.description ?? categoryName ?? "Environmental event",
        source: "NASA EONET" as const,
        coordinates,
        distanceKm: distance,
        magnitude: categoryName,
        severity: categoryToSeverity(categoryName),
        timestamp: new Date(geometry.date ?? Date.now()).toISOString(),
      };
    })
    .filter(Boolean) as DisasterEvent[];
}

export async function fetchNearbyDisasters(input: FetchDisastersInput): Promise<DisasterEvent[]> {
  const [earthquakes, eonet] = await Promise.allSettled([
    fetchEarthquakes(input),
    fetchEonetEvents(input),
  ]);

  const combined: DisasterEvent[] = [];

  if (earthquakes.status === "fulfilled") {
    combined.push(...earthquakes.value);
  }

  if (eonet.status === "fulfilled") {
    combined.push(...eonet.value);
  }

  // Sort by timestamp descending
  return combined.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
}

export async function fetchCommunityAlerts(): Promise<CommunityAlert[]> {
  const response = await fetch(DEFAULT_ALERT_FEED, {
    headers: { "User-Agent": "community-pulse" },
    cache: "no-store",
  });

  if (!response.ok) {
    return mockCommunityAlerts();
  }

  const payload = await response.json() as {
    features?: Array<{
      id: string;
      properties: {
        headline?: string;
        event?: string;
        description?: string;
        instruction?: string;
        areaDesc?: string;
        sent?: string;
        effective?: string;
        senderName?: string;
        severity?: string;
      };
    }>;
  };
  const alerts = payload.features ?? [];

  if (!alerts.length) {
    return mockCommunityAlerts();
  }

  return alerts.slice(0, 20).map((alert) => ({
    id: alert.id,
    headline: alert.properties.headline ?? alert.properties.event ?? "Community alert",
    description:
      alert.properties.description ??
      alert.properties.instruction ??
      "Stay tuned for additional information.",
    area: alert.properties.areaDesc ?? "Local area",
    updated: alert.properties.sent ?? alert.properties.effective ?? new Date().toISOString(),
    source: alert.properties.senderName ?? "NWS",
    level: nwsSeverityToLevel(alert.properties.severity),
  }));
}

function mockCommunityAlerts(): CommunityAlert[] {
  const now = new Date();
  return [
    {
      id: "mock-1",
      headline: "Cooling center open downtown",
      description:
        "City has activated the downtown wellness center with 150 beds, cold water, and translation services.",
      area: "Downtown core",
      updated: now.toISOString(),
      level: "info",
      source: "City Resilience Office",
    },
    {
      id: "mock-2",
      headline: "Road closure near riverfront",
      description: "North River Drive is closed due to high water. Use 8th Avenue as a detour.",
      area: "Riverfront district",
      updated: new Date(now.getTime() - 1000 * 60 * 45).toISOString(),
      level: "alert",
      source: "Public Works",
    },
    {
      id: "mock-3",
      headline: "Shelter activated at East High",
      description:
        "Severe storms expected tonight. East High gym is open as an overnight shelter with medical staff on site.",
      area: "Eastborough",
      updated: new Date(now.getTime() - 1000 * 60 * 90).toISOString(),
      level: "emergency",
      source: "Emergency Management",
    },
  ];
}

