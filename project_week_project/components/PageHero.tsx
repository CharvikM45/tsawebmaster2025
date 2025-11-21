"use client";

import { AlertTriangle, ArrowRight, Compass } from "lucide-react";
import Link from "next/link";

type PageHeroProps = {
  title: string;
  subtitle: string;
  cta?: {
    href: string;
    label: string;
  };
};

export function PageHero({ title, subtitle, cta }: PageHeroProps) {
  return (
    <section
      className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-slate-900/80 p-8 shadow-2xl shadow-slate-900/20"
      aria-label="Welcome"
    >
      <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-calm">
        <Compass className="size-4" aria-hidden />
        Community Pulse
      </p>
      <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-3xl text-base text-slate-300">{subtitle}</p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href="/disasters"
          className="inline-flex items-center gap-2 rounded-full bg-sunrise px-4 py-2 text-sm font-semibold text-black transition hover:bg-orange-400"
        >
          Explore Nearby Risks
          <ArrowRight className="size-4" aria-hidden />
        </Link>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300">
          <AlertTriangle className="size-4 text-amber-400" aria-hidden />
          Real data • Accessible design • Geolocation aware
        </div>
      </div>
      {cta ? (
        <Link
          href={cta.href}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-calm"
        >
          {cta.label}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      ) : null}
    </section>
  );
}

