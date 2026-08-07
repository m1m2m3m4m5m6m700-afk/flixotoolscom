import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { XMLFormatter } from "@/components/tools/XMLFormatter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/xml-formatter")({
  head: () => ({
    meta: [
      { title: "Xml Formatter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online xml formatter tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Xml Formatter | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: XMLFormatterPage,
});

function XMLFormatterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("xml-formatter"))}
        description="Free online xml formatter tool."
        category={t(categoryNameKey("utilities"))}
        slug="xml-formatter"
      >
        <XMLFormatter />
      </ToolLayout>
    </SiteLayout>
  );
}
