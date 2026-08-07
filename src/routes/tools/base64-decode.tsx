import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { Base64DecodeTool } from "@/components/tools/Base64DecodeTool";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/base64-decode")({
  head: () => ({
    meta: [
      { title: "Base64 Decode — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Decode Base64 encoded strings to plain text. Free online decoder.",
      },
      { property: "og:title", content: "Base64 Decode | Flixo" },
    ],
  }),
  component: Base64DecodePage,
});

function Base64DecodePage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("base64-decode"))}
        description="Decode Base64 encoded strings to plain text."
        category={t(categoryNameKey("developer"))}
        slug="base64-decode"
      >
        <Base64DecodeTool />
      </ToolLayout>
    </SiteLayout>
  );
}
