import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { FuelCostCalculator } from "@/components/tools/FuelCostCalculator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/fuel-cost-calculator")({
  head: () => ({
    meta: [
      { title: "Fuel Cost Calculator — Free Online Tool | Flixo" },
      {
        name: "description",
        content:
          "Calculate fuel costs for your trip. Estimate gas expenses based on distance and fuel efficiency.",
      },
      { property: "og:title", content: "Fuel Cost Calculator | Flixo" },
    ],
  }),
  component: FuelCostCalculatorPage,
});

function FuelCostCalculatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("fuel-cost-calculator"))}
        description="Calculate fuel costs for your trip."
        category={t(categoryNameKey("calculators"))}
        slug="fuel-cost-calculator"
      >
        <FuelCostCalculator />
      </ToolLayout>
    </SiteLayout>
  );
}
