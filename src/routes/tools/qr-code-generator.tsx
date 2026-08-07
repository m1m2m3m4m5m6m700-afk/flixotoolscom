import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { QrCodeGenerator } from "@/components/tools/QrCodeGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/qr-code-generator")({
  head: () => ({
    meta: [
      { title: "Qr Code Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online qr code generator tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Qr Code Generator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: QrCodeGeneratorPage,
});

function QrCodeGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("qr-code-generator"))}
        description="Free online qr code generator tool."
        category={t(categoryNameKey("utilities"))}
        slug="qr-code-generator"
      >
        <QrCodeGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
