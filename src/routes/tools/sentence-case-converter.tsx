import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { SentenceCaseConverter } from "@/components/tools/SentenceCaseConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/sentence-case-converter")({
  head: () => ({
    meta: [
      { title: "Sentence Case Converter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online sentence case converter tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: SentenceCaseConverterPage,
});

function SentenceCaseConverterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("sentence-case-converter"))}
        description="Free online sentence case converter tool."
        category={t(categoryNameKey("utilities"))}
        slug="sentence-case-converter"
      >
        <SentenceCaseConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
