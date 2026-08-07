import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { CreditCardGenerator } from "@/components/tools/CreditCardGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/credit-card-generator")({
  head: () => ({
    meta: [
      { title: "Credit Card Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online credit card generator tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: CreditCardGeneratorPage,
});

function CreditCardGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("credit-card-generator"))}
        description="Free online credit card generator tool."
        category={t(categoryNameKey("utilities"))}
        slug="credit-card-generator"
      >
        <CreditCardGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
