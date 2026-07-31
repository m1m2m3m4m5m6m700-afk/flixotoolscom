import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey, toolTaglineKey, tools } from "@/lib/tools";

export function FeaturedTools() {
  const { t } = useI18n();

  return (
    <Section
      id="tools"
      eyebrow={t("featured.eyebrow")}
      title={t("featured.title")}
      description={t("featured.description")}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
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
                  {tool.status === "live" ? t("status.live") : t("status.soon")}
                </span>
              </div>
              <h3 className="mt-5 flex items-center gap-1.5 text-lg font-semibold">
                {t(toolNameKey(tool.slug))}
                {tool.status === "live" && (
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
                )}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(toolTaglineKey(tool.slug))}
              </p>
              <p className="mt-5 text-xs uppercase tracking-[0.14em] text-muted-foreground/70">
                {t(categoryNameKey(tool.categoryId))}
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
    </Section>
  );
}
