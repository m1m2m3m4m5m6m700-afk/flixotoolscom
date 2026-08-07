import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { RandomPicker } from "@/components/tools/RandomPicker";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/random-picker")({
  head: () => ({
    meta: [
      { title: "Random Picker — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online random picker tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: RandomPickerPage,
});

function RandomPickerPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("random-picker"))}
        description="Free online random picker tool."
        category={t(categoryNameKey("utilities"))}
        slug="random-picker"
      >
        <RandomPicker />
      </ToolLayout>
    </SiteLayout>
  );
}
