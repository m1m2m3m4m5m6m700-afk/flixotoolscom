import { createFileRoute } from "@tanstack/react-router";
import { Braces } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { JSONFormatter } from "@/components/tools/JSONFormatter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/json-formatter")({
  head: () => ({
    meta: [
      { title: "JSON Formatter — Format, Minify & Validate JSON | Flixo" },
      { name: "description", content: "Format, minify, and validate JSON data instantly." },
      { property: "og:title", content: "JSON Formatter | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: JSONFormatterPage,
});

function JSONFormatterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        icon={Braces}
        name={t(toolNameKey("json-formatter"))}
        description="Format, minify, and validate JSON data."
        category={t(categoryNameKey("developer"))}
        slug="json-formatter"
      >
        <JSONFormatter />
      </ToolLayout>
    </SiteLayout>
  );
}
