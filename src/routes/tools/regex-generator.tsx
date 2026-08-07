import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { RegexGenerator } from "@/components/tools/RegexGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/regex-generator")({
  head: () => ({
    meta: [
      { title: "Regex Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online regex generator tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Regex Generator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: RegexGeneratorPage,
});

function RegexGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("regex-generator"))}
        description="Free online regex generator tool."
        category={t(categoryNameKey("utilities"))}
        slug="regex-generator"
      >
        <RegexGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
