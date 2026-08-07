import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { DuplicateCharacterFinder } from "@/components/tools/DuplicateCharacterFinder";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/duplicate-character-finder")({
  head: () => ({
    meta: [
      { title: "Duplicate Character Finder — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online duplicate character finder tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Duplicate Character Finder | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: DuplicateCharacterFinderPage,
});

function DuplicateCharacterFinderPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("duplicate-character-finder"))}
        description="Free online duplicate character finder tool."
        category={t(categoryNameKey("utilities"))}
        slug="duplicate-character-finder"
      >
        <DuplicateCharacterFinder />
      </ToolLayout>
    </SiteLayout>
  );
}
