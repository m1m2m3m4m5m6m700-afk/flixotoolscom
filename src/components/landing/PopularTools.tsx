import { Link } from "@tanstack/react-router";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { tools } from "@/lib/tools";

/** Ranked view of the registry — presentation-only popularity metadata. */
const popularity: Record<string, { rank: number; uses: string; trend: string }> = {
  translator: { rank: 1, uses: "412k runs", trend: "+18%" },
  summarizer: { rank: 2, uses: "286k runs", trend: "+12%" },
  "image-studio": { rank: 3, uses: "204k runs", trend: "+31%" },
  transcribe: { rank: 4, uses: "158k runs", trend: "+9%" },
  "code-explain": { rank: 5, uses: "121k runs", trend: "+6%" },
};

export function PopularTools() {
  const ranked = tools
    .filter((t) => popularity[t.slug])
    .sort((a, b) => popularity[a.slug].rank - popularity[b.slug].rank);

  return (
    <Section
      id="popular"
      eyebrow="Popular"
      title="What people reach for most"
      description="The tools our community opens day after day, ranked by usage this month."
      className="pt-0"
    >
      <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border bg-card/60 backdrop-blur-xl shadow-lift">
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
                  {tool.name}
                  {tool.status === "live" && (
                    <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </h3>
                <p className="truncate text-xs text-muted-foreground sm:text-sm">{tool.tagline}</p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-xs font-medium text-muted-foreground">{meta.uses}</p>
                <p className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-primary">
                  <TrendingUp className="size-3" />
                  {meta.trend}
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
