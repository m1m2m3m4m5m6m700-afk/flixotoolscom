import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { YAMLFormatterTool } from "@/components/tools/YAMLFormatter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/yaml-formatter")({
  head: () => ({
    meta: [
      { title: "YAML Formatter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Format, validate, and minify YAML. Easy to use, no signup required.",
      },
      { property: "og:title", content: "YAML Formatter | Flixo" },
    ],
  }),
  component: YAMLFormatterPage,
});

function YAMLFormatterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("yaml-formatter"))}
        description="Format, validate, and minify YAML."
        category={t(categoryNameKey("developer"))}
        slug="yaml-formatter"
      >
        <YAMLFormatterTool />
      </ToolLayout>
    </SiteLayout>
  );
}
