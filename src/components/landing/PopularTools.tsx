import { Link } from "@tanstack/react-router";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { useI18n } from "@/lib/i18n";
import { toolNameKey, toolTaglineKey, tools } from "@/lib/tools";

/** Ranked view of the registry — presentation-only popularity metadata. */
const popularity: Record<string, { rank: number; runs: string; trend: string }> = {
  translator: { rank: 1, runs: "412k", trend: "+18%" },
  summarizer: { rank: 2, runs: "286k", trend: "+12%" },
  "image-studio": { rank: 3, runs: "204k", trend: "+31%" },
  transcribe: { rank: 4, runs: "158k", trend: "+9%" },
  "code-explain": { rank: 5, runs: "121k", trend: "+6%" },
};

export function PopularTools() {
  const { t } = useI18n();
  const ranked = tools
    .filter((tool) => popularity[tool.slug])
    .sort((a, b) => popularity[a.slug].rank - popularity[b.slug].rank);

  return (
    <Section
      id="popular"
      eyebrow={t("popular.eyebrow")}
      title={t("popular.title")}
      description={t("popular.description")}
      className="pt-0"
    >
      <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border bg-card/60 shadow-lift backdrop-blur-xl">
        {ranked.map((tool, i) => {
          const Icon = tool.icon;
          const meta = popularity[tool.slug];
          const row = (
            <div
              className={`group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 transition-colors hover:bg-surface/70 sm:px-6 ${
                i > 0 ? "border-t border-border/60" : ""
              }`}
            >
              <div className="flex shrink-0 items-center gap-3">
                <span className="w-5 text-center font-display text-sm font-bold text-muted-foreground/70">
                  {meta.rank}
                </span>
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
                  <Icon className="size-4.5" />
                </span>
              </div>

              <div className="min-w-0">
                <h3 className="flex items-center gap-1.5 truncate text-sm font-semibold sm:text-base">
                  {t(toolNameKey(tool.slug))}
                  {tool.status === "live" && (
                    <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
                  )}
                </h3>
                <p className="truncate text-xs text-muted-foreground sm:text-sm">
                  {t(toolTaglineKey(tool.slug))}
                </p>
              </div>

              <div className="shrink-0 text-end">
                <p className="text-xs font-medium text-muted-foreground">
                  {t("popular.runs", { count: meta.runs })}
                </p>
                <p className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-primary">
                  <TrendingUp className="size-3" />
                  <span dir="ltr">{meta.trend}</span>
                </p>
              </div>
            </div>
          );

          return tool.status === "live" && tool.href ? (
            <Link key={tool.slug} to={tool.href} className="block">
              {row}
            </Link>
          ) : (
            <div key={tool.slug} className="opacity-80">
              {row}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
