import { createFileRoute } from "@tanstack/react-router";
import { Terminal } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { RegexTester } from "@/components/tools/RegexTester";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/regex-tester")({
  head: () => ({
    meta: [
      { title: "Regex Tester — Test Regular Expressions Online | Flixo" },
      { name: "description", content: "Test regular expressions with real-time matching." },
      { property: "og:title", content: "Regex Tester | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: RegexTesterPage,
});

function RegexTesterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        icon={Terminal}
        name={t(toolNameKey("regex-tester"))}
        description="Test regular expressions with real-time matching."
        category={t(categoryNameKey("developer"))}
        slug="regex-tester"
      >
        <RegexTester />
      </ToolLayout>
    </SiteLayout>
  );
}
