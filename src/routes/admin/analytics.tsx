import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { AdminAnalyticsDashboard } from "@/components/admin/analytics/AdminAnalyticsDashboard";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({
    meta: [
      { title: "Owner Admin Analytics Dashboard — Flixo" },
      {
        name: "description",
        content: "Flixo Owner Admin Production Analytics & Visitor Intelligence Dashboard.",
      },
    ],
  }),
  component: AdminAnalyticsRoute,
});

function AdminAnalyticsRoute() {
  return (
    <SiteLayout>
      <AdminAnalyticsDashboard />
    </SiteLayout>
  );
}
