import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { UUIDv4Generator } from "@/components/tools/UUIDv4Generator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/uuidv4-generator")({
  head: () => ({
    meta: [
      {
        title: "Uuidv4 Generator — Free Online Tool | Flixo",
      },
      {
        name: "description",
        content: "Free online uuidv4 generator tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: UUIDv4GeneratorPage,
});

function UUIDv4GeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("uuidv4-generator"))}
        description="Free online uuidv4 generator tool."
        category={t(categoryNameKey("utilities"))}
        slug="uuidv4-generator"
      >
        <UUIDv4Generator />
      </ToolLayout>
    </SiteLayout>
  );
}
