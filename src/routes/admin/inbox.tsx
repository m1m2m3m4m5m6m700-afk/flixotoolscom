import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { AdminInbox } from "@/components/communication/AdminInbox";

export const Route = createFileRoute("/admin/inbox")({
  head: () => ({
    meta: [
      { title: "Owner Admin Inbox — Flixo" },
      {
        name: "description",
        content: "Flixo Owner Communication Inbox and Management Dashboard.",
      },
    ],
  }),
  component: AdminInboxRoute,
});

function AdminInboxRoute() {
  return (
    <SiteLayout>
      <AdminInbox />
    </SiteLayout>
  );
}
