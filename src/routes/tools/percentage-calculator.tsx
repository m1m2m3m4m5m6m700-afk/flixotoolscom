import { createFileRoute } from "@tanstack/react-router";
import { Percent } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { PercentageCalculator } from "@/components/tools/PercentageCalculator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/percentage-calculator")({
  head: () => ({
    meta: [
      { title: "Percentage Calculator — Calculate Percentages Online | Flixo" },
      { name: "description", content: "Calculate percentages, percentage change, and more." },
      { property: "og:title", content: "Percentage Calculator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PercentageCalculatorPage,
});

function PercentageCalculatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        icon={Percent}
        name={t(toolNameKey("percentage-calculator"))}
        description="Calculate percentages, percentage change, and more."
        category={t(categoryNameKey("calculators"))}
        slug="percentage-calculator"
      >
        <PercentageCalculator />
      </ToolLayout>
    </SiteLayout>
  );
}
