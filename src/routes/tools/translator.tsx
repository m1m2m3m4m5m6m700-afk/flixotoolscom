import { createFileRoute } from "@tanstack/react-router";
import { Languages } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { Translator } from "@/components/tools/Translator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/tools";

export const Route = createFileRoute("/tools/translator")({
  head: () => ({
    meta: [
      { title: "AI Translator — Instant Translation in 20+ Languages | Flixo" },
      {
        name: "description",
        content:
          "Translate text between 20+ languages with auto detect, one-click swap and copy. Free, no sign-up, right in your browser.",
      },
      { property: "og:title", content: "AI Translator | Flixo" },
      {
        property: "og:description",
        content:
          "Auto-detect the source language and translate instantly between 20+ languages. Free and account-free.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TranslatorPage,
});

function TranslatorPage() {
  const { t } = useI18n();

  return (
    <SiteLayout>
      <ToolLayout
        icon={Languages}
        name={t(toolNameKey("translator"))}
        description={t("translator.pageDescription")}
        category={t(categoryNameKey("translation"))}
      >
        <Translator />
      </ToolLayout>
    </SiteLayout>
  );
}
