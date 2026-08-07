import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { DuplicateLinesRemover } from "@/components/tools/DuplicateLinesRemover";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/duplicate-lines-remover")({
  head: () => ({
    meta: [
      { title: "Duplicate Lines Remover — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online duplicate lines remover tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: DuplicateLinesRemoverPage,
});

function DuplicateLinesRemoverPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("duplicate-lines-remover"))}
        description="Free online duplicate lines remover tool."
        category={t(categoryNameKey("utilities"))}
        slug="duplicate-lines-remover"
      >
        <DuplicateLinesRemover />
      </ToolLayout>
    </SiteLayout>
  );
}
