import { createFileRoute } from "@tanstack/react-router";
import { Hash } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { UUIDGenerator } from "@/components/tools/UUIDGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/uuid-generator")({
  head: () => ({
    meta: [
      { title: "UUID Generator — Generate Unique IDs Online | Flixo" },
      { name: "description", content: "Generate cryptographically secure UUIDs (v4 and v7)." },
      { property: "og:title", content: "UUID Generator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: UUIDGeneratorPage,
});

function UUIDGeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        icon={Hash}
        name={t(toolNameKey("uuid-generator"))}
        description="Generate cryptographically secure UUIDs (v4 and v7)."
        category={t(categoryNameKey("utilities"))}
        slug="uuid-generator"
      >
        <UUIDGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
