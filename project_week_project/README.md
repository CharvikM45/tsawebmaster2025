# Community Pulse

Accessible, inclusive, and real-data powered hub for community engagement around natural disasters and civic alerts. Built with **Next.js 14**, **React**, and **TailwindCSS**.

## Features

- 🔍 Location-based natural disaster detection using the Geolocation API with manual fallback + localStorage caching
- 🌐 Live integrations with USGS Earthquake feeds, NASA EONET, and NWS alert feeds (override URL supported)
- 🗺️ Leaflet-powered map with severity-aware markers and responsive layout
- 📢 Community alert dashboard with Info / Alert / Emergency filtering and timestamps
- ♿ WCAG-conscious UI: semantic HTML, ARIA-friendly components, high contrast palette, and welcoming language

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**

   Copy the template if you need to override the National Weather Service CAP feed.

   ```bash
   cp env.example .env.local
   ```

   By default the app hits `https://api.weather.gov/alerts/active`.

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   npm start
   ```

## Project Structure

- `app/` – App Router routes (`/`, `/alerts`, `/disasters`)
- `components/` – Reusable UI (LocationInput, DisasterCard, AlertCard, MapView, loading/error states, dashboards)
- `hooks/` – Custom hooks (`useLocation`)
- `lib/` – API helpers, geospatial utilities, formatters
- `constants/` – Alert level styling tokens
- `public/` – Static assets

## APIs & Data Sources

- **USGS Earthquake API** – Nearby seismic events with magnitude + timestamps
- **NASA EONET** – Open environmental events filtered by radius
- **NWS Alerts (CAP)** – Community alerts feed, override via `NEXT_PUBLIC_NWS_ALERT_FEED`
- Built-in mock alerts ensure the dashboard never feels empty during development

## Accessibility Checklist

- Semantic headings, ARIA-friendly labels, descriptive button copy
- High-contrast palette with soft-rounded controls for touch targets
- Inclusive hero messaging (“Everyone belongs. Stay informed. Stay safe.”)

## Scripts

- `npm run dev` – Start Next.js dev server
- `npm run build` – Compile production build
- `npm start` – Run production server
- `npm run lint` – Lint with `next lint`

---

**Community Pulse** invites neighbors to prepare together: modern, responsive, and grounded in real data. Stay informed. Stay safe. Everyone belongs. 💛
