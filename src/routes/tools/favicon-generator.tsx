import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { FaviconGenerator } from "@/components/tools/FaviconGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/favicon-generator")({
  head: () => ({
    meta: [
      { title: "Favicon Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online favicon generator tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: FaviconGeneratorPage,
});

function FaviconGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("favicon-generator"))}
        description="Free online favicon generator tool."
        category={t(categoryNameKey("utilities"))}
        slug="favicon-generator"
      >
        <FaviconGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
