import { Gauge, KeyRound, Layers, ShieldCheck } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { useI18n } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/locales/en";

const reasons = [
  { id: "speed", icon: Gauge },
  { id: "consistency", icon: Layers },
  { id: "privacy", icon: ShieldCheck },
  { id: "access", icon: KeyRound },
];

export function WhyFlixo() {
  const { t } = useI18n();

  return (
    <div className="border-y border-border/60 bg-surface/40">
      <Section id="why" eyebrow={t("why.eyebrow")} title={t("why.title")}>
        <div className="grid gap-4 md:grid-cols-2">
          {reasons.map(({ id, icon: Icon }) => (
            <div key={id} className="flex gap-4 rounded-2xl border border-border bg-card p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent-foreground">
                <Icon className="size-5" />
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-semibold">{t(`why.${id}.title` as TranslationKey)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`why.${id}.body` as TranslationKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
