import { Gauge, KeyRound, Layers, ShieldCheck } from "lucide-react";
import { Section } from "@/components/layout/Section";

const reasons = [
  {
    icon: Gauge,
    title: "Instant by default",
    body: "Tools open in under a second and run in the browser — no queues, no cold starts.",
  },
  {
    icon: Layers,
    title: "One consistent surface",
    body: "Every tool shares the same layout, shortcuts and result actions, so nothing needs relearning.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy-first",
    body: "Nothing is stored between sessions. Your input stays in the tab you typed it in.",
  },
  {
    icon: KeyRound,
    title: "No accounts, no keys",
    body: "Skip API keys, dashboards and seat management. Open a tool and start working.",
  },
];

export function WhyFlixo() {
  return (
    <div className="border-y border-border/60 bg-surface/40">
      <Section id="why" eyebrow="Why Flixo" title="Built to remove friction, not add features">
        <div className="grid gap-4 md:grid-cols-2">
          {reasons.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4 rounded-2xl border border-border bg-card p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent-foreground">
                <Icon className="size-5" />
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
