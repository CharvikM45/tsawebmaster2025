"use client";

import { DisasterEvent } from "@/types";
import L from "leaflet";
import type { MapContainerProps } from "react-leaflet";
import { CircleMarker, MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";

// Fix Leaflet default icon issue in Next.js
if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  });
}

type MapViewInternalProps = {
  center: [number, number];
  disasters: DisasterEvent[];
} & Partial<MapContainerProps>;

const iconColors: Record<DisasterEvent["severity"], string> = {
  info: "#38bdf8",
  alert: "#facc15",
  emergency: "#ef4444",
};

export default function MapViewInternal({
  center,
  disasters,
  ...props
}: MapViewInternalProps) {
  return (
    <MapContainer
      center={center}
      zoom={6}
      scrollWheelZoom={false}
      className="h-80 w-full rounded-3xl border border-white/10"
      {...props}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Tooltip direction="top" offset={new L.Point(0, -10)} opacity={1}>
          <div className="text-xs">
            <p className="font-semibold text-white">Your Location</p>
          </div>
        </Tooltip>
      </Marker>
      {disasters.map((event) => (
        <CircleMarker
          key={event.id}
          center={[event.coordinates.latitude, event.coordinates.longitude]}
          radius={12}
          pathOptions={{
            color: iconColors[event.severity],
            fillColor: iconColors[event.severity],
            fillOpacity: 0.6,
            weight: 2,
          }}
        >
          <Tooltip direction="top" offset={new L.Point(0, -10)} opacity={1}>
            <div className="text-xs">
              <p className="font-semibold text-white">{event.title}</p>
              <p className="text-slate-200">{event.severity}</p>
              {event.distanceKm ? (
                <p className="text-slate-300">{event.distanceKm.toFixed(0)} km away</p>
              ) : null}
            </div>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

