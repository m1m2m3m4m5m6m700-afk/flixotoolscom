import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { CurrencyFormatter } from "@/components/tools/CurrencyFormatter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/currency-formatter")({
  head: () => ({
    meta: [
      { title: "Currency Formatter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online currency formatter tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: CurrencyFormatterPage,
});

function CurrencyFormatterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("currency-formatter"))}
        description="Free online currency formatter tool."
        category={t(categoryNameKey("utilities"))}
        slug="currency-formatter"
      >
        <CurrencyFormatter />
      </ToolLayout>
    </SiteLayout>
  );
}
