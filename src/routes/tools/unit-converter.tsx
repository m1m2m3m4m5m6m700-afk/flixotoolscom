import { createFileRoute } from "@tanstack/react-router";
import { Scale } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { UnitConverter } from "@/components/tools/UnitConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/unit-converter")({
  head: () => ({
    meta: [
      { title: "Unit Converter — Length, Weight, Temperature & More | Flixo" },
      { name: "description", content: "Convert length, weight, temperature, and more." },
      { property: "og:title", content: "Unit Converter | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: UnitConverterPage,
});

function UnitConverterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        icon={Scale}
        name={t(toolNameKey("unit-converter"))}
        description="Convert length, weight, temperature, data, time, and speed."
        category={t(categoryNameKey("converters"))}
        slug="unit-converter"
      >
        <UnitConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
