import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { LoremIpsumGenerator } from "@/components/tools/LoremIpsumGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/lorem-ipsum-generator")({
  head: () => ({
    meta: [
      { title: "Lorem Ipsum Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online lorem ipsum generator tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: LoremIpsumGeneratorPage,
});

function LoremIpsumGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("lorem-ipsum-generator"))}
        description="Free online lorem ipsum generator tool."
        category={t(categoryNameKey("utilities"))}
        slug="lorem-ipsum-generator"
      >
        <LoremIpsumGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
