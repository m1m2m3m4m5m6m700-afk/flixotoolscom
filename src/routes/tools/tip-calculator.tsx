import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { TipCalculator } from "@/components/tools/TipCalculator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/tip-calculator")({
  head: () => ({
    meta: [
      { title: "Tip Calculator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online tip calculator tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Tip Calculator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TipCalculatorPage,
});

function TipCalculatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("tip-calculator"))}
        description="Free online tip calculator tool."
        category={t(categoryNameKey("utilities"))}
        slug="tip-calculator"
      >
        <TipCalculator />
      </ToolLayout>
    </SiteLayout>
  );
}
