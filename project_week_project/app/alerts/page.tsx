import { AlertDashboard } from "@/components/AlertDashboard";
import { PageHero } from "@/components/PageHero";

export default function AlertsPage() {
  return (
    <div className="space-y-8">
      <PageHero
        title="Community Alert Dashboard"
        subtitle="Shelters, closures, weather notices, and localized announcements updated in real time."
      />
      <AlertDashboard />
    </div>
  );
}

