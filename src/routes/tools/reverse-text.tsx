import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ReverseTextTool } from "@/components/tools/ReverseText";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/reverse-text")({
  head: () => ({
    meta: [
      { title: "Reverse Text — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online text reverser. Reverse characters, words, or lines instantly.",
      },
      { property: "og:title", content: "Reverse Text | Flixo" },
      { property: "og:type", content: "website" },
      { property: "og:description", content: "Reverse characters, words, or lines in your text." },
    ],
  }),
  component: ReverseTextPage,
});

function ReverseTextPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("reverse-text"))}
        description="Reverse characters, words, or lines in your text."
        category={t(categoryNameKey("utilities"))}
        slug="reverse-text"
      >
        <ReverseTextTool />
      </ToolLayout>
    </SiteLayout>
  );
}
