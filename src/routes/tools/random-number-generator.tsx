import { createFileRoute } from "@tanstack/react-router";
import { Shuffle } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { RandomNumberGenerator } from "@/components/tools/RandomNumberGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/random-number-generator")({
  head: () => ({
    meta: [
      { title: "Random Number Generator — Generate Random Numbers | Flixo" },
      { name: "description", content: "Generate random numbers with custom range and quantity." },
      { property: "og:title", content: "Random Number Generator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: RandomNumberGeneratorPage,
});

function RandomNumberGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        icon={Shuffle}
        name={t(toolNameKey("random-number-generator"))}
        description="Generate random numbers with custom range."
        category={t(categoryNameKey("utilities"))}
        slug="random-number-generator"
      >
        <RandomNumberGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
