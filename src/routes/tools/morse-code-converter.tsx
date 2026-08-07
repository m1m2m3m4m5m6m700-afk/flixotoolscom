import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { MorseCodeConverter } from "@/components/tools/MorseCodeConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/morse-code-converter")({
  head: () => ({
    meta: [
      { title: "Morse Code Converter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online morse code converter tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Morse Code Converter | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: MorseCodeConverterPage,
});

function MorseCodeConverterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("morse-code-converter"))}
        description="Free online morse code converter tool."
        category={t(categoryNameKey("utilities"))}
        slug="morse-code-converter"
      >
        <MorseCodeConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
