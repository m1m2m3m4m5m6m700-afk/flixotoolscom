import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { BMICalculator } from "@/components/tools/BMICalculator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/bmi-calculator")({
  head: () => ({
    meta: [
      { title: "Bmi Calculator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online bmi calculator tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Bmi Calculator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BMICalculatorPage,
});

function BMICalculatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("bmi-calculator"))}
        description="Free online bmi calculator tool."
        category={t(categoryNameKey("utilities"))}
        slug="bmi-calculator"
      >
        <BMICalculator />
      </ToolLayout>
    </SiteLayout>
  );
}
