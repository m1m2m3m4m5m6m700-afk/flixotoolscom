import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { SQLFormatter } from "@/components/tools/SQLFormatter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/sql-formatter")({
  head: () => ({
    meta: [
      { title: "Sql Formatter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online sql formatter tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Sql Formatter | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: SQLFormatterPage,
});

function SQLFormatterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("sql-formatter"))}
        description="Free online sql formatter tool."
        category={t(categoryNameKey("utilities"))}
        slug="sql-formatter"
      >
        <SQLFormatter />
      </ToolLayout>
    </SiteLayout>
  );
}
