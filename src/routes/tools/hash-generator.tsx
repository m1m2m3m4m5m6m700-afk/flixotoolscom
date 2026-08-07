import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { HashGenerator } from "@/components/tools/HashGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/hash-generator")({
  head: () => ({
    meta: [
      { title: "Hash Generator — MD5, SHA-1, SHA-256, SHA-512 | Flixo" },
      { name: "description", content: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes." },
      { property: "og:title", content: "Hash Generator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HashGeneratorPage,
});

function HashGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        icon={Lock}
        name={t(toolNameKey("hash-generator"))}
        description="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes."
        category={t(categoryNameKey("developer"))}
        slug="hash-generator"
      >
        <HashGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
