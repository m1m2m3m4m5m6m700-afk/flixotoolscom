import { Link } from "@tanstack/react-router";
import { ArrowUpRight, SearchX } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { tools } from "@/lib/tools";

export function FeaturedTools({ query }: { query: string }) {
  const q = query.trim().toLowerCase();
  const visible = q
    ? tools.filter((t) =>
        [t.name, t.tagline, t.category].some((f) => f.toLowerCase().includes(q)),
      )
    : tools;

  return (
    <Section
      id="tools"
      eyebrow="Featured tools"
      title="Purpose-built tools, not a chat box"
      description="Each tool is designed around one job and shares the same shortcuts, layout and keyboard flow."
    >
      {visible.length === 0 ? (
        <div className="mx-auto max-w-md rounded-2xl border border-dashed border-border bg-surface/50 p-10 text-center">
          <SearchX className="mx-auto size-6 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            No tools match “{query}”. Try “translate” or “summarize”.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((tool) => {
            const Icon = tool.icon;
            const card = (
              <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <span
                    className={
                      tool.status === "live"
                        ? "rounded-full bg-primary/12 px-2.5 py-1 text-[11px] font-medium text-primary"
                        : "rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                    }
                  >
                    {tool.status === "live" ? "Live" : "Soon"}
                  </span>
                </div>
                <h3 className="mt-5 flex items-center gap-1.5 text-lg font-semibold">
                  {tool.name}
                  {tool.status === "live" && (
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tool.tagline}</p>
                <p className="mt-5 text-xs uppercase tracking-[0.14em] text-muted-foreground/70">
                  {tool.category}
                </p>
              </div>
            );

            return tool.status === "live" && tool.href ? (
              <Link key={tool.slug} to={tool.href} className="block">
                {card}
              </Link>
            ) : (
              <div key={tool.slug} className="cursor-default opacity-80">
                {card}
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
}
