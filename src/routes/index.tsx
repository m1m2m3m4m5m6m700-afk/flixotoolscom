import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FAQ } from "@/components/landing/FAQ";
import { FeaturedTools } from "@/components/landing/FeaturedTools";
import { Hero } from "@/components/landing/Hero";
import { RequestToolDialog } from "@/components/landing/RequestToolDialog";
import { Statistics } from "@/components/landing/Statistics";
import { WhyFlixo } from "@/components/landing/WhyFlixo";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flixo — The AI Toolkit That Feels Like One Product" },
      {
        name: "description",
        content:
          "Flixo brings translation, writing, vision and audio AI tools into one fast, private workspace. Free, no accounts, no API keys.",
      },
      { property: "og:title", content: "Flixo — One workspace for every AI tool" },
      {
        property: "og:description",
        content:
          "Translation, writing, vision and audio tools under a single calm interface. Start with the free AI Translator.",
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
      <Hero
        prompt={query}
        onPromptChange={setQuery}
        onRequestTool={() => setRequestOpen(true)}
      />
      <FeaturedTools />
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
