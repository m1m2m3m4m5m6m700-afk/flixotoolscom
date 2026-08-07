import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { TimeBetweenDates } from "@/components/tools/TimeBetweenDates";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/time-between-dates")({
  head: () => ({
    meta: [
      { title: "Time Between Dates — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online time between dates tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: TimeBetweenDatesPage,
});

function TimeBetweenDatesPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("time-between-dates"))}
        description="Free online time between dates tool."
        category={t(categoryNameKey("utilities"))}
        slug="time-between-dates"
      >
        <TimeBetweenDates />
      </ToolLayout>
    </SiteLayout>
  );
}
