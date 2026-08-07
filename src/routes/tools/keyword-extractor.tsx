import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { KeywordExtractorTool } from "@/components/tools/KeywordExtractorTool";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/keyword-extractor")({
  head: () => ({
    meta: [
      { title: "Keyword Extractor — Free Online Tool | Flixo" },
      {
        name: "description",
        content:
          "Extract keywords and key phrases from any text. Analyze word frequency and importance.",
      },
      { property: "og:title", content: "Keyword Extractor | Flixo" },
    ],
  }),
  component: KeywordExtractorPage,
});

function KeywordExtractorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("keyword-extractor"))}
        description="Extract keywords and key phrases from text."
        category={t(categoryNameKey("utilities"))}
        slug="keyword-extractor"
      >
        <KeywordExtractorTool />
      </ToolLayout>
    </SiteLayout>
  );
}
