import { Section } from "@/components/layout/Section";
import { categories } from "@/lib/tools";

export function Categories() {
  return (
    <Section
      id="categories"
      eyebrow="Categories"
      title="Organised the way work actually happens"
      description="Browse by the outcome you need rather than by model names or provider logos."
      className="pt-0"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div
            key={c.name}
            className="rounded-2xl border border-border bg-surface/60 p-6 transition-colors hover:border-primary/40 hover:bg-surface"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold">{c.name}</h3>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                {c.count} tools
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.blurb}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
