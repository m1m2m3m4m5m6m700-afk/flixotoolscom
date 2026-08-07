import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { JSONPathTester } from "@/components/tools/JSONPathTester";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/json-path-tester")({
  head: () => ({
    meta: [
      { title: "Json Path Tester — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online json path tester tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: JSONPathTesterPage,
});

function JSONPathTesterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("json-path-tester"))}
        description="Free online json path tester tool."
        category={t(categoryNameKey("utilities"))}
        slug="json-path-tester"
      >
        <JSONPathTester />
      </ToolLayout>
    </SiteLayout>
  );
}
