import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { InvestmentCalculator } from "@/components/tools/InvestmentCalculator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/investment-calculator")({
  head: () => ({
    meta: [
      { title: "Investment Calculator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online investment calculator tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Investment Calculator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: InvestmentCalculatorPage,
});

function InvestmentCalculatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("investment-calculator"))}
        description="Free online investment calculator tool."
        category={t(categoryNameKey("utilities"))}
        slug="investment-calculator"
      >
        <InvestmentCalculator />
      </ToolLayout>
    </SiteLayout>
  );
}
