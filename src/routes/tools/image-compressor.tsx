import { createFileRoute } from "@tanstack/react-router";
import { FileImage } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ImageCompressor } from "@/components/tools/ImageCompressor";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/tools";

export const Route = createFileRoute("/tools/image-compressor")({
  head: () => ({
    meta: [
      { title: "Image Compressor — Shrink File Size Online | Flixo" },
      {
        name: "description",
        content:
          "Compress JPEG, PNG, and WebP images directly in your browser. Reduce file size up to 90% with instant side-by-side quality preview.",
      },
      { property: "og:title", content: "Image Compressor | Flixo" },
      {
        property: "og:description",
        content:
          "High quality image compression in your browser. Instant preview and format conversion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ImageCompressorPage,
});

function ImageCompressorPage() {
  const { t } = useI18n();

  return (
    <SiteLayout>
      <ToolLayout
        icon={FileImage}
        name={t(toolNameKey("image-compressor"))}
        description="Shrink image file size in your browser with real-time compression ratio preview."
        category={t(categoryNameKey("images"))}
      >
        <ImageCompressor />
      </ToolLayout>
    </SiteLayout>
  );
}
