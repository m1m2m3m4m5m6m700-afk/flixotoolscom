import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { MarkdownTableGenerator } from "@/components/tools/MarkdownTableGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/markdown-table")({
  head: () => ({
    meta: [
      { title: "Markdown Table Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Generate Markdown tables from CSV data or create from scratch.",
      },
      { property: "og:title", content: "Markdown Table Generator | Flixo" },
    ],
  }),
  component: MarkdownTablePage,
});

function MarkdownTablePage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("markdown-table"))}
        description="Generate Markdown tables from CSV data."
        category={t(categoryNameKey("developer"))}
        slug="markdown-table"
      >
        <MarkdownTableGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
