import { Link } from "@tanstack/react-router";
import { ArrowRight, Lightbulb, Loader as Loader2, Sparkles, Wand as Wand2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/locales/en";
import { classifyIntent, categoryNameKey, toolNameKey, type ClassifyResult } from "@/lib/tools";

const SUGGESTION_KEY: Record<ClassifyResult["category"], TranslationKey> = {
  translation: "assistant.suggestion.translation",
  images: "assistant.suggestion.images",
  pdf: "assistant.suggestion.pdf",
  writing: "assistant.suggestion.writing",
  utilities: "assistant.suggestion.utilities",
  unknown: "assistant.suggestion.unknown",
};

interface AssistantProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onRequestTool: () => void;
}

export function Assistant({ prompt, onPromptChange, onRequestTool }: AssistantProps) {
  const { t } = useI18n();
  const [result, setResult] = useState<ClassifyResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFind = () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(classifyIntent(prompt));
      setLoading(false);
    }, 600);
  };

  const handleReset = () => {
    setResult(null);
    onPromptChange("");
  };

  const suggestionKey = result ? SUGGESTION_KEY[result.category] : null;
  const Icon = result?.tool?.icon;

  return (
    <div className="mx-auto mt-10 max-w-2xl animate-rise" style={{ animationDelay: "320ms" }}>
      <div className="rounded-3xl border border-border bg-card/80 p-2 shadow-lift backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Wand2 className="size-5" />
          </span>
          <label htmlFor="assistant-input" className="sr-only">
            {t("assistant.placeholder")}
          </label>
          <input
            id="assistant-input"
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleFind()}
            placeholder={t("assistant.placeholder")}
            className="min-w-0 flex-1 bg-transparent px-2 py-3 text-base outline-none placeholder:text-muted-foreground"
          />
          <Button
            onClick={handleFind}
            disabled={loading || !prompt.trim()}
            className="shrink-0 rounded-2xl"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {t("assistant.thinking")}
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                {t("assistant.button")}
              </>
            )}
          </Button>
        </div>
      </div>

      {result && suggestionKey && (
        <div className="mt-4 animate-rise rounded-2xl border border-border bg-surface/60 p-5">
          <div className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent-foreground">
              <Lightbulb className="size-4.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-relaxed text-foreground">{t(suggestionKey)}</p>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full border border-border px-2.5 py-1 text-muted-foreground">
                  {t("assistant.result.category")}: {result.tool ? t(categoryNameKey(result.tool.categoryId)) : "—"}
                </span>
                {result.matchedKeywords.length > 0 && (
                  <span className="rounded-full border border-border px-2.5 py-1 text-muted-foreground">
                    {t("assistant.result.matched")}: {result.matchedKeywords.slice(0, 3).join(", ")}
                  </span>
                )}
              </div>

              {result.tool && (
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {result.tool.status === "live" && result.tool.href ? (
                    <Button asChild size="sm" className="rounded-xl">
                      <Link to={result.tool.href}>
                        {Icon && <Icon className="size-4" />}
                        {t(toolNameKey(result.tool.slug))}
                        <ArrowRight className="size-4 rtl:-scale-x-100" />
                      </Link>
                    </Button>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground">
                      {Icon && <Icon className="size-4" />}
                      {t(toolNameKey(result.tool.slug))} · {t("assistant.result.soon")}
                    </span>
                  )}
                  <Button variant="ghost" size="sm" className="rounded-xl" onClick={onRequestTool}>
                    {t("request.trigger")}
                  </Button>
                </div>
              )}

              {!result.tool && (
                <Button variant="outline" size="sm" className="mt-4 rounded-xl" onClick={onRequestTool}>
                  {t("request.trigger")}
                </Button>
              )}
            </div>
          </div>

          <button
            onClick={handleReset}
            className="mt-4 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("assistant.reset")}
          </button>
        </div>
      )}

      {!result && !loading && (
        <div className="mt-4 rounded-2xl border border-dashed border-border bg-surface/40 p-8 text-center">
          <Sparkles className="mx-auto size-5 text-muted-foreground/60" />
          <p className="mt-2 text-sm font-medium text-muted-foreground">{t("assistant.empty.title")}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground/80">{t("assistant.empty.body")}</p>
        </div>
      )}
    </div>
  );
}
