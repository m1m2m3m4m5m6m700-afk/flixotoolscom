import { createFileRoute } from "@tanstack/react-router";
import { Link } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { URLEncoder } from "@/components/tools/URLEncoder";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/url-encoder")({
  head: () => ({
    meta: [
      { title: "URL Encoder/Decoder — Encode & Decode URLs | Flixo" },
      { name: "description", content: "Encode or decode URL strings safely." },
      { property: "og:title", content: "URL Encoder/Decoder | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: URLEncoderPage,
});

function URLEncoderPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        icon={Link}
        name={t(toolNameKey("url-encoder"))}
        description="Encode or decode URL strings safely."
        category={t(categoryNameKey("utilities"))}
        slug="url-encoder"
      >
        <URLEncoder />
      </ToolLayout>
    </SiteLayout>
  );
}
