import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { JSONMerger } from "@/components/tools/JSONMerger";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/json-merger")({
  head: () => ({
    meta: [
      { title: "Json Merger — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online json merger tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: JSONMergerPage,
});

function JSONMergerPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("json-merger"))}
        description="Free online json merger tool."
        category={t(categoryNameKey("utilities"))}
        slug="json-merger"
      >
        <JSONMerger />
      </ToolLayout>
    </SiteLayout>
  );
}
