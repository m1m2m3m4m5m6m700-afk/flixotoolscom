import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { JSMinifier } from "@/components/tools/JSMinifier";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/js-minifier")({
  head: () => ({
    meta: [
      { title: "Js Minifier — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online js minifier tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: JSMinifierPage,
});

function JSMinifierPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("js-minifier"))}
        description="Free online js minifier tool."
        category={t(categoryNameKey("utilities"))}
        slug="js-minifier"
      >
        <JSMinifier />
      </ToolLayout>
    </SiteLayout>
  );
}
