"use client";

import { Coordinates } from "@/types";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "community-pulse:last-location";

export function useLocation() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [status, setStatus] = useState<"idle" | "resolving" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setLocation(parsed);
      } catch {
        // ignore cache issues
      }
    }
  }, []);

  const persistLocation = useCallback((value: Coordinates) => {
    setLocation(value);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  }, []);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported in this browser.");
      setStatus("error");
      return;
    }

    setStatus("resolving");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        persistLocation(coords);
        setError(null);
        setStatus("idle");
      },
      (geoError) => {
        setError(geoError.message);
        setStatus("error");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  }, [persistLocation]);

  return {
    location,
    status,
    error,
    setLocation: persistLocation,
    requestLocation,
  };
}

