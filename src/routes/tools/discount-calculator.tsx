import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { DiscountCalculator } from "@/components/tools/DiscountCalculator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/discount-calculator")({
  head: () => ({
    meta: [
      { title: "Discount Calculator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online discount calculator tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Discount Calculator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: DiscountCalculatorPage,
});

function DiscountCalculatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("discount-calculator"))}
        description="Free online discount calculator tool."
        category={t(categoryNameKey("utilities"))}
        slug="discount-calculator"
      >
        <DiscountCalculator />
      </ToolLayout>
    </SiteLayout>
  );
}
