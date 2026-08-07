import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { CaseTransformer } from "@/components/tools/CaseTransformer";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/case-transformer")({
  head: () => ({
    meta: [
      { title: "Case Transformer — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online case transformer tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: CaseTransformerPage,
});

function CaseTransformerPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("case-transformer"))}
        description="Free online case transformer tool."
        category={t(categoryNameKey("utilities"))}
        slug="case-transformer"
      >
        <CaseTransformer />
      </ToolLayout>
    </SiteLayout>
  );
}
