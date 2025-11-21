import { DisasterFeed } from "@/components/DisasterFeed";
import { PageHero } from "@/components/PageHero";

export default function DisastersPage() {
  return (
    <div className="space-y-8">
      <PageHero
        title="Location-based natural disaster feed"
        subtitle="Detects your location, fetches live data from USGS and NASA, and maps everything with transparent severity levels."
      />
      <DisasterFeed />
    </div>
  );
}

