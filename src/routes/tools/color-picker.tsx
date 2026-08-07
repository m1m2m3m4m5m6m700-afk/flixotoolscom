import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ColorPickerTool } from "@/components/tools/ColorPickerTool";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/color-picker")({
  head: () => ({
    meta: [
      { title: "Color Picker — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Pick colors, convert between formats (HEX, RGB, HSL). Free online color picker.",
      },
      { property: "og:title", content: "Color Picker | Flixo" },
    ],
  }),
  component: ColorPickerPage,
});

function ColorPickerPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("color-picker"))}
        description="Pick colors and convert between formats."
        category={t(categoryNameKey("utilities"))}
        slug="color-picker"
      >
        <ColorPickerTool />
      </ToolLayout>
    </SiteLayout>
  );
}
