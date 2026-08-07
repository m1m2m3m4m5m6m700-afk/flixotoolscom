import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { RemoveEmptyLinesTool } from "@/components/tools/RemoveEmptyLines";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/remove-empty-lines")({
  head: () => ({
    meta: [
      { title: "Remove Empty Lines — Free Online Tool | Flixo" },
      { name: "description", content: "Remove blank lines and whitespace from text instantly." },
      { property: "og:title", content: "Remove Empty Lines | Flixo" },
    ],
  }),
  component: RemoveEmptyLinesPage,
});

function RemoveEmptyLinesPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("remove-empty-lines"))}
        description="Remove blank lines and whitespace from text."
        category={t(categoryNameKey("utilities"))}
        slug="remove-empty-lines"
      >
        <RemoveEmptyLinesTool />
      </ToolLayout>
    </SiteLayout>
  );
}
