import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { NumberSpeller } from "@/components/tools/NumberSpeller";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/number-speller")({
  head: () => ({
    meta: [
      { title: "Number Speller — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online number speller tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: NumberSpellerPage,
});

function NumberSpellerPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("number-speller"))}
        description="Free online number speller tool."
        category={t(categoryNameKey("utilities"))}
        slug="number-speller"
      >
        <NumberSpeller />
      </ToolLayout>
    </SiteLayout>
  );
}
