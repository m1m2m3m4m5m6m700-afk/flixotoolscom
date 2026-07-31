import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Assistant } from "@/components/landing/Assistant";
import { readyTools, tools } from "@/data/tools";
import { categories, type CategoryId } from "@/data/categories";

interface HomeHeroProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onRequestTool: (prefillPrompt?: string) => void;
  onSelectCategory?: (categoryId: CategoryId) => void;
}

export function HomeHero({
  prompt,
  onPromptChange,
  onRequestTool,
  onSelectCategory,
}: HomeHeroProps) {
  const stats = [
    { label: "Categories", value: categories.length },
    { label: "Tools mapped", value: tools.length },
    { label: "Live now", value: readyTools().length },
  ];

  return (
    <section className="relative overflow-hidden bg-hero-glow">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 size-[450px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl animate-float" />

      <div className="relative mx-auto max-w-4xl px-5 pb-20 pt-16 text-center md:pb-28 md:pt-24">
        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-xs backdrop-blur"
        >
          <Sparkles className="size-3.5 text-primary" />
          <span>One workspace for every AI tool</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 bg-gradient-to-b from-foreground via-foreground/90 to-foreground/60 bg-clip-text font-display text-5xl font-bold leading-[1.02] tracking-tight text-transparent sm:text-6xl md:text-7xl"
        >
          Flixo
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          A growing directory of fast, private AI tools — translation, images, PDF, writing, audio,
          video and developer utilities. Describe your task and Flixo finds the tool.
        </motion.p>

        {/* AI Assistant Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <Assistant
            prompt={prompt}
            onPromptChange={onPromptChange}
            onRequestTool={onRequestTool}
            onSelectCategory={onSelectCategory}
          />
        </motion.div>

        {/* Stats Grid */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-12 grid max-w-md grid-cols-3 gap-3"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border/70 bg-card/60 px-3 py-4 shadow-xs backdrop-blur transition-all duration-300 hover:border-primary/30 hover:bg-card"
            >
              <dt className="text-xs font-medium text-muted-foreground">{s.label}</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-foreground">{s.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
