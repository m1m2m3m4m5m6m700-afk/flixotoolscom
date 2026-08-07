import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { JSONToYAMLConverter } from "@/components/tools/JSONToYAMLConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/json-to-yaml")({
  head: () => ({
    meta: [
      { title: "JSON to YAML Converter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Convert JSON to YAML and YAML to JSON instantly. Free online converter.",
      },
      { property: "og:title", content: "JSON to YAML Converter | Flixo" },
    ],
  }),
  component: JSONToYAMLPage,
});

function JSONToYAMLPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("json-to-yaml"))}
        description="Convert JSON to YAML and YAML to JSON instantly."
        category={t(categoryNameKey("developer"))}
        slug="json-to-yaml"
      >
        <JSONToYAMLConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
