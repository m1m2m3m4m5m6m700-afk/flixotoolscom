import { Section } from "@/components/layout/Section";
import { sortedCategories } from "@/data/categories";
import { toolsByCategory } from "@/data/tools";

/** Category cards — rendered entirely from src/data/categories.ts. */
export function CategoryGrid() {
  return (
    <Section
      id="categories"
      eyebrow="Categories"
      title="Every tool has a home"
      description="Fourteen hubs cover the work people actually bring to Flixo. Jump straight to a hub or scroll the full directory below."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedCategories.map((category) => {
          const Icon = category.icon;
          const catTools = toolsByCategory(category.id);
          const ready = catTools.filter((tool) => tool.status === "ready").length;

          return (
            <a
              key={category.id}
              href={`#cat-${category.anchor}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card/70 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <span
                  className={
                    ready > 0
                      ? "rounded-full bg-primary/12 px-2.5 py-1 text-[11px] font-medium text-primary"
                      : "rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                  }
                >
                  {ready > 0 ? `${ready} live` : "Coming soon"}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-semibold">{category.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {category.description}
              </p>
              <p className="mt-auto pt-5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground/60">
                {catTools.length} tools
              </p>
            </a>
          );
        })}
      </div>
    </Section>
  );
}
