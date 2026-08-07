import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { WordDensityAnalyzer } from "@/components/tools/WordDensityAnalyzer";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/word-density-analyzer")({
  head: () => ({
    meta: [
      { title: "Word Density Analyzer — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online word density analyzer tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: WordDensityAnalyzerPage,
});

function WordDensityAnalyzerPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("word-density-analyzer"))}
        description="Free online word density analyzer tool."
        category={t(categoryNameKey("utilities"))}
        slug="word-density-analyzer"
      >
        <WordDensityAnalyzer />
      </ToolLayout>
    </SiteLayout>
  );
}
