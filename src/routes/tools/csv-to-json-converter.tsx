import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { CSVToJSONConverter } from "@/components/tools/CSVToJSONConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/csv-to-json-converter")({
  head: () => ({
    meta: [
      { title: "Csv To Json Converter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online csv to json converter tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Csv To Json Converter | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CSVToJSONConverterPage,
});

function CSVToJSONConverterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("csv-to-json-converter"))}
        description="Free online csv to json converter tool."
        category={t(categoryNameKey("utilities"))}
        slug="csv-to-json-converter"
      >
        <CSVToJSONConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
