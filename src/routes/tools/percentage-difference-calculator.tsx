import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { PercentageDifferenceCalculator } from "@/components/tools/PercentageDifferenceCalculator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/percentage-difference-calculator")({
  head: () => ({
    meta: [
      { title: "Percentage Difference Calculator — Free Online Tool | Flixo" },
      {
        name: "description",
        content:
          "Free online percentage difference calculator tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: PercentageDifferenceCalculatorPage,
});

function PercentageDifferenceCalculatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("percentage-difference-calculator"))}
        description="Free online percentage difference calculator tool."
        category={t(categoryNameKey("utilities"))}
        slug="percentage-difference-calculator"
      >
        <PercentageDifferenceCalculator />
      </ToolLayout>
    </SiteLayout>
  );
}
