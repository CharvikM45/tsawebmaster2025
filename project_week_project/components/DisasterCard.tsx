"use client";

import { formatDistance } from "@/lib/format";
import { DisasterEvent } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Activity, AlertTriangle, Compass, MapPin } from "lucide-react";

type DisasterCardProps = {
  event: DisasterEvent;
};

export function DisasterCard({ event }: DisasterCardProps) {
  const severityClass =
    event.severity === "emergency"
      ? "bg-red-500/10 text-red-200 border-red-500/30"
      : event.severity === "alert"
        ? "bg-amber-500/10 text-amber-200 border-amber-500/30"
        : "bg-calm/10 text-calm border-calm/30";

  return (
    <article className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">{event.source}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{event.title}</h3>
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${severityClass}`}
        >
          <AlertTriangle className="size-3.5" aria-hidden />
          {event.severity}
        </span>
      </div>

      <p className="text-sm text-slate-300">{event.description}</p>

      <dl className="grid grid-cols-2 gap-4 text-sm text-slate-300">
        <div className="rounded-2xl border border-white/5 bg-black/30 p-3">
          <dt className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
            <Compass className="size-4" aria-hidden />
            Distance
          </dt>
          <dd className="mt-2 text-base text-white">
            {event.distanceKm ? formatDistance(event.distanceKm) : "Unknown"}
          </dd>
        </div>

        <div className="rounded-2xl border border-white/5 bg-black/30 p-3">
          <dt className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
            <Activity className="size-4" aria-hidden />
            Severity
          </dt>
          <dd className="mt-2 text-base text-white">{event.magnitude ?? "N/A"}</dd>
        </div>

        <div className="rounded-2xl border border-white/5 bg-black/30 p-3">
          <dt className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
            <MapPin className="size-4" aria-hidden />
            Coordinates
          </dt>
          <dd className="mt-2 text-base text-white">
            {event.coordinates.latitude.toFixed(2)}, {event.coordinates.longitude.toFixed(2)}
          </dd>
        </div>

        <div className="rounded-2xl border border-white/5 bg-black/30 p-3">
          <dt className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
            <Activity className="size-4" aria-hidden />
            Timestamp
          </dt>
          <dd className="mt-2 text-base text-white">
            {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
          </dd>
        </div>
      </dl>
    </article>
  );
}

