import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { MortgageCalculator } from "@/components/tools/MortgageCalculator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/mortgage-calculator")({
  head: () => ({
    meta: [
      { title: "Mortgage Calculator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Calculate monthly mortgage payments, total interest, and amortization schedule.",
      },
      { property: "og:title", content: "Mortgage Calculator | Flixo" },
    ],
  }),
  component: MortgageCalculatorPage,
});

function MortgageCalculatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("mortgage-calculator"))}
        description="Calculate mortgage payments and amortization."
        category={t(categoryNameKey("calculators"))}
        slug="mortgage-calculator"
      >
        <MortgageCalculator />
      </ToolLayout>
    </SiteLayout>
  );
}
