import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { SlugGenerator } from "@/components/tools/SlugGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/slug-checker")({
  head: () => ({
    meta: [
      { title: "Slug Checker — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online slug checker tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Slug Checker | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: SlugGeneratorPage,
});

function SlugGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("slug-checker"))}
        description="Free online slug checker tool."
        category={t(categoryNameKey("utilities"))}
        slug="slug-checker"
      >
        <SlugGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
