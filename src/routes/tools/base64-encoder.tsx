import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { Base64Encoder } from "@/components/tools/Base64Encoder";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/base64-encoder")({
  head: () => ({
    meta: [
      { title: "Base64 Encoder/Decoder — Encode & Decode Base64 | Flixo" },
      { name: "description", content: "Encode text to Base64 or decode Base64 strings." },
      { property: "og:title", content: "Base64 Encoder/Decoder | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Base64EncoderPage,
});

function Base64EncoderPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        icon={Lock}
        name={t(toolNameKey("base64-encoder"))}
        description="Encode text to Base64 or decode Base64 strings."
        category={t(categoryNameKey("utilities"))}
        slug="base64-encoder"
      >
        <Base64Encoder />
      </ToolLayout>
    </SiteLayout>
  );
}
