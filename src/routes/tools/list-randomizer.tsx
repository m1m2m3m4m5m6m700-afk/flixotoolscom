import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ListRandomizer } from "@/components/tools/ListRandomizer";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/list-randomizer")({
  head: () => ({
    meta: [
      { title: "List Randomizer — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online list randomizer tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "List Randomizer | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ListRandomizerPage,
});

function ListRandomizerPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("list-randomizer"))}
        description="Free online list randomizer tool."
        category={t(categoryNameKey("utilities"))}
        slug="list-randomizer"
      >
        <ListRandomizer />
      </ToolLayout>
    </SiteLayout>
  );
}
