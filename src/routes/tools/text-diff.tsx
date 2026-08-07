import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { TextDiffTool } from "@/components/tools/TextDiffTool";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/text-diff")({
  head: () => ({
    meta: [
      { title: "Text Diff Checker — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Compare two texts and see the differences highlighted. Free online diff checker.",
      },
      { property: "og:title", content: "Text Diff Checker | Flixo" },
    ],
  }),
  component: TextDiffPage,
});

function TextDiffPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("text-diff"))}
        description="Compare two texts and see the differences highlighted."
        category={t(categoryNameKey("developer"))}
        slug="text-diff"
      >
        <TextDiffTool />
      </ToolLayout>
    </SiteLayout>
  );
}
