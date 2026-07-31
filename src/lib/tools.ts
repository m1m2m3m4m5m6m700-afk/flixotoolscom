import type { LinkProps } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { Languages, FileText, Image, Mic, Code2, Sparkles } from "lucide-react";
import type { TranslationKey } from "@/lib/i18n/locales/en";

export type ToolStatus = "live" | "soon";

export interface Tool {
  slug: string;
  categoryId: CategoryId;
  icon: LucideIcon;
  status: ToolStatus;
  href?: LinkProps["to"];
}

export type CategoryId = "language" | "writing" | "vision" | "audio" | "developer" | "research";

/** Translation-key helpers so every label flows through the i18n layer. */
export const toolNameKey = (slug: string) => `tool.${slug}.name` as TranslationKey;
export const toolTaglineKey = (slug: string) => `tool.${slug}.tagline` as TranslationKey;
export const categoryNameKey = (id: CategoryId) => `category.${id}.name` as TranslationKey;
export const categoryBlurbKey = (id: CategoryId) => `category.${id}.blurb` as TranslationKey;

/**
 * Central registry — add a new entry here and it appears across the site.
 * A tool becomes usable by adding a route at src/routes/tools/<slug>.tsx,
 * flipping status to "live" and adding tool.<slug>.* keys to each locale file.
 */
export const tools: Tool[] = [
  {
    slug: "translator",
    categoryId: "language",
    icon: Languages,
    status: "live",
    href: "/tools/translator",
  },
  { slug: "summarizer", categoryId: "writing", icon: FileText, status: "soon" },
  { slug: "image-studio", categoryId: "vision", icon: Image, status: "soon" },
  { slug: "transcribe", categoryId: "audio", icon: Mic, status: "soon" },
  { slug: "code-explain", categoryId: "developer", icon: Code2, status: "soon" },
  { slug: "rewriter", categoryId: "writing", icon: Sparkles, status: "soon" },
];

export const categories: { id: CategoryId; count: number }[] = [
  { id: "language", count: 6 },
  { id: "writing", count: 9 },
  { id: "vision", count: 5 },
  { id: "audio", count: 4 },
  { id: "developer", count: 7 },
  { id: "research", count: 3 },
];
