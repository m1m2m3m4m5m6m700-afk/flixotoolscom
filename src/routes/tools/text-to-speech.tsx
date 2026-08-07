import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { TextToSpeech } from "@/components/tools/TextToSpeech";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/text-to-speech")({
  head: () => ({
    meta: [
      { title: "Text To Speech — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online text to speech tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Text To Speech | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TextToSpeechPage,
});

function TextToSpeechPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("text-to-speech"))}
        description="Free online text to speech tool."
        category={t(categoryNameKey("utilities"))}
        slug="text-to-speech"
      >
        <TextToSpeech />
      </ToolLayout>
    </SiteLayout>
  );
}
