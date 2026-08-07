import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { RandomIdGenerator } from "@/components/tools/RandomIdGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/random-id-generator")({
  head: () => ({
    meta: [
      { title: "Random Id Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online random id generator tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Random Id Generator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: RandomIdGeneratorPage,
});

function RandomIdGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("random-id-generator"))}
        description="Free online random id generator tool."
        category={t(categoryNameKey("utilities"))}
        slug="random-id-generator"
      >
        <RandomIdGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
