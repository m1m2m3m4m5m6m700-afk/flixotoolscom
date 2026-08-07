import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ImageGrayscaleTool } from "@/components/tools/ImageGrayscaleTool";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/image-grayscale")({
  head: () => ({
    meta: [
      { title: "Image Grayscale — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Convert images to grayscale instantly. Free online image grayscale converter.",
      },
      { property: "og:title", content: "Image Grayscale | Flixo" },
    ],
  }),
  component: ImageGrayscalePage,
});

function ImageGrayscalePage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("image-grayscale"))}
        description="Convert images to grayscale."
        category={t(categoryNameKey("images"))}
        slug="image-grayscale"
      >
        <ImageGrayscaleTool />
      </ToolLayout>
    </SiteLayout>
  );
}
