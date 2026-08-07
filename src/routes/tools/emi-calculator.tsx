import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { EMICalculator } from "@/components/tools/EMICalculator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/emi-calculator")({
  head: () => ({
    meta: [
      { title: "EMI Calculator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Calculate EMI for loans. Free online EMI calculator with detailed breakdown.",
      },
      { property: "og:title", content: "EMI Calculator | Flixo" },
    ],
  }),
  component: EMICalculatorPage,
});

function EMICalculatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("emi-calculator"))}
        description="Calculate EMI for loans."
        category={t(categoryNameKey("calculators"))}
        slug="emi-calculator"
      >
        <EMICalculator />
      </ToolLayout>
    </SiteLayout>
  );
}
