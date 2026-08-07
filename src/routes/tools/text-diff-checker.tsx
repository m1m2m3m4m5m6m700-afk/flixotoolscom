import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { TextDiffChecker } from "@/components/tools/TextDiffChecker";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/text-diff-checker")({
  head: () => ({
    meta: [
      { title: "Text Diff Checker — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online text diff checker tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Text Diff Checker | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TextDiffCheckerPage,
});

function TextDiffCheckerPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("text-diff-checker"))}
        description="Free online text diff checker tool."
        category={t(categoryNameKey("utilities"))}
        slug="text-diff-checker"
      >
        <TextDiffChecker />
      </ToolLayout>
    </SiteLayout>
  );
}
