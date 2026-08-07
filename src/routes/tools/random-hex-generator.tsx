import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { RandomHexGenerator } from "@/components/tools/RandomHexGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/random-hex-generator")({
  head: () => ({
    meta: [
      { title: "Random Hex Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online random hex generator tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: RandomHexGeneratorPage,
});

function RandomHexGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("random-hex-generator"))}
        description="Free online random hex generator tool."
        category={t(categoryNameKey("utilities"))}
        slug="random-hex-generator"
      >
        <RandomHexGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
