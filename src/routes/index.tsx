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
import type { CategoryId } from "@/data/categories";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flixo — One Workspace for Every AI Tool" },
      {
        name: "description",
        content:
          "Flixo brings translation, image, PDF, writing, video, audio, developer and utility tools into one fast, private workspace. Free, no accounts, no API keys.",
      },
      { property: "og:title", content: "Flixo — One workspace for every AI tool" },
      {
        property: "og:description",
        content:
          "Fourteen category hubs under a single calm interface. Start with the free AI Translator.",
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
  const [highlightedCategory, setHighlightedCategory] = useState<CategoryId | null>(null);

  const handleRequestTool = (prefillPrompt?: string) => {
    if (prefillPrompt) {
      setQuery(prefillPrompt);
    }
    setRequestOpen(true);
  };

  return (
    <SiteLayout onRequestTool={() => handleRequestTool()}>
      <HomeHero
        prompt={query}
        onPromptChange={setQuery}
        onRequestTool={handleRequestTool}
        onSelectCategory={setHighlightedCategory}
      />
      <CategoryGrid
        highlightedCategoryId={highlightedCategory}
        onSelectCategory={setHighlightedCategory}
      />
      <ToolDirectory
        onRequestTool={handleRequestTool}
        highlightedCategoryId={highlightedCategory}
      />
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
