import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { TipSplitter } from "@/components/tools/TipSplitter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/tip-splitter")({
  head: () => ({
    meta: [
      { title: "Tip Splitter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online tip splitter tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: TipSplitterPage,
});

function TipSplitterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("tip-splitter"))}
        description="Free online tip splitter tool."
        category={t(categoryNameKey("utilities"))}
        slug="tip-splitter"
      >
        <TipSplitter />
      </ToolLayout>
    </SiteLayout>
  );
}
