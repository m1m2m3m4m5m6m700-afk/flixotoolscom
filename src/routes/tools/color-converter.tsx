import { createFileRoute } from "@tanstack/react-router";
import { Palette } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ColorConverter } from "@/components/tools/ColorConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/color-converter")({
  head: () => ({
    meta: [
      { title: "Color Converter — HEX, RGB, HSL Color Picker | Flixo" },
      { name: "description", content: "Convert colors between HEX, RGB, HSL, and HSV formats." },
      { property: "og:title", content: "Color Converter | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ColorConverterPage,
});

function ColorConverterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        icon={Palette}
        name={t(toolNameKey("color-converter"))}
        description="Convert colors between HEX, RGB, HSL, and HSV formats."
        category={t(categoryNameKey("developer"))}
        slug="color-converter"
      >
        <ColorConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
