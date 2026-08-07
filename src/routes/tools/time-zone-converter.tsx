import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { TimeZoneConverter } from "@/components/tools/TimeZoneConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/time-zone-converter")({
  head: () => ({
    meta: [
      { title: "Time Zone Converter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online time zone converter tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Time Zone Converter | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TimeZoneConverterPage,
});

function TimeZoneConverterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("time-zone-converter"))}
        description="Free online time zone converter tool."
        category={t(categoryNameKey("utilities"))}
        slug="time-zone-converter"
      >
        <TimeZoneConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
