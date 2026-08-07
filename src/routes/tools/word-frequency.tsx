import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { WordFrequencyTool } from "@/components/tools/WordFrequencyTool";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/word-frequency")({
  head: () => ({
    meta: [
      { title: "Word Frequency Counter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Count word frequency and find the most common words in your text.",
      },
      { property: "og:title", content: "Word Frequency Counter | Flixo" },
    ],
  }),
  component: WordFrequencyPage,
});

function WordFrequencyPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("word-frequency"))}
        description="Count word frequency and find the most common words."
        category={t(categoryNameKey("utilities"))}
        slug="word-frequency"
      >
        <WordFrequencyTool />
      </ToolLayout>
    </SiteLayout>
  );
}
