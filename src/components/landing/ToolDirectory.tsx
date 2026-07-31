import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sortedCategories } from "@/data/categories";
import { toolRoute, toolsByCategory, type Tool, type ToolStatus } from "@/data/tools";

const STATUS_LABEL: Record<ToolStatus, string> = {
  ready: "Ready",
  planned: "Planned",
  placeholder: "Idea",
};

const STATUS_CLASS: Record<ToolStatus, string> = {
  ready: "bg-primary/12 text-primary",
  planned: "bg-accent/15 text-accent-foreground",
  placeholder: "bg-muted text-muted-foreground",
};

function ToolCard({ tool, onRequestTool }: { tool: Tool; onRequestTool: () => void }) {
  const route = tool.status === "ready" ? toolRoute(tool) : undefined;

  const body = (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card/60 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift">
      <div className="flex items-start justify-between gap-3">
        <h4 className="min-w-0 text-sm font-semibold">{tool.name}</h4>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_CLASS[tool.status]}`}
        >
          {STATUS_LABEL[tool.status]}
        </span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{tool.description}</p>
      {route && (
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary">
          Open tool
          <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
        </span>
      )}
    </div>
  );

  if (route) {
    return (
      <Link to={route} className="block h-full">
        {body}
      </Link>
    );
  }

  return (
    <button onClick={onRequestTool} className="block h-full w-full text-start">
      {body}
    </button>
  );
}

/** Full tools directory — one section per category, all data-driven. */
export function ToolDirectory({ onRequestTool }: { onRequestTool: () => void }) {
  return (
    <section id="tools" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 md:py-28">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <span className="inline-flex rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Directory
        </span>
        <h2 className="mt-4 text-3xl font-bold text-balance md:text-4xl">All Flixo tools</h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Everything on the roadmap, grouped by hub. Ready tools open instantly; anything else can
          be nudged up the queue with a request.
        </p>
      </div>

      <div className="space-y-14">
        {sortedCategories.map((category) => {
          const Icon = category.icon;
          const catTools = toolsByCategory(category.id);
          if (catTools.length === 0) return null;

          return (
            <div key={category.id} id={`cat-${category.anchor}`} className="scroll-mt-24">
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-semibold">{category.name}</h3>
                  <p className="truncate text-xs text-muted-foreground">{category.description}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {catTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} onRequestTool={onRequestTool} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 rounded-3xl border border-border bg-card/60 p-8 text-center backdrop-blur">
        <h3 className="text-xl font-semibold">Missing something?</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Tell us the tool you wish existed — requests shape what we ship next.
        </p>
        <Button className="mt-5 rounded-xl" onClick={onRequestTool}>
          Request a tool
        </Button>
      </div>
    </section>
  );
}
