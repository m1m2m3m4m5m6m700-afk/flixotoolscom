import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "@/components/layout/Section";
import { useI18n } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/locales/en";

const faqIds = ["1", "2", "3", "4", "5"];

export function FAQ() {
  const { t } = useI18n();

  return (
    <Section
      id="faq"
      eyebrow={t("faq.eyebrow")}
      title={t("faq.title")}
      description={t("faq.description")}
    >
      <div className="mx-auto max-w-2xl">
        <Accordion type="single" collapsible className="space-y-3">
          {faqIds.map((id) => (
            <AccordionItem
              key={id}
              value={`item-${id}`}
              className="rounded-2xl border border-border bg-card px-5"
            >
              <AccordionTrigger className="text-start text-base font-medium hover:no-underline">
                {t(`faq.q${id}` as TranslationKey)}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {t(`faq.a${id}` as TranslationKey)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
