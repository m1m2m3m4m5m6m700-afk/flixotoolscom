import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { TextCaseConverter } from "@/components/tools/TextCaseConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/text-case-converter")({
  head: () => ({
    meta: [
      { title: "Text Case Converter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online text case converter tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: TextCaseConverterPage,
});

function TextCaseConverterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("text-case-converter"))}
        description="Free online text case converter tool."
        category={t(categoryNameKey("utilities"))}
        slug="text-case-converter"
      >
        <TextCaseConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
