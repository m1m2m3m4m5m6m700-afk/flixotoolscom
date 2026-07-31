import { createFileRoute } from "@tanstack/react-router";
import { QrCode } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { QrGenerator } from "@/components/tools/QrGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/tools";

export const Route = createFileRoute("/tools/qr-generator")({
  head: () => ({
    meta: [
      { title: "QR Code Generator — Free PNG & SVG Custom QR Codes | Flixo" },
      {
        name: "description",
        content:
          "Create custom QR codes for website URLs, Wi-Fi networks, text, email and phone numbers. High resolution PNG and SVG download.",
      },
      { property: "og:title", content: "QR Code Generator | Flixo" },
      {
        property: "og:description",
        content: "Generate and download custom QR codes in PNG and SVG vector formats.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QrGeneratorPage,
});

function QrGeneratorPage() {
  const { t } = useI18n();

  return (
    <SiteLayout>
      <ToolLayout
        icon={QrCode}
        name={t(toolNameKey("qr-generator"))}
        description="Generate high quality QR codes for URLs, Wi-Fi credentials, text and contact information."
        category={t(categoryNameKey("utilities"))}
      >
        <QrGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
