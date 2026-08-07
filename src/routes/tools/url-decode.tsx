import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { URLDecodeTool } from "@/components/tools/URLDecodeTool";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/url-decode")({
  head: () => ({
    meta: [
      { title: "URL Decode — Free Online Tool | Flixo" },
      { name: "description", content: "Decode URL encoded strings. Free online URL decoder." },
      { property: "og:title", content: "URL Decode | Flixo" },
    ],
  }),
  component: URLDecodePage,
});

function URLDecodePage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("url-decode"))}
        description="Decode URL encoded strings."
        category={t(categoryNameKey("developer"))}
        slug="url-decode"
      >
        <URLDecodeTool />
      </ToolLayout>
    </SiteLayout>
  );
}
