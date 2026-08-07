import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { HexConverter } from "@/components/tools/HexConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/hex-converter")({
  head: () => ({
    meta: [
      { title: "Hex Converter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online hex converter tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Hex Converter | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HexConverterPage,
});

function HexConverterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("hex-converter"))}
        description="Free online hex converter tool."
        category={t(categoryNameKey("utilities"))}
        slug="hex-converter"
      >
        <HexConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
