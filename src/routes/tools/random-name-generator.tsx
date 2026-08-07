import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { RandomNameGenerator } from "@/components/tools/RandomNameGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/random-name-generator")({
  head: () => ({
    meta: [
      { title: "Random Name Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online random name generator tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Random Name Generator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: RandomNameGeneratorPage,
});

function RandomNameGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("random-name-generator"))}
        description="Free online random name generator tool."
        category={t(categoryNameKey("utilities"))}
        slug="random-name-generator"
      >
        <RandomNameGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
