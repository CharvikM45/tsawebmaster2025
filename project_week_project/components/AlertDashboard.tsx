"use client";

import { fetchCommunityAlerts } from "@/lib/api";
import { CommunityAlert, SeverityLevel } from "@/types";
import { Filter, Signal } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCard } from "./AlertCard";
import { ErrorState } from "./ErrorState";
import { LoadingState } from "./LoadingState";
import { RefreshButton } from "./RefreshButton";

export function AlertDashboard() {
  const [alerts, setAlerts] = useState<CommunityAlert[]>([]);
  const [filter, setFilter] = useState<SeverityLevel | "all">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAlerts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCommunityAlerts();
      setAlerts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to fetch alerts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAlerts();
  }, [loadAlerts]);

  const filteredAlerts = useMemo(() => {
    if (filter === "all") return alerts;
    return alerts.filter((alert) => alert.level === filter);
  }, [alerts, filter]);

  if (loading) {
    return <LoadingState label="Gathering community alerts..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadAlerts} />;
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">
        <div>
          <p className="text-sm font-semibold text-white">Alerts around you</p>
          <p className="text-xs text-slate-400">
            Local feeds with Info, Alert, and Emergency levels sorted by time.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="size-4 text-slate-400" aria-hidden />
          {(["all", "info", "alert", "emergency"] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setFilter(level)}
              className={`rounded-full px-3 py-1 text-sm capitalize ${
                filter === level ? "bg-calm/30 text-white" : "bg-white/5 text-slate-300"
              }`}
            >
              {level}
            </button>
          ))}
          <RefreshButton onClick={loadAlerts} disabled={loading} />
        </div>
      </div>

      {filteredAlerts.length === 0 ? (
        <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
          <Signal className="size-4 text-calm" aria-hidden />
          No alerts match this filter. Try selecting another level or refreshing.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {filteredAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      )}
    </section>
  );
}

