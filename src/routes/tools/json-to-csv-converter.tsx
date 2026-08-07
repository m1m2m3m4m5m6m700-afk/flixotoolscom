import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { JSONToCSVConverter } from "@/components/tools/JSONToCSVConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/json-to-csv-converter")({
  head: () => ({
    meta: [
      { title: "Json To Csv Converter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online json to csv converter tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Json To Csv Converter | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: JSONToCSVConverterPage,
});

function JSONToCSVConverterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("json-to-csv-converter"))}
        description="Free online json to csv converter tool."
        category={t(categoryNameKey("utilities"))}
        slug="json-to-csv-converter"
      >
        <JSONToCSVConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
