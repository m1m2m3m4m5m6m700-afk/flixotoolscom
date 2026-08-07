import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { UUIDv7Generator } from "@/components/tools/UUIDv7Generator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/uuidv7-generator")({
  head: () => ({
    meta: [
      { title: "Uuidv7 Generator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online uuidv7 generator tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: UUIDv7GeneratorPage,
});

function UUIDv7GeneratorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("uuidv7-generator"))}
        description="Free online uuidv7 generator tool."
        category={t(categoryNameKey("utilities"))}
        slug="uuidv7-generator"
      >
        <UUIDv7Generator />
      </ToolLayout>
    </SiteLayout>
  );
}
