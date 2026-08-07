import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { MarkdownToHTMLTool } from "@/components/tools/MarkdownToHTMLTool";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/markdown-to-html")({
  head: () => ({
    meta: [
      { title: "Markdown to HTML Converter — Free Online Tool | Flixo" },
      {
        name: "description",
        content:
          "Convert Markdown to HTML format instantly. Free online converter with live preview.",
      },
      { property: "og:title", content: "Markdown to HTML Converter | Flixo" },
    ],
  }),
  component: MarkdownToHTMLPage,
});

function MarkdownToHTMLPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("markdown-to-html"))}
        description="Convert Markdown to HTML format."
        category={t(categoryNameKey("developer"))}
        slug="markdown-to-html"
      >
        <MarkdownToHTMLTool />
      </ToolLayout>
    </SiteLayout>
  );
}
