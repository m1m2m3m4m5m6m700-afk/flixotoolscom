import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { WordCloudGenerator } from "@/components/tools/WordCloudGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/word-cloud-generator")({
  head: () => ({
    meta: [
      { title: "Word Cloud Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online word cloud generator tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: WordCloudGeneratorPage,
});

function WordCloudGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("word-cloud-generator"))}
        description="Free online word cloud generator tool."
        category={t(categoryNameKey("utilities"))}
        slug="word-cloud-generator"
      >
        <WordCloudGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
