import type { LucideIcon } from "lucide-react";
import { Languages, FileText, Image, Mic, Code2, Sparkles } from "lucide-react";

export type ToolStatus = "live" | "soon";

export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  icon: LucideIcon;
  status: ToolStatus;
  href?: string;
}

/**
 * Central registry — add a new entry here and it appears across the site.
 * A tool becomes usable by adding a route at src/routes/tools/<slug>.tsx
 * and flipping status to "live".
 */
export const tools: Tool[] = [
  {
    slug: "translator",
    name: "AI Translator",
    tagline: "Translate between 20+ languages with auto detection and instant swapping.",
    category: "Language",
    icon: Languages,
    status: "live",
    href: "/tools/translator",
  },
  {
    slug: "summarizer",
    name: "Text Summarizer",
    tagline: "Condense long documents into sharp, readable takeaways.",
    category: "Writing",
    icon: FileText,
    status: "soon",
  },
  {
    slug: "image-studio",
    name: "Image Studio",
    tagline: "Generate and restyle visuals from a single prompt.",
    category: "Vision",
    icon: Image,
    status: "soon",
  },
  {
    slug: "transcribe",
    name: "Voice Transcriber",
    tagline: "Turn meetings and voice notes into clean, timestamped text.",
    category: "Audio",
    icon: Mic,
    status: "soon",
  },
  {
    slug: "code-explain",
    name: "Code Explainer",
    tagline: "Understand unfamiliar code with line-by-line commentary.",
    category: "Developer",
    icon: Code2,
    status: "soon",
  },
  {
    slug: "rewriter",
    name: "Tone Rewriter",
    tagline: "Rewrite any passage for tone, clarity, or audience.",
    category: "Writing",
    icon: Sparkles,
    status: "soon",
  },
];

export const categories = [
  { name: "Language", count: 6, blurb: "Translation, localization and multilingual copy." },
  { name: "Writing", count: 9, blurb: "Drafting, editing, summarizing and rewriting." },
  { name: "Vision", count: 5, blurb: "Image generation, upscaling and background work." },
  { name: "Audio", count: 4, blurb: "Transcription, voice cleanup and dubbing." },
  { name: "Developer", count: 7, blurb: "Code review, explanation and test scaffolding." },
  { name: "Research", count: 3, blurb: "Extraction, comparison and structured analysis." },
];
