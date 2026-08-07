import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { BarcodeGenerator } from "@/components/tools/BarcodeGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/barcode-generator")({
  head: () => ({
    meta: [
      { title: "Barcode Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online barcode generator tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Barcode Generator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BarcodeGeneratorPage,
});

function BarcodeGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("barcode-generator"))}
        description="Free online barcode generator tool."
        category={t(categoryNameKey("utilities"))}
        slug="barcode-generator"
      >
        <BarcodeGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
