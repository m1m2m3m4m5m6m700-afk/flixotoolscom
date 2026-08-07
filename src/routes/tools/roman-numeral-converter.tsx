import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { RomanNumeralConverter } from "@/components/tools/RomanNumeralConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/roman-numeral-converter")({
  head: () => ({
    meta: [
      { title: "Roman Numeral Converter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online roman numeral converter tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Roman Numeral Converter | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: RomanNumeralConverterPage,
});

function RomanNumeralConverterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("roman-numeral-converter"))}
        description="Free online roman numeral converter tool."
        category={t(categoryNameKey("utilities"))}
        slug="roman-numeral-converter"
      >
        <RomanNumeralConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
