import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { RandomTeamGenerator } from "@/components/tools/RandomTeamGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/random-team-generator")({
  head: () => ({
    meta: [
      { title: "Random Team Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online random team generator tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: RandomTeamGeneratorPage,
});

function RandomTeamGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("random-team-generator"))}
        description="Free online random team generator tool."
        category={t(categoryNameKey("utilities"))}
        slug="random-team-generator"
      >
        <RandomTeamGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
