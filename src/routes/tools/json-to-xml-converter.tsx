import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { JSONToXMLConverter } from "@/components/tools/JSONToXMLConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/json-to-xml-converter")({
  head: () => ({
    meta: [
      { title: "Json To Xml Converter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online json to xml converter tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: JSONToXMLConverterPage,
});

function JSONToXMLConverterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("json-to-xml-converter"))}
        description="Free online json to xml converter tool."
        category={t(categoryNameKey("utilities"))}
        slug="json-to-xml-converter"
      >
        <JSONToXMLConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
