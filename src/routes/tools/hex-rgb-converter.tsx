import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { HexRgbConverter } from "@/components/tools/HexRgbConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/hex-rgb-converter")({
  head: () => ({
    meta: [
      { title: "Hex Rgb Converter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online hex rgb converter tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: HexRgbConverterPage,
});

function HexRgbConverterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("hex-rgb-converter"))}
        description="Free online hex rgb converter tool."
        category={t(categoryNameKey("utilities"))}
        slug="hex-rgb-converter"
      >
        <HexRgbConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
