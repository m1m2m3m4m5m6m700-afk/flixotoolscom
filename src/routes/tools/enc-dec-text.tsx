import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { EncDecText } from "@/components/tools/EncDecText";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/enc-dec-text")({
  head: () => ({
    meta: [
      { title: "Enc Dec Text — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online enc dec text tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: EncDecTextPage,
});

function EncDecTextPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("enc-dec-text"))}
        description="Free online enc dec text tool."
        category={t(categoryNameKey("utilities"))}
        slug="enc-dec-text"
      >
        <EncDecText />
      </ToolLayout>
    </SiteLayout>
  );
}
