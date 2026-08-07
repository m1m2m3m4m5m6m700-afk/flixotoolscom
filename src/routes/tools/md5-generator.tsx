import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { MD5Generator } from "@/components/tools/MD5Generator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/md5-generator")({
  head: () => ({
    meta: [
      { title: "Md5 Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online md5 generator tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Md5 Generator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: MD5GeneratorPage,
});

function MD5GeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("md5-generator"))}
        description="Free online md5 generator tool."
        category={t(categoryNameKey("utilities"))}
        slug="md5-generator"
      >
        <MD5Generator />
      </ToolLayout>
    </SiteLayout>
  );
}
