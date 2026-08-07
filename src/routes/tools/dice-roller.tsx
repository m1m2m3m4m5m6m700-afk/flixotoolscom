import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { DiceRoller } from "@/components/tools/DiceRoller";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/dice-roller")({
  head: () => ({
    meta: [
      { title: "Dice Roller — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online dice roller tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Dice Roller | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: DiceRollerPage,
});

function DiceRollerPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("dice-roller"))}
        description="Free online dice roller tool."
        category={t(categoryNameKey("utilities"))}
        slug="dice-roller"
      >
        <DiceRoller />
      </ToolLayout>
    </SiteLayout>
  );
}
