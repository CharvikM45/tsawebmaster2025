"use client";

import { useLocation } from "@/hooks/useLocation";
import { fetchNearbyDisasters } from "@/lib/api";
import { DisasterEvent } from "@/types";
import { Waves } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { DisasterCard } from "./DisasterCard";
import { ErrorState } from "./ErrorState";
import { LoadingState } from "./LoadingState";
import { LocationInput } from "./LocationInput";
import { MapView } from "./MapView";
import { RefreshButton } from "./RefreshButton";

export function DisasterFeed() {
  const { location, status, error, setLocation, requestLocation } = useLocation();
  const [radius, setRadius] = useState(150);
  const [events, setEvents] = useState<DisasterEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const canRequestLocation = status !== "resolving";

  const loadDisasters = useCallback(async () => {
    if (!location) return;
    setLoading(true);
    setFetchError(null);
    try {
      const data = await fetchNearbyDisasters({ location, radiusKm: radius });
      setEvents(data);
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : "Unable to fetch disasters");
    } finally {
      setLoading(false);
    }
  }, [location, radius]);

  useEffect(() => {
    if (!location) {
      requestLocation();
    }
  }, [location, requestLocation]);

  useEffect(() => {
    if (location) {
      loadDisasters();
    }
  }, [location, radius, loadDisasters]);

  const handleManualLocation = (lat: number, lng: number) => {
    setLocation({ latitude: lat, longitude: lng });
  };

  const renderContent = () => {
    if (!location && status === "resolving") {
      return <LoadingState label="Requesting your location..." />;
    }

    if (!location) {
      return (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
          <p>
            We&apos;re waiting for a location to show nearby disasters. Use the &quot;Use my
            location&quot; button or enter coordinates manually.
          </p>
        </div>
      );
    }

    if (loading) {
      return <LoadingState label="Analyzing nearby hazards..." />;
    }

    if (fetchError) {
      return <ErrorState message={fetchError} onRetry={loadDisasters} />;
    }

    if (events.length === 0) {
      return (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
          <p>No recent disasters found within your selected radius. Stay safe and check again.</p>
          <RefreshButton onClick={loadDisasters} className="mt-4" />
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <MapView center={[location.latitude, location.longitude]} disasters={events} />
        <div className="grid gap-5 md:grid-cols-2">
          {events.map((event) => (
            <DisasterCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">
        <div>
          <p className="text-sm font-semibold text-white">Location-based natural disaster feed</p>
          <p className="text-xs text-slate-400">
            Uses browser geolocation with manual fallback and radius control.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 text-xs text-slate-400">
          <Waves className="size-4 text-calm" aria-hidden />
          {location
            ? `Lat ${location.latitude.toFixed(2)}, Lng ${location.longitude.toFixed(2)}`
            : "Awaiting coordinates"}
        </div>
      </div>

      <LocationInput
        latitude={location?.latitude}
        longitude={location?.longitude}
        radius={radius}
        onRadiusChange={setRadius}
        onSubmit={handleManualLocation}
        onLocate={canRequestLocation ? requestLocation : undefined}
        loading={status === "resolving"}
      />

      {error ? (
        <p className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-100">
          {error}. You can always enter coordinates manually.
        </p>
      ) : null}

      {renderContent()}
    </section>
  );
}

