import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CategoryGrid } from "@/components/landing/CategoryGrid";
import { FAQ } from "@/components/landing/FAQ";
import { HomeHero } from "@/components/landing/HomeHero";
import { RequestToolDialog } from "@/components/landing/RequestToolDialog";
import { Statistics } from "@/components/landing/Statistics";
import { ToolDirectory } from "@/components/landing/ToolDirectory";
import { WhyFlixo } from "@/components/landing/WhyFlixo";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flixo — The AI Toolkit That Feels Like One Product" },
      {
        name: "description",
        content:
          "Flixo brings translation, image, PDF, writing and utility AI tools into five hubs under one fast, private workspace. Free, no accounts, no API keys.",
      },
      { property: "og:title", content: "Flixo — One workspace for every AI tool" },
      {
        property: "og:description",
        content:
          "Five tool hubs — Translation, Images, PDF, Writing and Utilities — under a single calm interface. Start with the free AI Translator.",
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

  return (
    <SiteLayout>
      <HomeHero
        prompt={query}
        onPromptChange={setQuery}
        onRequestTool={() => setRequestOpen(true)}
      />
      <CategoryGrid />
      <ToolDirectory onRequestTool={() => setRequestOpen(true)} />
      <WhyFlixo />
      <Statistics />
      <FAQ />

      <RequestToolDialog
        open={requestOpen}
        onOpenChange={setRequestOpen}
        initialDescription={query}
      />
    </SiteLayout>
  );
}
