import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { SortLinesTool } from "@/components/tools/SortLines";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/sort-lines")({
  head: () => ({
    meta: [
      { title: "Sort Lines — Free Online Tool | Flixo" },
      {
        name: "description",
        content:
          "Sort lines alphabetically or numerically. A to Z, Z to A, ascending, or descending.",
      },
      { property: "og:title", content: "Sort Lines | Flixo" },
    ],
  }),
  component: SortLinesPage,
});

function SortLinesPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("sort-lines"))}
        description="Sort lines alphabetically or numerically."
        category={t(categoryNameKey("utilities"))}
        slug="sort-lines"
      >
        <SortLinesTool />
      </ToolLayout>
    </SiteLayout>
  );
}
