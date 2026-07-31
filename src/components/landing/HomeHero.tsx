import { Sparkles } from "lucide-react";
import { PromptBox } from "@/components/landing/PromptBox";
import { readyTools, tools } from "@/data/tools";
import { categories } from "@/data/categories";

interface HomeHeroProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onRequestTool: () => void;
}

export function HomeHero({ prompt, onPromptChange, onRequestTool }: HomeHeroProps) {
  const stats = [
    { label: "Categories", value: categories.length },
    { label: "Tools mapped", value: tools.length },
    { label: "Live now", value: readyTools().length },
  ];

  return (
    <section className="relative overflow-hidden bg-hero-glow">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 size-[420px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl animate-float" />

      <div className="relative mx-auto max-w-3xl px-5 pb-20 pt-20 text-center md:pb-28 md:pt-32">
        <span className="inline-flex animate-rise items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
          <Sparkles className="size-3.5 text-primary" />
          One workspace for every AI tool
        </span>

        <h1
          className="mt-6 animate-rise bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text font-display text-5xl font-bold leading-[1.02] tracking-tight text-transparent md:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          Flixo
        </h1>

        <p
          className="mx-auto mt-5 max-w-xl animate-rise text-base leading-relaxed text-muted-foreground md:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          A growing directory of fast, private AI tools — translation, images, PDF, writing, audio,
          video and more. Describe your task and Flixo points you to the right one.
        </p>

        <PromptBox value={prompt} onChange={onPromptChange} onRequestTool={onRequestTool} />

        <dl
          className="mx-auto mt-10 grid max-w-md animate-rise grid-cols-3 gap-3"
          style={{ animationDelay: "440ms" }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-card/60 px-3 py-4 backdrop-blur"
            >
              <dt className="text-xs text-muted-foreground">{s.label}</dt>
              <dd className="mt-1 font-display text-2xl font-bold">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
