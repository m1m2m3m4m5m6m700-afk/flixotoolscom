import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { FlipCoinSimulator } from "@/components/tools/FlipCoinSimulator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/flip-coin-simulator")({
  head: () => ({
    meta: [
      { title: "Flip Coin Simulator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online flip coin simulator tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Flip Coin Simulator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: FlipCoinSimulatorPage,
});

function FlipCoinSimulatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("flip-coin-simulator"))}
        description="Free online flip coin simulator tool."
        category={t(categoryNameKey("utilities"))}
        slug="flip-coin-simulator"
      >
        <FlipCoinSimulator />
      </ToolLayout>
    </SiteLayout>
  );
}
