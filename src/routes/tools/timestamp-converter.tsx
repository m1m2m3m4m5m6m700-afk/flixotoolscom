import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { TimestampConverter } from "@/components/tools/TimestampConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/timestamp-converter")({
  head: () => ({
    meta: [
      { title: "Timestamp Converter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Convert between timestamps and dates. Free online Unix timestamp converter.",
      },
      { property: "og:title", content: "Timestamp Converter | Flixo" },
    ],
  }),
  component: TimestampConverterPage,
});

function TimestampConverterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("timestamp-converter"))}
        description="Convert timestamps and dates."
        category={t(categoryNameKey("developer"))}
        slug="timestamp-converter"
      >
        <TimestampConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
