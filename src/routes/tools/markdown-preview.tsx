import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { MarkDownPreview } from "@/components/tools/MarkDownPreview";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/markdown-preview")({
  head: () => ({
    meta: [
      { title: "Markdown Preview — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online markdown preview tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: MarkDownPreviewPage,
});

function MarkDownPreviewPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("markdown-preview"))}
        description="Free online markdown preview tool."
        category={t(categoryNameKey("utilities"))}
        slug="markdown-preview"
      >
        <MarkDownPreview />
      </ToolLayout>
    </SiteLayout>
  );
}
