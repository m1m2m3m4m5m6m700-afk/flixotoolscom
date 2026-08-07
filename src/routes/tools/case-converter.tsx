import { createFileRoute } from "@tanstack/react-router";
import { Type } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { TextCaseConverter } from "@/components/tools/TextCaseConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/case-converter")({
  head: () => ({
    meta: [
      { title: "Case Converter — Transform Text Case Online | Flixo" },
      {
        name: "description",
        content:
          "Convert text between lowercase, UPPERCASE, Title Case, camelCase, snake_case, kebab-case, and more. Free online case converter tool.",
      },
      { property: "og:title", content: "Case Converter | Flixo" },
      {
        property: "og:description",
        content: "Transform text between different case formats instantly.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CaseConverterPage,
});

function CaseConverterPage() {
  const { t } = useI18n();

  return (
    <SiteLayout>
      <ToolLayout
        icon={Type}
        name={t(toolNameKey("case-converter"))}
        description="Transform text between different case formats: lowercase, UPPERCASE, Title Case, camelCase, snake_case, and more."
        category={t(categoryNameKey("utilities"))}
        slug="case-converter"
      >
        <TextCaseConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
