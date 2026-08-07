import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ROICalculator } from "@/components/tools/ROICalculator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/roi-calculator")({
  head: () => ({
    meta: [
      { title: "ROI Calculator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Calculate Return on Investment (ROI) and analyze investment performance.",
      },
      { property: "og:title", content: "ROI Calculator | Flixo" },
    ],
  }),
  component: ROICalculatorPage,
});

function ROICalculatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("roi-calculator"))}
        description="Calculate Return on Investment."
        category={t(categoryNameKey("calculators"))}
        slug="roi-calculator"
      >
        <ROICalculator />
      </ToolLayout>
    </SiteLayout>
  );
}
