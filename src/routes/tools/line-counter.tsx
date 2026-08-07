import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { LineCounter } from "@/components/tools/LineCounter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/line-counter")({
  head: () => ({
    meta: [
      { title: "Line Counter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online line counter tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Line Counter | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LineCounterPage,
});

function LineCounterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("line-counter"))}
        description="Free online line counter tool."
        category={t(categoryNameKey("utilities"))}
        slug="line-counter"
      >
        <LineCounter />
      </ToolLayout>
    </SiteLayout>
  );
}
