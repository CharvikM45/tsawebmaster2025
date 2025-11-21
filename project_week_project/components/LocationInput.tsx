"use client";

import { clsx } from "clsx";
import { LocateFixed, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

type LocationInputProps = {
  latitude?: number;
  longitude?: number;
  radius: number;
  onRadiusChange: (value: number) => void;
  onSubmit: (lat: number, lng: number) => void;
  onLocate?: () => void;
  loading?: boolean;
};

export function LocationInput({
  latitude,
  longitude,
  radius,
  onRadiusChange,
  onSubmit,
  onLocate,
  loading,
}: LocationInputProps) {
  const [latValue, setLatValue] = useState<string>(latitude?.toString() ?? "");
  const [lngValue, setLngValue] = useState<string>(longitude?.toString() ?? "");

  useEffect(() => {
    setLatValue(latitude?.toString() ?? "");
  }, [latitude]);

  useEffect(() => {
    setLngValue(longitude?.toString() ?? "");
  }, [longitude]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const lat = parseFloat(latValue);
    const lng = parseFloat(lngValue);

    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      onSubmit(lat, lng);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6"
      aria-label="Location controls"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">Location settings</p>
          <p className="text-xs text-slate-400">
            Auto-detected when permitted. Manual entry always available.
          </p>
        </div>
        {onLocate ? (
          <button
            type="button"
            onClick={onLocate}
            className="inline-flex items-center gap-2 rounded-full border border-calm/40 px-3 py-1.5 text-xs font-medium text-calm transition hover:border-calm hover:text-white"
          >
            <LocateFixed className="size-4" aria-hidden />
            Use my location
          </button>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-300">
          Latitude
          <div className="mt-1 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-3">
            <MapPin className="size-4 text-slate-400" aria-hidden />
            <input
              type="number"
              step="0.0001"
              required
              value={latValue}
              onChange={(event) => setLatValue(event.target.value)}
              className="h-10 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              placeholder="e.g. 40.7128"
            />
          </div>
        </label>

        <label className="text-sm text-slate-300">
          Longitude
          <div className="mt-1 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-3">
            <MapPin className="size-4 text-slate-400" aria-hidden />
            <input
              type="number"
              step="0.0001"
              required
              value={lngValue}
              onChange={(event) => setLngValue(event.target.value)}
              className="h-10 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              placeholder="e.g. -74.0060"
            />
          </div>
        </label>
      </div>

      <label className="flex flex-col gap-3 text-sm text-slate-300">
        Search radius: {radius} km
        <input
          type="range"
          min={25}
          max={500}
          step={25}
          value={radius}
          onChange={(event) => onRadiusChange(Number(event.target.value))}
          className="accent-calm"
        />
      </label>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className={clsx(
            "inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-calm/80 px-4 py-2 text-sm font-semibold text-black transition hover:bg-calm",
            loading && "cursor-not-allowed opacity-70",
          )}
        >
          Update location
        </button>
      </div>
    </form>
  );
}

