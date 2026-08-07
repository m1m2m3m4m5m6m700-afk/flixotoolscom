import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { RandomTextGenerator } from "@/components/tools/RandomTextGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/random-text-generator")({
  head: () => ({
    meta: [
      { title: "Random Text Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Generate random text, sentences, and paragraphs for testing and prototyping.",
      },
      { property: "og:title", content: "Random Text Generator | Flixo" },
    ],
  }),
  component: RandomTextGeneratorPage,
});

function RandomTextGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("random-text-generator"))}
        description="Generate random text for testing."
        category={t(categoryNameKey("utilities"))}
        slug="random-text-generator"
      >
        <RandomTextGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
