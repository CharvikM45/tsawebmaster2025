"use client";

import { ALERT_LEVEL_STYLES } from "@/constants/alerts";
import { CommunityAlert } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { AlertCircle, MapPinned, Siren } from "lucide-react";

type AlertCardProps = {
  alert: CommunityAlert;
};

export function AlertCard({ alert }: AlertCardProps) {
  const styles = ALERT_LEVEL_STYLES[alert.level];

  return (
    <article className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">{alert.source}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{alert.headline}</h3>
        </div>
        <span
          className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
          style={{
            color: styles.text,
            borderColor: styles.border,
            backgroundColor: styles.background,
          }}
        >
          <Siren className="size-3.5" aria-hidden />
          {alert.level}
        </span>
      </div>

      <p className="text-sm text-slate-300">{alert.description}</p>

      <dl className="grid grid-cols-2 gap-4 text-sm text-slate-300">
        <div className="rounded-2xl border border-white/5 bg-black/30 p-3">
          <dt className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
            <MapPinned className="size-4" aria-hidden />
            Area
          </dt>
          <dd className="mt-2 text-base text-white">{alert.area}</dd>
        </div>

        <div className="rounded-2xl border border-white/5 bg-black/30 p-3">
          <dt className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
            <AlertCircle className="size-4" aria-hidden />
            Updated
          </dt>
          <dd className="mt-2 text-base text-white">
            {formatDistanceToNow(new Date(alert.updated), { addSuffix: true })}
          </dd>
        </div>
      </dl>
    </article>
  );
}

