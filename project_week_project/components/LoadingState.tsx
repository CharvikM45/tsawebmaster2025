"use client";

import { LoaderCircle } from "lucide-react";

type LoadingStateProps = {
  label?: string;
};

export function LoadingState({ label = "Loading data..." }: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-sm text-slate-300"
    >
      <LoaderCircle className="size-8 animate-spin text-calm" aria-hidden />
      <p>{label}</p>
    </div>
  );
}

