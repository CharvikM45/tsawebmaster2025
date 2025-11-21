"use client";

import { AlertOctagon } from "lucide-react";
import { RefreshButton } from "./RefreshButton";

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({
  message = "We hit a snag while loading data.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-2xl border border-red-500/40 bg-red-500/10 p-8 text-center text-sm text-red-200"
    >
      <AlertOctagon className="size-8 text-red-400" aria-hidden />
      <p>{message}</p>
      {onRetry ? <RefreshButton onClick={onRetry} label="Try again" /> : null}
    </div>
  );
}

