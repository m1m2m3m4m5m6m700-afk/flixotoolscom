import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { Base64ImageEncoder } from "@/components/tools/Base64ImageEncoder";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/base64-image-encoder")({
  head: () => ({
    meta: [
      { title: "Base64 Image Encoder — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online base64 image encoder tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Base64 Image Encoder | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Base64ImageEncoderPage,
});

function Base64ImageEncoderPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("base64-image-encoder"))}
        description="Free online base64 image encoder tool."
        category={t(categoryNameKey("utilities"))}
        slug="base64-image-encoder"
      >
        <Base64ImageEncoder />
      </ToolLayout>
    </SiteLayout>
  );
}
