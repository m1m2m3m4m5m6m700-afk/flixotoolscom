import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { JSONPathEvaluator } from "@/components/tools/JSONPathEvaluator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/json-path-evaluator")({
  head: () => ({
    meta: [
      { title: "Json Path Evaluator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online json path evaluator tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: JSONPathEvaluatorPage,
});

function JSONPathEvaluatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("json-path-evaluator"))}
        description="Free online json path evaluator tool."
        category={t(categoryNameKey("utilities"))}
        slug="json-path-evaluator"
      >
        <JSONPathEvaluator />
      </ToolLayout>
    </SiteLayout>
  );
}
