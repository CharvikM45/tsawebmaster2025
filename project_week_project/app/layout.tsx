import 'leaflet/dist/leaflet.css';
import { BellRing, Shield, Waves } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Community Pulse | Stay Informed, Stay Safe',
  description:
    'Community-focused disaster awareness platform with real-time alerts, inclusive guidance, and accessible design.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-b from-midnight via-slate-950 to-midnight">
          <header className="border-b border-white/5 bg-black/30 backdrop-blur supports-[backdrop-filter]:bg-black/40">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                <Shield className="size-6 text-sunrise" aria-hidden />
                <span>Community Pulse</span>
              </Link>
              <nav className="flex items-center gap-6 text-sm font-medium" aria-label="Primary">
                <Link href="/" className="hover:text-sunrise">
                  Home
                </Link>
                <Link href="/alerts" className="flex items-center gap-1 hover:text-sunrise">
                  <BellRing className="size-4" aria-hidden />
                  Alerts
                </Link>
                <Link href="/disasters" className="flex items-center gap-1 hover:text-sunrise">
                  <Waves className="size-4" aria-hidden />
                  Disasters
                </Link>
              </nav>
            </div>
          </header>

          <main className="mx-auto min-h-[calc(100vh-140px)] w-full max-w-6xl px-4 pb-16 pt-10">
            {children}
          </main>

          <footer className="border-t border-white/5 bg-black/60 px-4 py-5 text-center text-sm text-slate-400">
            Everyone belongs. Stay informed. Stay safe. Built for resilient communities.
          </footer>
        </div>
      </body>
    </html>
  );
}

