import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ImageBrightnessContrastTool } from "@/components/tools/ImageBrightnessContrastTool";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/image-brightness-contrast")({
  head: () => ({
    meta: [
      { title: "Image Brightness & Contrast — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Adjust image brightness and contrast. Free online image editor.",
      },
      { property: "og:title", content: "Image Brightness & Contrast | Flixo" },
    ],
  }),
  component: ImageBrightnessContrastPage,
});

function ImageBrightnessContrastPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("image-brightness-contrast"))}
        description="Adjust image brightness and contrast."
        category={t(categoryNameKey("images"))}
        slug="image-brightness-contrast"
      >
        <ImageBrightnessContrastTool />
      </ToolLayout>
    </SiteLayout>
  );
}
