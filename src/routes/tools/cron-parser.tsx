import { createFileRoute } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { CronParser } from "@/components/tools/CronParser";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/cron-parser")({
  head: () => ({
    meta: [
      { title: "Cron Parser — Explain Cron Expressions | Flixo" },
      { name: "description", content: "Parse cron expressions in plain English." },
      { property: "og:title", content: "Cron Parser | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CronParserPage,
});

function CronParserPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        icon={Clock}
        name={t(toolNameKey("cron-parser"))}
        description="Parse cron expressions in plain English."
        category={t(categoryNameKey("developer"))}
        slug="cron-parser"
      >
        <CronParser />
      </ToolLayout>
    </SiteLayout>
  );
}
