import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { RandomDateGenerator } from "@/components/tools/RandomDateGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/random-date-generator")({
  head: () => ({
    meta: [
      { title: "Random Date Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online random date generator tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: RandomDateGeneratorPage,
});

function RandomDateGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("random-date-generator"))}
        description="Free online random date generator tool."
        category={t(categoryNameKey("utilities"))}
        slug="random-date-generator"
      >
        <RandomDateGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
