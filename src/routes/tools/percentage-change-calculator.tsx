import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { PercentageChangeCalculator } from "@/components/tools/PercentageChangeCalculator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/percentage-change-calculator")({
  head: () => ({
    meta: [
      { title: "Percentage Change Calculator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online percentage change calculator tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: PercentageChangeCalculatorPage,
});

function PercentageChangeCalculatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("percentage-change-calculator"))}
        description="Free online percentage change calculator tool."
        category={t(categoryNameKey("utilities"))}
        slug="percentage-change-calculator"
      >
        <PercentageChangeCalculator />
      </ToolLayout>
    </SiteLayout>
  );
}
