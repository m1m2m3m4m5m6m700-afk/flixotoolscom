import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { RandomPasswordGenerator } from "@/components/tools/RandomPasswordGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/random-password-generator")({
  head: () => ({
    meta: [
      { title: "Random Password Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online random password generator tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Random Password Generator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: RandomPasswordGeneratorPage,
});

function RandomPasswordGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("random-password-generator"))}
        description="Free online random password generator tool."
        category={t(categoryNameKey("utilities"))}
        slug="random-password-generator"
      >
        <RandomPasswordGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
