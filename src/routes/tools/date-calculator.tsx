import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { DateCalculator } from "@/components/tools/DateCalculator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/date-calculator")({
  head: () => ({
    meta: [
      { title: "Date Calculator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online date calculator tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Date Calculator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: DateCalculatorPage,
});

function DateCalculatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("date-calculator"))}
        description="Free online date calculator tool."
        category={t(categoryNameKey("utilities"))}
        slug="date-calculator"
      >
        <DateCalculator />
      </ToolLayout>
    </SiteLayout>
  );
}
