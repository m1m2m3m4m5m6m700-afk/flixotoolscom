import { createFileRoute } from "@tanstack/react-router";
import { Code2 } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { HTMLMinifier } from "@/components/tools/HTMLMinifier";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/html-minifier")({
  head: () => ({
    meta: [
      { title: "HTML Minifier — Minify HTML Code Online | Flixo" },
      { name: "description", content: "Minify HTML code to reduce file size." },
      { property: "og:title", content: "HTML Minifier | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HTMLMinifierPage,
});

function HTMLMinifierPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        icon={Code2}
        name={t(toolNameKey("html-minifier"))}
        description="Minify HTML code to reduce file size."
        category={t(categoryNameKey("web"))}
        slug="html-minifier"
      >
        <HTMLMinifier />
      </ToolLayout>
    </SiteLayout>
  );
}
