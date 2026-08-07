import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { CompoundInterestCalculator } from "@/components/tools/CompoundInterestCalculator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/compound-interest-calculator")({
  head: () => ({
    meta: [
      { title: "Compound Interest Calculator — Free Online Tool | Flixo" },
      {
        name: "description",
        content:
          "Calculate compound interest with different compounding periods. Free online calculator.",
      },
      { property: "og:title", content: "Compound Interest Calculator | Flixo" },
    ],
  }),
  component: CompoundInterestCalculatorPage,
});

function CompoundInterestCalculatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("compound-interest-calculator"))}
        description="Calculate compound interest with different compounding periods."
        category={t(categoryNameKey("calculators"))}
        slug="compound-interest-calculator"
      >
        <CompoundInterestCalculator />
      </ToolLayout>
    </SiteLayout>
  );
}
