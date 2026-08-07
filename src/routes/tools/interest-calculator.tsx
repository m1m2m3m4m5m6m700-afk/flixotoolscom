import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { InterestCalculator } from "@/components/tools/InterestCalculator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/interest-calculator")({
  head: () => ({
    meta: [
      { title: "Interest Calculator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online interest calculator tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: InterestCalculatorPage,
});

function InterestCalculatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("interest-calculator"))}
        description="Free online interest calculator tool."
        category={t(categoryNameKey("utilities"))}
        slug="interest-calculator"
      >
        <InterestCalculator />
      </ToolLayout>
    </SiteLayout>
  );
}
