import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { Stopwatch } from "@/components/tools/Stopwatch";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/stopwatch")({
  head: () => ({
    meta: [
      { title: "Stopwatch — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online stopwatch tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: StopwatchPage,
});

function StopwatchPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("stopwatch"))}
        description="Free online stopwatch tool."
        category={t(categoryNameKey("utilities"))}
        slug="stopwatch"
      >
        <Stopwatch />
      </ToolLayout>
    </SiteLayout>
  );
}
