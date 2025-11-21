export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type SeverityLevel = "info" | "alert" | "emergency";

export type DisasterEvent = {
  id: string;
  title: string;
  description: string;
  source: "USGS" | "NASA EONET";
  coordinates: Coordinates;
  distanceKm: number | null;
  magnitude?: number | string;
  severity: SeverityLevel;
  timestamp: string;
};

export type CommunityAlert = {
  id: string;
  headline: string;
  description: string;
  area: string;
  updated: string;
  level: SeverityLevel;
  source: string;
};

