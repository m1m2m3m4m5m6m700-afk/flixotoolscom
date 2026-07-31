import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HomeHero } from "@/components/landing/HomeHero";
import { RequestToolDialog } from "@/components/landing/RequestToolDialog";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flixo — One Workspace for Every AI Tool" },
      {
        name: "description",
        content:
          "Flixo is an AI task assistant that understands your intent, files, links, and media, and instantly selects the best workflow. No tool hunting needed.",
      },
      { property: "og:title", content: "Flixo — AI Task Assistant" },
      {
        property: "og:description",
        content:
          "Describe what you want to do and Flixo matches the right AI skill or workflow instantly, with file upload, links, and drag-and-drop support.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [query, setQuery] = useState("");
  const [requestOpen, setRequestOpen] = useState(false);

  const handleRequestTool = (prefillPrompt?: string) => {
    if (prefillPrompt) {
      setQuery(prefillPrompt);
    }
    setRequestOpen(true);
  };

  return (
    <SiteLayout onRequestTool={() => handleRequestTool()}>
      <HomeHero onRequestTool={handleRequestTool} />

      <RequestToolDialog
        open={requestOpen}
        onOpenChange={setRequestOpen}
        initialDescription={query}
      />
    </SiteLayout>
  );
}
