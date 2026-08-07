import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { RandomDecimalGenerator } from "@/components/tools/RandomDecimalGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/random-decimal-generator")({
  head: () => ({
    meta: [
      { title: "Random Decimal Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online random decimal generator tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: RandomDecimalGeneratorPage,
});

function RandomDecimalGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("random-decimal-generator"))}
        description="Free online random decimal generator tool."
        category={t(categoryNameKey("utilities"))}
        slug="random-decimal-generator"
      >
        <RandomDecimalGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
