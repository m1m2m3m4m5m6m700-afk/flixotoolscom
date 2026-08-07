import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { URLParser } from "@/components/tools/URLParser";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/url-parser")({
  head: () => ({
    meta: [
      { title: "Url Parser — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online url parser tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Url Parser | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: URLParserPage,
});

function URLParserPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("url-parser"))}
        description="Free online url parser tool."
        category={t(categoryNameKey("utilities"))}
        slug="url-parser"
      >
        <URLParser />
      </ToolLayout>
    </SiteLayout>
  );
}
