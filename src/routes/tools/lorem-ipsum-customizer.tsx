import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { LoremIpsumCustomizer } from "@/components/tools/LoremIpsumCustomizer";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/lorem-ipsum-customizer")({
  head: () => ({
    meta: [
      { title: "Lorem Ipsum Customizer — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online lorem ipsum customizer tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Lorem Ipsum Customizer | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LoremIpsumCustomizerPage,
});

function LoremIpsumCustomizerPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("lorem-ipsum-customizer"))}
        description="Free online lorem ipsum customizer tool."
        category={t(categoryNameKey("utilities"))}
        slug="lorem-ipsum-customizer"
      >
        <LoremIpsumCustomizer />
      </ToolLayout>
    </SiteLayout>
  );
}
