import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { TrimSpacesTool } from "@/components/tools/TrimSpacesTool";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/trim-spaces")({
  head: () => ({
    meta: [
      { title: "Trim Spaces — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Remove extra spaces from text. Trim leading, trailing, and multiple spaces.",
      },
      { property: "og:title", content: "Trim Spaces | Flixo" },
    ],
  }),
  component: TrimSpacesPage,
});

function TrimSpacesPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("trim-spaces"))}
        description="Remove extra spaces from text."
        category={t(categoryNameKey("utilities"))}
        slug="trim-spaces"
      >
        <TrimSpacesTool />
      </ToolLayout>
    </SiteLayout>
  );
}
