import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { CSSGradientGenerator } from "@/components/tools/CSSGradientGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/css-gradient-generator")({
  head: () => ({
    meta: [
      { title: "Css Gradient Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online css gradient generator tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Css Gradient Generator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CSSGradientGeneratorPage,
});

function CSSGradientGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("css-gradient-generator"))}
        description="Free online css gradient generator tool."
        category={t(categoryNameKey("utilities"))}
        slug="css-gradient-generator"
      >
        <CSSGradientGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
