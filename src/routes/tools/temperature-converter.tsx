import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { TemperatureConverter } from "@/components/tools/TemperatureConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/temperature-converter")({
  head: () => ({
    meta: [
      { title: "Temperature Converter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online temperature converter tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Temperature Converter | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TemperatureConverterPage,
});

function TemperatureConverterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("temperature-converter"))}
        description="Free online temperature converter tool."
        category={t(categoryNameKey("utilities"))}
        slug="temperature-converter"
      >
        <TemperatureConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
