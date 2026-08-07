import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { HashCheckGenerator } from "@/components/tools/HashCheckGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/hash-check-generator")({
  head: () => ({
    meta: [
      { title: "Hash Check Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online hash check generator tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Hash Check Generator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HashCheckGeneratorPage,
});

function HashCheckGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("hash-check-generator"))}
        description="Free online hash check generator tool."
        category={t(categoryNameKey("utilities"))}
        slug="hash-check-generator"
      >
        <HashCheckGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
