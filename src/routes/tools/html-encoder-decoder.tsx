import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { HTMLEncoderDecoder } from "@/components/tools/HTMLEncoderDecoder";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/html-encoder-decoder")({
  head: () => ({
    meta: [
      { title: "Html Encoder Decoder — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online html encoder decoder tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Html Encoder Decoder | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HTMLEncoderDecoderPage,
});

function HTMLEncoderDecoderPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("html-encoder-decoder"))}
        description="Free online html encoder decoder tool."
        category={t(categoryNameKey("utilities"))}
        slug="html-encoder-decoder"
      >
        <HTMLEncoderDecoder />
      </ToolLayout>
    </SiteLayout>
  );
}
