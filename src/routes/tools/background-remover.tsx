import { createFileRoute } from "@tanstack/react-router";
import { Image as ImageIcon } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { BackgroundRemover } from "@/components/tools/BackgroundRemover";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/tools";

export const Route = createFileRoute("/tools/background-remover")({
  head: () => ({
    meta: [
      { title: "Background Remover — Transparent PNG Cutouts | Flixo" },
      {
        name: "description",
        content:
          "Remove background from images instantly in your browser. Export high quality transparent PNGs. Free & private.",
      },
      { property: "og:title", content: "Background Remover | Flixo" },
      {
        property: "og:description",
        content:
          "Cut out backgrounds and export transparent PNGs with custom edge refine controls.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BackgroundRemoverPage,
});

function BackgroundRemoverPage() {
  const { t } = useI18n();

  return (
    <SiteLayout>
      <ToolLayout
        icon={ImageIcon}
        name={t(toolNameKey("background-remover"))}
        description="Cut out image backgrounds automatically with edge refine controls and export transparent PNGs."
        category={t(categoryNameKey("images"))}
      >
        <BackgroundRemover />
      </ToolLayout>
    </SiteLayout>
  );
}
