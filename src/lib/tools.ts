import type { LinkProps } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  Languages,
  ImageIcon,
  FileImage,
  QrCode,
  KeyRound,
  FileText,
  PenLine,
  Wrench,
  Sparkles,
} from "lucide-react";
import type { TranslationKey } from "@/lib/i18n/locales/en";

export type ToolStatus = "live" | "soon";

export interface Tool {
  slug: string;
  categoryId: CategoryId;
  icon: LucideIcon;
  status: ToolStatus;
  href?: LinkProps["to"];
}

/**
 * The five long-term roadmap categories for Flixo.
 * Every tool added in the future belongs to one of these.
 */
export type CategoryId = "translation" | "images" | "pdf" | "writing" | "utilities";

export interface Category {
  id: CategoryId;
  icon: LucideIcon;
  /** Future tools planned for this category — names shown as placeholders. */
  tools: string[];
}

export type IntentCategory = CategoryId | "unknown";

/** Translation-key helpers so every label flows through the i18n layer. */
export const toolNameKey = (slug: string) => `tool.${slug}.name` as TranslationKey;
export const toolTaglineKey = (slug: string) => `tool.${slug}.tagline` as TranslationKey;
export const categoryNameKey = (id: CategoryId) => `category.${id}.name` as TranslationKey;
export const categoryBlurbKey = (id: CategoryId) => `category.${id}.blurb` as TranslationKey;
export const categoryToolsKey = (id: CategoryId) => `category.${id}.tools` as TranslationKey;

/**
 * Central category registry — the roadmap shown on the homepage.
 * Each category lists the placeholder tools planned for it.
 * A tool becomes usable by adding a route at src/routes/tools/<slug>.tsx,
 * flipping its status to "live" and adding tool.<slug>.* keys to each locale.
 */
export const categories: Category[] = [
  {
    id: "translation",
    icon: Languages,
    tools: ["translator", "localizer", "subtitle-translator"],
  },
  {
    id: "images",
    icon: ImageIcon,
    tools: ["image-generator", "image-upscaler", "background-remover"],
  },
  {
    id: "pdf",
    icon: FileText,
    tools: ["pdf-merge", "pdf-split", "pdf-compress", "pdf-to-word"],
  },
  {
    id: "writing",
    icon: PenLine,
    tools: ["summarizer", "tone-rewriter", "email-drafter"],
  },
  {
    id: "utilities",
    icon: Wrench,
    tools: ["json-formatter", "qr-generator", "base64-converter"],
  },
];

/**
 * Central tool registry — only tools with a status ("live" or "soon").
 * Currently only the translator is live; everything else is a placeholder.
 */
export const tools: Tool[] = [
  {
    slug: "translator",
    categoryId: "translation",
    icon: Languages,
    status: "live",
    href: "/tools/translator",
  },
  {
    slug: "background-remover",
    categoryId: "images",
    icon: ImageIcon,
    status: "live",
    href: "/tools/background-remover",
  },
  {
    slug: "image-enhancer",
    categoryId: "images",
    icon: Sparkles,
    status: "live",
    href: "/tools/image-enhancer",
  },
  {
    slug: "image-compressor",
    categoryId: "images",
    icon: FileImage,
    status: "live",
    href: "/tools/image-compressor",
  },
  {
    slug: "qr-generator",
    categoryId: "utilities",
    icon: QrCode,
    status: "live",
    href: "/tools/qr-generator",
  },
  {
    slug: "password-generator",
    categoryId: "utilities",
    icon: KeyRound,
    status: "live",
    href: "/tools/password-generator",
  },
];

export interface ClassifyResult {
  category: IntentCategory;
  /** A live tool in the matched category, if one exists. */
  tool?: Tool;
  matchedKeywords: string[];
}

const KEYWORD_MAP: Record<CategoryId, string[]> = {
  translation: [
    "translate",
    "translation",
    "ترجم",
    "ترجمة",
    "language",
    "لغة",
    "english",
    "arabic",
    "french",
    "spanish",
    "subtitle",
    "localize",
  ],
  images: [
    "image",
    "photo",
    "picture",
    "صورة",
    "generate image",
    "upscale",
    "background",
    "visual",
    "تصميم",
    "رسم",
    "صور",
  ],
  pdf: [
    "pdf",
    "document",
    "merge pdf",
    "split pdf",
    "compress pdf",
    "مستند",
    "ملف",
    "تحويل pdf",
    "pdf to word",
  ],
  writing: [
    "write",
    "summarize",
    "rewrite",
    "draft",
    "edit",
    "اكتب",
    "لخص",
    "تلخيص",
    "إعادة صياغة",
    "article",
    "blog",
    "email",
    "content",
    "كتابة",
  ],
  utilities: [
    "convert",
    "compress",
    "format",
    "json",
    "csv",
    "حول",
    "ضغط",
    "تنسيق",
    "qr",
    "base64",
    "hash",
    "أداة مساعدة",
  ],
};

/**
 * Mock intent classifier — runs entirely in the browser.
 * Matches the user's prompt against keyword lists per category, returns
 * the best-matching category, a live tool if one exists, and the matched
 * keywords so the UI can explain its reasoning.
 */
export function classifyIntent(prompt: string): ClassifyResult {
  const text = prompt.toLowerCase().trim();
  if (!text) return { category: "unknown", matchedKeywords: [] };

  const scores: { category: CategoryId; matched: string[] }[] = [];

  (Object.keys(KEYWORD_MAP) as CategoryId[]).forEach((cat) => {
    const matched = KEYWORD_MAP[cat].filter((kw) => text.includes(kw));
    if (matched.length > 0) scores.push({ category: cat, matched });
  });

  if (scores.length === 0) return { category: "unknown", matchedKeywords: [] };

  const best = scores.sort((a, b) => b.matched.length - a.matched.length)[0];
  const tool = tools.find((t) => t.categoryId === best.category && t.status === "live");

  return { category: best.category, tool, matchedKeywords: best.matched };
}
