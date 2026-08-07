import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { HTMLToMarkdownTool } from "@/components/tools/HTMLToMarkdownTool";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/html-to-markdown")({
  head: () => ({
    meta: [
      { title: "HTML to Markdown Converter — Free Online Tool | Flixo" },
      {
        name: "description",
        content:
          "Convert HTML to Markdown format instantly. Free online converter with copy and download.",
      },
      { property: "og:title", content: "HTML to Markdown Converter | Flixo" },
    ],
  }),
  component: HTMLToMarkdownPage,
});

function HTMLToMarkdownPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("html-to-markdown"))}
        description="Convert HTML to Markdown format."
        category={t(categoryNameKey("developer"))}
        slug="html-to-markdown"
      >
        <HTMLToMarkdownTool />
      </ToolLayout>
    </SiteLayout>
  );
}
