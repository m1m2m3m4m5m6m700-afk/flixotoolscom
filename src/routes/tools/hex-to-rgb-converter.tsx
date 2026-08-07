import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { HexToRgbConverter } from "@/components/tools/HexToRgbConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/hex-to-rgb-converter")({
  head: () => ({
    meta: [
      { title: "Hex To Rgb Converter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online hex to rgb converter tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: HexToRgbConverterPage,
});

function HexToRgbConverterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("hex-to-rgb-converter"))}
        description="Free online hex to rgb converter tool."
        category={t(categoryNameKey("utilities"))}
        slug="hex-to-rgb-converter"
      >
        <HexToRgbConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
