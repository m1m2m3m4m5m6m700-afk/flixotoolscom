import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ProfitMarginCalculator } from "@/components/tools/ProfitMarginCalculator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/profit-margin-calculator")({
  head: () => ({
    meta: [
      { title: "Profit Margin Calculator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Calculate profit margin, markup, and gross profit for your business.",
      },
      { property: "og:title", content: "Profit Margin Calculator | Flixo" },
    ],
  }),
  component: ProfitMarginCalculatorPage,
});

function ProfitMarginCalculatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("profit-margin-calculator"))}
        description="Calculate profit margins and markup."
        category={t(categoryNameKey("calculators"))}
        slug="profit-margin-calculator"
      >
        <ProfitMarginCalculator />
      </ToolLayout>
    </SiteLayout>
  );
}
