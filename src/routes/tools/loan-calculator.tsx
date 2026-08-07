import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { LoanCalculator } from "@/components/tools/LoanCalculator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/loan-calculator")({
  head: () => ({
    meta: [
      { title: "Loan Calculator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online loan calculator tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Loan Calculator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LoanCalculatorPage,
});

function LoanCalculatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("loan-calculator"))}
        description="Free online loan calculator tool."
        category={t(categoryNameKey("utilities"))}
        slug="loan-calculator"
      >
        <LoanCalculator />
      </ToolLayout>
    </SiteLayout>
  );
}
