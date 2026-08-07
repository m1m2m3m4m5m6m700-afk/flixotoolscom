import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { XMLToJSONConverter } from "@/components/tools/XMLToJSONConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/xml-to-json")({
  head: () => ({
    meta: [
      { title: "XML to JSON Converter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Convert XML to JSON and JSON to XML instantly. Free online converter.",
      },
      { property: "og:title", content: "XML to JSON Converter | Flixo" },
    ],
  }),
  component: XMLToJSONPage,
});

function XMLToJSONPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("xml-to-json"))}
        description="Convert XML to JSON and JSON to XML instantly."
        category={t(categoryNameKey("developer"))}
        slug="xml-to-json"
      >
        <XMLToJSONConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
