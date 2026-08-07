import { createFileRoute } from "@tanstack/react-router";
import { Type } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { WordCounter } from "@/components/tools/WordCounter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/word-counter")({
  head: () => ({
    meta: [
      { title: "Word Counter — Count Words, Characters & More | Flixo" },
      {
        name: "description",
        content: "Count words, characters, sentences, and paragraphs instantly.",
      },
      { property: "og:title", content: "Word Counter | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: WordCounterPage,
});

function WordCounterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        icon={Type}
        name={t(toolNameKey("word-counter"))}
        description="Count words, characters, sentences, paragraphs, and more."
        category={t(categoryNameKey("utilities"))}
        slug="word-counter"
      >
        <WordCounter />
      </ToolLayout>
    </SiteLayout>
  );
}
