import { createFileRoute } from "@tanstack/react-router";
import { CreditCard } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { CreditCardValidator } from "@/components/tools/CreditCardValidator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/credit-card-validator")({
  head: () => ({
    meta: [
      { title: "Credit Card Validator — Validate Card Numbers | Flixo" },
      { name: "description", content: "Validate credit card numbers with Luhn algorithm." },
      { property: "og:title", content: "Credit Card Validator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CreditCardValidatorPage,
});

function CreditCardValidatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        icon={CreditCard}
        name={t(toolNameKey("credit-card-validator"))}
        description="Validate credit card numbers with Luhn algorithm."
        category={t(categoryNameKey("utilities"))}
        slug="credit-card-validator"
      >
        <CreditCardValidator />
      </ToolLayout>
    </SiteLayout>
  );
}
