import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { RandomPasswordTool } from "@/components/tools/RandomPasswordTool";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/random-password")({
  head: () => ({
    meta: [
      { title: "Random Password Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Generate secure random passwords with custom length and character options.",
      },
      { property: "og:title", content: "Random Password Generator | Flixo" },
    ],
  }),
  component: RandomPasswordPage,
});

function RandomPasswordPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("random-password"))}
        description="Generate secure random passwords."
        category={t(categoryNameKey("utilities"))}
        slug="random-password"
      >
        <RandomPasswordTool />
      </ToolLayout>
    </SiteLayout>
  );
}
