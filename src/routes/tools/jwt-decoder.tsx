import { createFileRoute } from "@tanstack/react-router";
import { Key } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { JWTDecoder } from "@/components/tools/JWTDecoder";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/jwt-decoder")({
  head: () => ({
    meta: [
      { title: "JWT Decoder — Decode JSON Web Tokens | Flixo" },
      { name: "description", content: "Decode and inspect JWT tokens." },
      { property: "og:title", content: "JWT Decoder | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: JWTDecoderPage,
});

function JWTDecoderPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        icon={Key}
        name={t(toolNameKey("jwt-decoder"))}
        description="Decode and inspect JWT tokens."
        category={t(categoryNameKey("developer"))}
        slug="jwt-decoder"
      >
        <JWTDecoder />
      </ToolLayout>
    </SiteLayout>
  );
}
