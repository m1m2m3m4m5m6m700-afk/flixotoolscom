import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { CSSMinifier } from "@/components/tools/CSSMinifier";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/css-minifier")({
  head: () => ({
    meta: [
      { title: "Css Minifier — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online css minifier tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: CSSMinifierPage,
});

function CSSMinifierPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("css-minifier"))}
        description="Free online css minifier tool."
        category={t(categoryNameKey("utilities"))}
        slug="css-minifier"
      >
        <CSSMinifier />
      </ToolLayout>
    </SiteLayout>
  );
}
