"use client";

import { clsx } from "clsx";
import { RotateCcw } from "lucide-react";

type RefreshButtonProps = {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
  className?: string;
};

export function RefreshButton({
  onClick,
  label = "Refresh data",
  disabled,
  className,
}: RefreshButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40",
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
    >
      <RotateCcw className="size-4" aria-hidden />
      {label}
    </button>
  );
}

