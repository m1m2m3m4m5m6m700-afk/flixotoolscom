import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { NumberToWordsConverter } from "@/components/tools/NumberToWordsConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/number-to-words-converter")({
  head: () => ({
    meta: [
      { title: "Number To Words Converter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online number to words converter tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Number To Words Converter | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: NumberToWordsConverterPage,
});

function NumberToWordsConverterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("number-to-words-converter"))}
        description="Free online number to words converter tool."
        category={t(categoryNameKey("utilities"))}
        slug="number-to-words-converter"
      >
        <NumberToWordsConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
