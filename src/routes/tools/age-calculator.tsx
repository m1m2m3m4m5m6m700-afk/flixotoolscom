import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { AgeCalculator } from "@/components/tools/AgeCalculator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/age-calculator")({
  head: () => ({
    meta: [
      { title: "Age Calculator — Calculate Your Exact Age | Flixo" },
      { name: "description", content: "Calculate your exact age in years, months, and days." },
      { property: "og:title", content: "Age Calculator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AgeCalculatorPage,
});

function AgeCalculatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        icon={Calendar}
        name={t(toolNameKey("age-calculator"))}
        description="Calculate your exact age in years, months, and days."
        category={t(categoryNameKey("calculators"))}
        slug="age-calculator"
      >
        <AgeCalculator />
      </ToolLayout>
    </SiteLayout>
  );
}
