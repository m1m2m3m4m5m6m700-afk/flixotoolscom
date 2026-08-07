import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { VATCalculator } from "@/components/tools/VATCalculator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/vat-calculator")({
  head: () => ({
    meta: [
      { title: "Vat Calculator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online vat calculator tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Vat Calculator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: VATCalculatorPage,
});

function VATCalculatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("vat-calculator"))}
        description="Free online vat calculator tool."
        category={t(categoryNameKey("utilities"))}
        slug="vat-calculator"
      >
        <VATCalculator />
      </ToolLayout>
    </SiteLayout>
  );
}
