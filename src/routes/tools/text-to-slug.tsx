import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { TextToSlug } from "@/components/tools/TextToSlug";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/text-to-slug")({
  head: () => ({
    meta: [
      { title: "Text To Slug — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online text to slug tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: TextToSlugPage,
});

function TextToSlugPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("text-to-slug"))}
        description="Free online text to slug tool."
        category={t(categoryNameKey("utilities"))}
        slug="text-to-slug"
      >
        <TextToSlug />
      </ToolLayout>
    </SiteLayout>
  );
}
