import type { LucideIcon } from "lucide-react";
import {
  Languages,
  ImageIcon,
  FileText,
  PenLine,
  Video,
  AudioLines,
  FolderCog,
  Wrench,
  Repeat,
  Calculator,
  Globe,
  Code2,
  Sparkles,
  Rocket,
} from "lucide-react";

/** Every top-level category id in Flixo. Tools reference exactly one of these. */
export type CategoryId =
  | "translation"
  | "images"
  | "pdf"
  | "writing"
  | "video"
  | "audio"
  | "files"
  | "utilities"
  | "converters"
  | "calculators"
  | "web"
  | "developer"
  | "ai"
  | "future";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  /** Visual identifier used by cards, nav and search results. */
  icon: LucideIcon;
  /** Anchor key on the homepage (`/#<anchor>`) or a dedicated route. */
  anchor: string;
  route?: string;
  /** Display order across the whole app. */
  order: number;
  /** Ids of the tools that belong to this category. */
  toolIds: string[];
}

export const categories: Category[] = [
  {
    id: "translation",
    name: "Translation Hub",
    description: "Translate text, documents and subtitles between 20+ languages.",
    icon: Languages,
    anchor: "translation",
    route: "/tools/translator",
    order: 1,
    toolIds: ["translator", "document-translator", "subtitle-translator", "localizer"],
  },
  {
    id: "images",
    name: "Image Tools",
    description: "Generate, upscale, clean up and convert images in seconds.",
    icon: ImageIcon,
    anchor: "images",
    order: 2,
    toolIds: ["image-generator", "image-upscaler", "background-remover", "image-compressor"],
  },
  {
    id: "pdf",
    name: "PDF Tools",
    description: "Merge, split, compress and convert PDF documents.",
    icon: FileText,
    anchor: "pdf",
    order: 3,
    toolIds: ["pdf-merge", "pdf-split", "pdf-compress", "pdf-to-word"],
  },
  {
    id: "writing",
    name: "AI Writing",
    description: "Draft, summarise and rewrite content with the right tone.",
    icon: PenLine,
    anchor: "writing",
    order: 4,
    toolIds: ["summarizer", "tone-rewriter", "email-drafter", "grammar-fixer"],
  },
  {
    id: "video",
    name: "Video Tools",
    description: "Trim, compress and caption videos without heavy software.",
    icon: Video,
    anchor: "video",
    order: 5,
    toolIds: ["video-compressor", "video-trimmer", "video-to-gif", "auto-subtitles"],
  },
  {
    id: "audio",
    name: "Audio Tools",
    description: "Transcribe, convert and clean up audio recordings.",
    icon: AudioLines,
    anchor: "audio",
    order: 6,
    toolIds: ["audio-transcriber", "text-to-speech", "audio-converter", "noise-remover"],
  },
  {
    id: "files",
    name: "File Tools",
    description: "Compress, rename, split and inspect files of any type.",
    icon: FolderCog,
    anchor: "files",
    order: 7,
    toolIds: ["file-compressor", "archive-extractor", "file-splitter", "metadata-viewer"],
  },
  {
    id: "utilities",
    name: "Utilities",
    description: "Small everyday helpers that save a browser tab each time.",
    icon: Wrench,
    anchor: "utilities",
    order: 8,
    toolIds: ["qr-generator", "password-generator", "uuid-generator", "text-diff"],
  },
  {
    id: "converters",
    name: "Converters",
    description: "Convert between formats, units and encodings instantly.",
    icon: Repeat,
    anchor: "converters",
    order: 9,
    toolIds: ["unit-converter", "currency-converter", "base64-converter", "csv-to-json"],
  },
  {
    id: "calculators",
    name: "Calculators",
    description: "Fast, accurate calculators for money, health and time.",
    icon: Calculator,
    anchor: "calculators",
    order: 10,
    toolIds: ["percentage-calculator", "loan-calculator", "bmi-calculator", "date-calculator"],
  },
  {
    id: "web",
    name: "Web Tools",
    description: "Inspect, audit and optimise anything that lives on a URL.",
    icon: Globe,
    anchor: "web",
    order: 11,
    toolIds: ["url-shortener", "meta-tag-generator", "sitemap-generator", "http-headers"],
  },
  {
    id: "developer",
    name: "Developer Tools",
    description: "Formatters, validators and generators for day-to-day coding.",
    icon: Code2,
    anchor: "developer",
    order: 12,
    toolIds: ["json-formatter", "regex-tester", "jwt-decoder", "cron-parser"],
  },
  {
    id: "ai",
    name: "AI Tools",
    description: "General-purpose AI assistants for ideas, code and analysis.",
    icon: Sparkles,
    anchor: "ai",
    order: 13,
    toolIds: ["ai-chat", "prompt-improver", "code-explainer", "data-insights"],
  },
  {
    id: "future",
    name: "Future Features",
    description: "Experiments and requested tools on the Flixo roadmap.",
    icon: Rocket,
    anchor: "future",
    order: 14,
    toolIds: ["workflow-builder", "tool-api", "team-workspace"],
  },
];

export const categoryById = new Map<CategoryId, Category>(categories.map((c) => [c.id, c]));

export const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

export const getCategory = (id: CategoryId): Category | undefined => categoryById.get(id);
