import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ImageEnhancer } from "@/components/tools/ImageEnhancer";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/tools";

export const Route = createFileRoute("/tools/image-enhancer")({
  head: () => ({
    meta: [
      { title: "AI Image Enhancer — Free Online Upscale, Restore & Sharpen Photos | Flixo" },
      {
        name: "description",
        content:
          "Upscale images up to 8x resolution, restore old photos, sharpen blurry details, and fix facial lighting online. Free & private.",
      },
      { property: "og:title", content: "AI Image Enhancer | Flixo" },
      {
        property: "og:description",
        content:
          "Upscale photos up to 8x resolution, remove noise, sharpen details, and fix facial tones.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ImageEnhancerPage,
});

function ImageEnhancerPage() {
  const { t } = useI18n();

  return (
    <SiteLayout>
      <ToolLayout
        icon={Sparkles}
        name={t(toolNameKey("image-enhancer"))}
        description="Upscale resolution up to 8x, restore faces, remove noise and sharpen photos online."
        category={t(categoryNameKey("images"))}
        slug="image-enhancer"
      >
        <ImageEnhancer />
      </ToolLayout>
    </SiteLayout>
  );
}
