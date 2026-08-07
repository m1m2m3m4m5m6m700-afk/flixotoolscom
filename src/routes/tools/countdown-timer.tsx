import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { CountdownTimer } from "@/components/tools/CountdownTimer";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/countdown-timer")({
  head: () => ({
    meta: [
      { title: "Countdown Timer — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online countdown timer tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: CountdownTimerPage,
});

function CountdownTimerPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("countdown-timer"))}
        description="Free online countdown timer tool."
        category={t(categoryNameKey("utilities"))}
        slug="countdown-timer"
      >
        <CountdownTimer />
      </ToolLayout>
    </SiteLayout>
  );
}
