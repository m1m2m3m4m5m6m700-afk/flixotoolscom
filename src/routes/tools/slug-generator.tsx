import { createFileRoute } from "@tanstack/react-router";
import { Link } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { SlugGenerator } from "@/components/tools/SlugGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/slug-generator")({
  head: () => ({
    meta: [
      { title: "Slug Generator — Create URL-Friendly Slugs | Flixo" },
      { name: "description", content: "Convert titles to URL-friendly slugs for SEO." },
      { property: "og:title", content: "Slug Generator | Flixo" },
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
        icon={Link}
        name={t(toolNameKey("slug-generator"))}
        description="Convert titles to URL-friendly slugs."
        category={t(categoryNameKey("web"))}
        slug="slug-generator"
      >
        <SlugGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
