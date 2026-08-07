import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { PercentageDistributionCalculator } from "@/components/tools/PercentageDistributionCalculator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/percentage-distribution-calculator")({
  head: () => ({
    meta: [
      { title: "Percentage Distribution Calculator — Free Online Tool | Flixo" },
      {
        name: "description",
        content:
          "Free online percentage distribution calculator tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: PercentageDistributionCalculatorPage,
});

function PercentageDistributionCalculatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("percentage-distribution-calculator"))}
        description="Free online percentage distribution calculator tool."
        category={t(categoryNameKey("utilities"))}
        slug="percentage-distribution-calculator"
      >
        <PercentageDistributionCalculator />
      </ToolLayout>
    </SiteLayout>
  );
}
