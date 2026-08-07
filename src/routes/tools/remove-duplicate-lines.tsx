import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { RemoveDuplicateLinesTool } from "@/components/tools/RemoveDuplicateLines";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/remove-duplicate-lines")({
  head: () => ({
    meta: [
      { title: "Remove Duplicate Lines — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Remove duplicate lines from text instantly. Free online duplicate line remover.",
      },
      { property: "og:title", content: "Remove Duplicate Lines | Flixo" },
    ],
  }),
  component: RemoveDuplicateLinesPage,
});

function RemoveDuplicateLinesPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("remove-duplicate-lines"))}
        description="Remove duplicate lines from text instantly."
        category={t(categoryNameKey("utilities"))}
        slug="remove-duplicate-lines"
      >
        <RemoveDuplicateLinesTool />
      </ToolLayout>
    </SiteLayout>
  );
}
