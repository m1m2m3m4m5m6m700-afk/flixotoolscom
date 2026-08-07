import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { HSLToHexConverter } from "@/components/tools/HSLToHexConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/hsl-to-hex-converter")({
  head: () => ({
    meta: [
      { title: "Hsl To Hex Converter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online hsl to hex converter tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: HSLToHexConverterPage,
});

function HSLToHexConverterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("hsl-to-hex-converter"))}
        description="Free online hsl to hex converter tool."
        category={t(categoryNameKey("utilities"))}
        slug="hsl-to-hex-converter"
      >
        <HSLToHexConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
