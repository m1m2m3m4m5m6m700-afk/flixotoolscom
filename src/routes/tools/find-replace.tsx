import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { FindReplaceTool } from "@/components/tools/FindReplace";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/find-replace")({
  head: () => ({
    meta: [
      { title: "Find and Replace — Free Online Tool | Flixo" },
      {
        name: "description",
        content:
          "Find and replace text patterns in your content. Support for regex and case sensitivity.",
      },
      { property: "og:title", content: "Find and Replace | Flixo" },
    ],
  }),
  component: FindReplacePage,
});

function FindReplacePage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("find-replace"))}
        description="Find and replace text patterns in your content."
        category={t(categoryNameKey("developer"))}
        slug="find-replace"
      >
        <FindReplaceTool />
      </ToolLayout>
    </SiteLayout>
  );
}
