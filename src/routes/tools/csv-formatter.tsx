import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { CSVFormatterTool } from "@/components/tools/CSVFormatter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/csv-formatter")({
  head: () => ({
    meta: [
      { title: "CSV Formatter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Format, sort, filter, and analyze CSV data. Easy to use, no signup required.",
      },
      { property: "og:title", content: "CSV Formatter | Flixo" },
    ],
  }),
  component: CSVFormatterPage,
});

function CSVFormatterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("csv-formatter"))}
        description="Format, sort, filter, and analyze CSV data."
        category={t(categoryNameKey("developer"))}
        slug="csv-formatter"
      >
        <CSVFormatterTool />
      </ToolLayout>
    </SiteLayout>
  );
}
