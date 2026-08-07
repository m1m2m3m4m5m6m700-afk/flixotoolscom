import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { NumberBaseConverter } from "@/components/tools/NumberBaseConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/number-base-converter")({
  head: () => ({
    meta: [
      { title: "Number Base Converter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online number base converter tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: NumberBaseConverterPage,
});

function NumberBaseConverterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("number-base-converter"))}
        description="Free online number base converter tool."
        category={t(categoryNameKey("utilities"))}
        slug="number-base-converter"
      >
        <NumberBaseConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
