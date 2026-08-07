import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { RandomLotteryNumberGenerator } from "@/components/tools/RandomLotteryNumberGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/random-lottery-number-generator")({
  head: () => ({
    meta: [
      { title: "Random Lottery Number Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content:
          "Free online random lottery number generator tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: RandomLotteryNumberGeneratorPage,
});

function RandomLotteryNumberGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("random-lottery-number-generator"))}
        description="Free online random lottery number generator tool."
        category={t(categoryNameKey("utilities"))}
        slug="random-lottery-number-generator"
      >
        <RandomLotteryNumberGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
