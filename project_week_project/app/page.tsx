import { PageHero } from "@/components/PageHero";
import { Accessibility, BellRing, MapPinned, Shield } from "lucide-react";
import Link from "next/link";

const values = [
  {
    title: "Live community alerts",
    description: "Road closures, shelters, and municipal notices pulled from trusted feeds.",
    icon: BellRing,
    href: "/alerts",
  },
  {
    title: "Location-based disaster view",
    description: "USGS, NASA, and other real APIs layered on a responsive map.",
    icon: MapPinned,
    href: "/disasters",
  },
  {
    title: "Inclusive by design",
    description: "Language, contrast, and ARIA semantics centered on belonging.",
    icon: Accessibility,
    href: "/",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <PageHero
        title="Everyone belongs. Stay informed. Stay safe."
        subtitle="Community Pulse pairs real-time hazard intelligence with inclusive storytelling so neighbors can prepare together."
        cta={{ href: "/alerts", label: "Browse alerts" }}
      />

      <section aria-label="Core features" className="grid gap-4 md:grid-cols-3">
        {values.map((value) => (
          <Link
            key={value.title}
            href={value.href}
            className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-calm/50"
          >
            <value.icon className="size-8 text-calm group-hover:text-sunrise" aria-hidden />
            <h2 className="mt-4 text-xl font-semibold text-white">{value.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{value.description}</p>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 md:grid-cols-2">
        <div>
          <h3 className="text-2xl font-semibold text-white">Community commitment</h3>
          <p className="mt-3 text-sm text-slate-300">
            We believe in mutual aid, accessible warnings, and design that respects every identity.
            That is why Community Pulse keeps instructions plain, controls reachable, and colors WCAG
            AA compliant.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            <li>• Semantic HTML + ARIA-ready components</li>
            <li>• Auto location detection with manual fallback</li>
            <li>• Local caching for the last known safe spot</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-white/5 bg-black/30 p-6 shadow-inner shadow-black/40">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Shield className="size-4 text-sunrise" aria-hidden />
            Trust indicators
          </div>
          <dl className="mt-4 space-y-4 text-sm text-slate-300">
            <div>
              <dt className="font-semibold text-white">Realtime sources</dt>
              <dd>USGS Earthquake feeds, NASA EONET events, NWS alert feeds.</dd>
            </div>
            <div>
              <dt className="font-semibold text-white">Accessible UI</dt>
              <dd>High contrast palette, logical heading order, touch friendly spacing.</dd>
            </div>
            <div>
              <dt className="font-semibold text-white">Community voice</dt>
              <dd>Plain-language instructions and civic tone that invites participation.</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}

