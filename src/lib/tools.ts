import type { LinkProps } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { Languages, FileText, Image, Mic, Code as Code2 } from "lucide-react";
import type { TranslationKey } from "@/lib/i18n/locales/en";

export type ToolStatus = "live" | "soon";

export interface Tool {
  slug: string;
  categoryId: CategoryId;
  icon: LucideIcon;
  status: ToolStatus;
  href?: LinkProps["to"];
}

export type CategoryId =
  | "language"
  | "writing"
  | "vision"
  | "audio"
  | "developer"
  | "research"
  | "utilities";

export type IntentCategory =
  | "translation"
  | "images"
  | "pdf"
  | "writing"
  | "utilities"
  | "unknown";

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
];

export const categories: { id: CategoryId; count: number }[] = [
  { id: "language", count: 6 },
  { id: "writing", count: 9 },
  { id: "vision", count: 5 },
  { id: "audio", count: 4 },
  { id: "developer", count: 7 },
  { id: "utilities", count: 3 },
];

export interface ClassifyResult {
  category: IntentCategory;
  tool?: Tool;
  matchedKeywords: string[];
}

const KEYWORD_MAP: Record<Exclude<IntentCategory, "unknown">, string[]> = {
  translation: [
    "translate", "translation", "ترجم", "ترجمة", "لغة", "language",
    "english", "arabic", "french", "spanish", "english to", "convert language",
  ],
  images: [
    "image", "photo", "picture", "صورة", "generate image", "upscale",
    "background", "visual", "تصميم", "رسم",
  ],
  pdf: [
    "pdf", "document", "merge pdf", "split pdf", "compress pdf",
    "مستند", "ملف", "تحويل pdf",
  ],
  writing: [
    "write", "summarize", "rewrite", "draft", "edit", "اكتب", "لخص",
    "تلخيص", "إعادة صياغة", "article", "blog", "email", "content",
  ],
  utilities: [
    "convert", "compress", "format", "json", "csv", "حول", "ضغط",
    "تنسيق", "qr", "base64", "hash",
  ],
};

const INTENT_TO_CATEGORY: Record<Exclude<IntentCategory, "unknown">, CategoryId> = {
  translation: "language",
  images: "vision",
  pdf: "utilities",
  writing: "writing",
  utilities: "utilities",
};

/**
 * Mock intent classifier — runs entirely in the browser.
 * Matches the user's prompt against keyword lists per intent, returns
 * the best-matching tool (if one exists in the registry) and the matched
 * keywords so the UI can explain its reasoning.
 */
export function classifyIntent(prompt: string): ClassifyResult {
  const text = prompt.toLowerCase().trim();
  if (!text) return { category: "unknown", matchedKeywords: [] };

  const scores: Record<string, { category: Exclude<IntentCategory, "unknown">; matched: string[] }> = {};

  (Object.keys(KEYWORD_MAP) as Array<Exclude<IntentCategory, "unknown">>).forEach((cat) => {
    const matched = KEYWORD_MAP[cat].filter((kw) => text.includes(kw));
    if (matched.length > 0) {
      scores[cat] = { category: cat, matched };
    }
  });

  const ranked = Object.values(scores).sort((a, b) => b.matched.length - a.matched.length);
  if (ranked.length === 0) return { category: "unknown", matchedKeywords: [] };

  const best = ranked[0];
  const categoryId = INTENT_TO_CATEGORY[best.category];
  const tool = tools.find((t) => t.categoryId === categoryId);

  return { category: best.category, tool, matchedKeywords: best.matched };
}
