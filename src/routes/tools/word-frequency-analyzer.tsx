import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { WordFrequencyAnalyzer } from "@/components/tools/WordFrequencyAnalyzer";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/word-frequency-analyzer")({
  head: () => ({
    meta: [
      { title: "Word Frequency Analyzer — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online word frequency analyzer tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Word Frequency Analyzer | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: WordFrequencyAnalyzerPage,
});

function WordFrequencyAnalyzerPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("word-frequency-analyzer"))}
        description="Free online word frequency analyzer tool."
        category={t(categoryNameKey("utilities"))}
        slug="word-frequency-analyzer"
      >
        <WordFrequencyAnalyzer />
      </ToolLayout>
    </SiteLayout>
  );
}
