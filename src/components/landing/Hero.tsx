import { Link } from "@tanstack/react-router";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export function Hero({ query, onQueryChange }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-hero-glow">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 size-[420px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl animate-float" />

      <div className="relative mx-auto max-w-3xl px-5 pb-20 pt-24 text-center md:pb-28 md:pt-32">
        <span className="inline-flex animate-rise items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
          <Sparkles className="size-3.5 text-primary" />
          One workspace, every AI tool
        </span>

        <h1
          className="mt-6 animate-rise text-4xl font-bold leading-[1.05] text-balance md:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          The AI toolkit that feels like <span className="text-gradient-brand">one product</span>
        </h1>

        <p
          className="mx-auto mt-5 max-w-xl animate-rise text-base leading-relaxed text-muted-foreground md:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          Flixo brings translation, writing, vision and audio tools under a single calm interface —
          no tab juggling, no setup, no accounts.
        </p>

        <div
          className="mx-auto mt-9 flex max-w-xl animate-rise items-center gap-2 rounded-2xl border border-border bg-card/80 p-2 shadow-soft backdrop-blur"
          style={{ animationDelay: "240ms" }}
        >
          <Search className="ml-2 size-4 shrink-0 text-muted-foreground" />
          <label htmlFor="tool-search" className="sr-only">
            Search Flixo tools
          </label>
          <input
            id="tool-search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search tools — translate, summarize, transcribe…"
            className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
          />
          <Button asChild size="sm" className="shrink-0 rounded-xl">
            <a href="#tools">Browse</a>
          </Button>
        </div>

        <div
          className="mt-8 flex animate-rise flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "320ms" }}
        >
          <Button asChild size="lg" className="w-full rounded-xl shadow-lift sm:w-auto">
            <Link to="/tools/translator">
              Try the AI Translator
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground">Free · No sign-up required</p>
        </div>
      </div>
    </section>
  );
}
