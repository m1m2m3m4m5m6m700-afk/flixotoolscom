import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { RandomColorGenerator } from "@/components/tools/RandomColorGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/random-color-generator")({
  head: () => ({
    meta: [
      { title: "Random Color Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online random color generator tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Random Color Generator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: RandomColorGeneratorPage,
});

function RandomColorGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("random-color-generator"))}
        description="Free online random color generator tool."
        category={t(categoryNameKey("utilities"))}
        slug="random-color-generator"
      >
        <RandomColorGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
