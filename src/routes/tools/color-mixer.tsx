import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ColorMixer } from "@/components/tools/ColorMixer";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/color-mixer")({
  head: () => ({
    meta: [
      { title: "Color Mixer — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online color mixer tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: ColorMixerPage,
});

function ColorMixerPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("color-mixer"))}
        description="Free online color mixer tool."
        category={t(categoryNameKey("utilities"))}
        slug="color-mixer"
      >
        <ColorMixer />
      </ToolLayout>
    </SiteLayout>
  );
}
