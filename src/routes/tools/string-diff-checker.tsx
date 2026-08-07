import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { StringDiffChecker } from "@/components/tools/StringDiffChecker";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/string-diff-checker")({
  head: () => ({
    meta: [
      { title: "String Diff Checker — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online string diff checker tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: StringDiffCheckerPage,
});

function StringDiffCheckerPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("string-diff-checker"))}
        description="Free online string diff checker tool."
        category={t(categoryNameKey("utilities"))}
        slug="string-diff-checker"
      >
        <StringDiffChecker />
      </ToolLayout>
    </SiteLayout>
  );
}
