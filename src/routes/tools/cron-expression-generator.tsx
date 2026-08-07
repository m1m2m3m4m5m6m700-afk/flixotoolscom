import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { CronExpressionGenerator } from "@/components/tools/CronExpressionGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/cron-expression-generator")({
  head: () => ({
    meta: [
      { title: "Cron Expression Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online cron expression generator tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: CronExpressionGeneratorPage,
});

function CronExpressionGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("cron-expression-generator"))}
        description="Free online cron expression generator tool."
        category={t(categoryNameKey("utilities"))}
        slug="cron-expression-generator"
      >
        <CronExpressionGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
