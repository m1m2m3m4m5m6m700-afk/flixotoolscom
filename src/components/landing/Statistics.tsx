import { useI18n } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/locales/en";

const stats: { value: string; key: TranslationKey }[] = [
  { value: "1.2M+", key: "stats.tasks" },
  { value: "20+", key: "stats.languages" },
  { value: "0.8s", key: "stats.latency" },
  { value: "99.9%", key: "stats.uptime" },
];

export function Statistics() {
  const { t } = useI18n();

  return (
    <section id="stats" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 md:py-24">
      <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.key} className="bg-card px-6 py-10 text-center">
            <p className="font-display text-4xl font-bold text-gradient-brand" dir="ltr">
              {s.value}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{t(s.key)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
