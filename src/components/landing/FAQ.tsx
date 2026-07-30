import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "@/components/layout/Section";

const faqs = [
  {
    q: "Is Flixo free to use?",
    a: "Yes. Every tool currently available on Flixo is free and requires no account or credit card.",
  },
  {
    q: "How does the AI Translator work?",
    a: "You paste text, pick a source and target language (or let auto detect do it), and Flixo returns the translation. The current build uses a local demo engine so you can explore the full flow offline.",
  },
  {
    q: "Do you store what I type?",
    a: "No. Input and output live only in your browser tab and disappear when you close or clear the tool.",
  },
  {
    q: "Which languages are supported?",
    a: "Twenty languages across Latin, Cyrillic, Arabic, Hebrew, Indic and CJK scripts, plus automatic source detection.",
  },
  {
    q: "When are the other tools launching?",
    a: "Summarizer, Image Studio and Voice Transcriber are next. Each new tool plugs into the same registry and inherits the shared layout.",
  },
];

export function FAQ() {
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Questions, answered"
      description="Everything worth knowing before you open your first tool."
    >
      <div className="mx-auto max-w-2xl">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              className="rounded-2xl border border-border bg-card px-5"
            >
              <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
