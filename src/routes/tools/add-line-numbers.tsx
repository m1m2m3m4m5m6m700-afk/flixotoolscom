import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { AddLineNumbersTool } from "@/components/tools/AddLineNumbersTool";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/add-line-numbers")({
  head: () => ({
    meta: [
      { title: "Add Line Numbers — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Add line numbers to your text. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Add Line Numbers | Flixo" },
    ],
  }),
  component: AddLineNumbersPage,
});

function AddLineNumbersPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("add-line-numbers"))}
        description="Add line numbers to your text."
        category={t(categoryNameKey("utilities"))}
        slug="add-line-numbers"
      >
        <AddLineNumbersTool />
      </ToolLayout>
    </SiteLayout>
  );
}
