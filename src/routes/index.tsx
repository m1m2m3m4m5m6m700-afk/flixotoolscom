import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy, useState } from "react";
import type { CategoryId } from "@/data/categories";
import { Hero } from "@/components/landing/Hero";
import { RequestToolDialog } from "@/components/landing/RequestToolDialog";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryGrid = lazy(() =>
  import("@/components/landing/CategoryGrid").then((mod) => ({ default: mod.CategoryGrid })),
);
const ToolDirectory = lazy(() =>
  import("@/components/landing/ToolDirectory").then((mod) => ({ default: mod.ToolDirectory })),
);

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
  const [highlightedCategoryId, setHighlightedCategoryId] = useState<CategoryId | null>(null);

  const handleRequestTool = (prefillPrompt?: string) => {
    if (prefillPrompt) {
      setQuery(prefillPrompt);
    }
    setRequestOpen(true);
  };

  const handleSelectCategory = (categoryId: CategoryId) => setHighlightedCategoryId(categoryId);

  const loadingFallback = (
    <div className="mx-auto max-w-6xl space-y-6 px-5 py-16 lg:px-8">
      <div className="space-y-4">
        <Skeleton className="h-24 w-1/2 rounded-2xl" />
        <Skeleton className="h-16 w-full rounded-3xl" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Skeleton className="h-44 rounded-3xl" />
          <Skeleton className="h-44 rounded-3xl" />
          <Skeleton className="h-44 rounded-3xl" />
        </div>
      </div>
    </div>
  );

  return (
    <SiteLayout onRequestTool={() => handleRequestTool()}>
      <Hero
        prompt={query}
        onPromptChange={setQuery}
        onRequestTool={handleRequestTool}
        onSelectCategory={handleSelectCategory}
      />

      <Suspense fallback={loadingFallback}>
        <CategoryGrid
          highlightedCategoryId={highlightedCategoryId}
          onSelectCategory={handleSelectCategory}
        />
      </Suspense>

      <Suspense fallback={loadingFallback}>
        <ToolDirectory
          highlightedCategoryId={highlightedCategoryId}
          onRequestTool={handleRequestTool}
        />
      </Suspense>

      <RequestToolDialog
        open={requestOpen}
        onOpenChange={setRequestOpen}
        initialDescription={query}
      />
    </SiteLayout>
  );
}
