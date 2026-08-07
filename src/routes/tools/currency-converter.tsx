import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { CurrencyConverter } from "@/components/tools/CurrencyConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/currency-converter")({
  head: () => ({
    meta: [
      { title: "Currency Converter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online currency converter tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Currency Converter | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CurrencyConverterPage,
});

function CurrencyConverterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("currency-converter"))}
        description="Free online currency converter tool."
        category={t(categoryNameKey("utilities"))}
        slug="currency-converter"
      >
        <CurrencyConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
