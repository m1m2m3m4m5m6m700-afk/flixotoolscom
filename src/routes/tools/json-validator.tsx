import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { JSONValidator } from "@/components/tools/JSONValidator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/json-validator")({
  head: () => ({
    meta: [
      { title: "Json Validator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online json validator tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Json Validator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: JSONValidatorPage,
});

function JSONValidatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("json-validator"))}
        description="Free online json validator tool."
        category={t(categoryNameKey("utilities"))}
        slug="json-validator"
      >
        <JSONValidator />
      </ToolLayout>
    </SiteLayout>
  );
}
