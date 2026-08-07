import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { CSVViewer } from "@/components/tools/CSVViewer";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/csv-viewer")({
  head: () => ({
    meta: [
      { title: "Csv Viewer — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online csv viewer tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: CSVViewerPage,
});

function CSVViewerPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("csv-viewer"))}
        description="Free online csv viewer tool."
        category={t(categoryNameKey("utilities"))}
        slug="csv-viewer"
      >
        <CSVViewer />
      </ToolLayout>
    </SiteLayout>
  );
}
