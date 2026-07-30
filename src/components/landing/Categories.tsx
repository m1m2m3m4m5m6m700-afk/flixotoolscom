import { Section } from "@/components/layout/Section";
import { useI18n } from "@/lib/i18n";
import { categories, categoryBlurbKey, categoryNameKey } from "@/lib/tools";

export function Categories() {
  const { t } = useI18n();

  return (
    <Section
      id="categories"
      eyebrow={t("categories.eyebrow")}
      title={t("categories.title")}
      description={t("categories.description")}
      className="pt-0"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div
            key={c.id}
            className="rounded-2xl border border-border bg-surface/60 p-6 transition-colors hover:border-primary/40 hover:bg-surface"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold">{t(categoryNameKey(c.id))}</h3>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                {t("categories.count", { count: c.count })}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t(categoryBlurbKey(c.id))}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
