import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { BinaryConverter } from "@/components/tools/BinaryConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/binary-converter")({
  head: () => ({
    meta: [
      { title: "Binary Converter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online binary converter tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Binary Converter | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BinaryConverterPage,
});

function BinaryConverterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("binary-converter"))}
        description="Free online binary converter tool."
        category={t(categoryNameKey("utilities"))}
        slug="binary-converter"
      >
        <BinaryConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
