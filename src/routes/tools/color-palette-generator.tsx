import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ColorPaletteGenerator } from "@/components/tools/ColorPaletteGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/color-palette-generator")({
  head: () => ({
    meta: [
      { title: "Color Palette Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online color palette generator tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: ColorPaletteGeneratorPage,
});

function ColorPaletteGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("color-palette-generator"))}
        description="Free online color palette generator tool."
        category={t(categoryNameKey("utilities"))}
        slug="color-palette-generator"
      >
        <ColorPaletteGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
