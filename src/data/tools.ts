import type { CategoryId } from "./categories";

/**
 * placeholder — listed only, no implementation planned yet
 * planned      — committed to the roadmap
 * ready        — usable today at `/tools/<slug>`
 */
export type ToolStatus = "placeholder" | "planned" | "ready";

export interface Tool {
  id: string;
  name: string;
  categoryId: CategoryId;
  description: string;
  status: ToolStatus;
  tags?: string[];
  /** Route segment under /tools. Present for ready and planned tools. */
  slug?: string;
}

const t = (
  id: string,
  name: string,
  categoryId: CategoryId,
  description: string,
  status: ToolStatus = "placeholder",
  tags?: string[],
  slug?: string,
): Tool => ({ id, name, categoryId, description, status, tags, slug });

export const tools: Tool[] = [
  // Translation Hub
  t(
    "translator",
    "AI Translator",
    "translation",
    "Translate text between 20+ languages with automatic detection.",
    "ready",
    ["translate", "language", "text"],
    "translator",
  ),
  t(
    "document-translator",
    "Document Translator",
    "translation",
    "Translate whole documents while keeping their layout.",
    "planned",
    ["document", "translate"],
  ),
  t(
    "subtitle-translator",
    "Subtitle Translator",
    "translation",
    "Translate SRT and VTT subtitle files line by line.",
    "planned",
    ["subtitle", "srt", "video"],
  ),
  t(
    "localizer",
    "App Localizer",
    "translation",
    "Translate JSON and strings files for app localisation.",
    "placeholder",
    ["i18n", "json"],
  ),

  // Image Tools
  t(
    "image-generator",
    "Image Generator",
    "images",
    "Turn a text prompt into original images.",
    "planned",
    ["generate", "art"],
  ),
  t(
    "image-enhancer",
    "AI Image Enhancer",
    "images",
    "Upscale resolution up to 8x, restore faces, remove noise and sharpen photos.",
    "ready",
    ["upscale", "enhance", "ai", "sharpness", "restore"],
    "image-enhancer",
  ),
  t(
    "image-upscaler",
    "Image Upscaler",
    "images",
    "Increase image resolution without losing detail.",
    "planned",
    ["upscale", "resolution"],
  ),
  t(
    "background-remover",
    "Background Remover",
    "images",
    "Cut out backgrounds and export transparent PNGs.",
    "ready",
    ["background", "png", "cutout"],
    "background-remover",
  ),
  t(
    "image-compressor",
    "Image Compressor",
    "images",
    "Shrink image file size while keeping quality.",
    "ready",
    ["compress", "optimize", "jpg", "png"],
    "image-compressor",
  ),

  // PDF Tools
  t("pdf-merge", "Merge PDF", "pdf", "Combine several PDFs into a single document.", "planned", [
    "merge",
    "pdf",
  ]),
  t("pdf-split", "Split PDF", "pdf", "Extract pages or split a PDF into parts.", "planned", [
    "split",
    "pdf",
  ]),
  t(
    "pdf-compress",
    "Compress PDF",
    "pdf",
    "Reduce PDF file size for easier sharing.",
    "placeholder",
    ["compress", "pdf"],
  ),
  t(
    "pdf-to-word",
    "PDF to Word",
    "pdf",
    "Convert PDF documents into editable Word files.",
    "placeholder",
    ["convert", "docx"],
  ),

  // AI Writing
  t("summarizer", "Summarizer", "writing", "Condense long text into clear key points.", "planned", [
    "summary",
    "text",
  ]),
  t(
    "tone-rewriter",
    "Tone Rewriter",
    "writing",
    "Rewrite any text in a different tone or style.",
    "planned",
    ["rewrite", "tone"],
  ),
  t(
    "email-drafter",
    "Email Drafter",
    "writing",
    "Draft professional emails from a short brief.",
    "placeholder",
    ["email", "draft"],
  ),
  t(
    "grammar-fixer",
    "Grammar Fixer",
    "writing",
    "Fix grammar, spelling and clarity issues.",
    "placeholder",
    ["grammar", "proofread"],
  ),

  // Video Tools
  t(
    "video-compressor",
    "Video Compressor",
    "video",
    "Reduce video size while preserving quality.",
    "placeholder",
    ["compress", "mp4"],
  ),
  t(
    "video-trimmer",
    "Video Trimmer",
    "video",
    "Cut and trim clips directly in the browser.",
    "placeholder",
    ["trim", "cut"],
  ),
  t(
    "video-to-gif",
    "Video to GIF",
    "video",
    "Turn short clips into shareable GIFs.",
    "placeholder",
    ["gif", "convert"],
  ),
  t(
    "auto-subtitles",
    "Auto Subtitles",
    "video",
    "Generate subtitles automatically from speech.",
    "planned",
    ["subtitles", "captions"],
  ),

  // Audio Tools
  t(
    "audio-transcriber",
    "Audio Transcriber",
    "audio",
    "Convert speech in audio files into text.",
    "planned",
    ["transcribe", "speech"],
  ),
  t(
    "text-to-speech",
    "Text to Speech",
    "audio",
    "Turn written text into natural sounding audio.",
    "planned",
    ["tts", "voice"],
  ),
  t(
    "audio-converter",
    "Audio Converter",
    "audio",
    "Convert between MP3, WAV, OGG and more.",
    "placeholder",
    ["convert", "mp3"],
  ),
  t(
    "noise-remover",
    "Noise Remover",
    "audio",
    "Clean background noise out of recordings.",
    "placeholder",
    ["noise", "clean"],
  ),

  // File Tools
  t(
    "file-compressor",
    "File Compressor",
    "files",
    "Compress any file or folder into an archive.",
    "placeholder",
    ["zip", "compress"],
  ),
  t(
    "archive-extractor",
    "Archive Extractor",
    "files",
    "Open ZIP, RAR and 7z archives in the browser.",
    "placeholder",
    ["unzip", "archive"],
  ),
  t(
    "file-splitter",
    "File Splitter",
    "files",
    "Split large files into smaller chunks.",
    "placeholder",
    ["split", "chunks"],
  ),
  t(
    "metadata-viewer",
    "Metadata Viewer",
    "files",
    "Inspect and strip metadata from your files.",
    "placeholder",
    ["metadata", "exif"],
  ),

  // Utilities
  t(
    "qr-generator",
    "QR Generator",
    "utilities",
    "Create QR codes for links, text and Wi-Fi.",
    "ready",
    ["qr", "code", "generator"],
    "qr-generator",
  ),
  t(
    "password-generator",
    "Password Generator",
    "utilities",
    "Generate strong, configurable passwords.",
    "ready",
    ["password", "security", "generator"],
    "password-generator",
  ),
  t(
    "uuid-generator",
    "UUID Generator",
    "utilities",
    "Generate UUIDs and short random ids in bulk.",
    "placeholder",
    ["uuid", "id"],
  ),
  t(
    "text-diff",
    "Text Diff",
    "utilities",
    "Compare two texts and highlight the changes.",
    "placeholder",
    ["diff", "compare"],
  ),

  // Converters
  t(
    "unit-converter",
    "Unit Converter",
    "converters",
    "Convert length, weight, temperature and more.",
    "placeholder",
    ["units", "convert"],
  ),
  t(
    "currency-converter",
    "Currency Converter",
    "converters",
    "Convert amounts between world currencies.",
    "placeholder",
    ["currency", "money"],
  ),
  t(
    "base64-converter",
    "Base64 Converter",
    "converters",
    "Encode and decode Base64 text and files.",
    "planned",
    ["base64", "encode"],
  ),
  t(
    "csv-to-json",
    "CSV to JSON",
    "converters",
    "Convert CSV tables into structured JSON.",
    "planned",
    ["csv", "json"],
  ),

  // Calculators
  t(
    "percentage-calculator",
    "Percentage Calculator",
    "calculators",
    "Work out percentages, increases and discounts.",
    "placeholder",
    ["percent", "math"],
  ),
  t(
    "loan-calculator",
    "Loan Calculator",
    "calculators",
    "Estimate monthly payments and total interest.",
    "placeholder",
    ["loan", "finance"],
  ),
  t(
    "bmi-calculator",
    "BMI Calculator",
    "calculators",
    "Calculate body mass index and healthy ranges.",
    "placeholder",
    ["bmi", "health"],
  ),
  t(
    "date-calculator",
    "Date Calculator",
    "calculators",
    "Count days between dates and add durations.",
    "placeholder",
    ["date", "time"],
  ),

  // Web Tools
  t(
    "url-shortener",
    "URL Shortener",
    "web",
    "Create short, shareable links for any URL.",
    "placeholder",
    ["url", "link"],
  ),
  t(
    "meta-tag-generator",
    "Meta Tag Generator",
    "web",
    "Generate SEO and Open Graph meta tags.",
    "planned",
    ["seo", "meta"],
  ),
  t(
    "sitemap-generator",
    "Sitemap Generator",
    "web",
    "Build an XML sitemap from your page list.",
    "placeholder",
    ["sitemap", "seo"],
  ),
  t(
    "http-headers",
    "HTTP Header Inspector",
    "web",
    "Inspect response headers for any URL.",
    "placeholder",
    ["http", "headers"],
  ),

  // Developer Tools
  t(
    "json-formatter",
    "JSON Formatter",
    "developer",
    "Format, validate and minify JSON payloads.",
    "planned",
    ["json", "format"],
  ),
  t(
    "regex-tester",
    "Regex Tester",
    "developer",
    "Test regular expressions against sample text.",
    "planned",
    ["regex", "test"],
  ),
  t(
    "jwt-decoder",
    "JWT Decoder",
    "developer",
    "Decode and inspect JWT header and payload.",
    "placeholder",
    ["jwt", "token"],
  ),
  t(
    "cron-parser",
    "Cron Parser",
    "developer",
    "Explain cron expressions in plain language.",
    "placeholder",
    ["cron", "schedule"],
  ),

  // AI Tools
  t("ai-chat", "AI Chat", "ai", "Ask anything and get answers in a chat interface.", "planned", [
    "chat",
    "assistant",
  ]),
  t(
    "prompt-improver",
    "Prompt Improver",
    "ai",
    "Rewrite prompts to get better AI results.",
    "placeholder",
    ["prompt", "ai"],
  ),
  t(
    "code-explainer",
    "Code Explainer",
    "ai",
    "Explain what a snippet of code actually does.",
    "placeholder",
    ["code", "explain"],
  ),
  t(
    "data-insights",
    "Data Insights",
    "ai",
    "Upload a table and get instant AI insights.",
    "placeholder",
    ["data", "analysis"],
  ),

  // Future Features
  t(
    "workflow-builder",
    "Workflow Builder",
    "future",
    "Chain several Flixo tools into one workflow.",
    "placeholder",
    ["automation"],
  ),
  t(
    "tool-api",
    "Flixo API",
    "future",
    "Call Flixo tools programmatically from your app.",
    "placeholder",
    ["api"],
  ),
  t(
    "team-workspace",
    "Team Workspace",
    "future",
    "Shared history and presets for your team.",
    "placeholder",
    ["team"],
  ),
];

export const toolById = new Map<string, Tool>(tools.map((tool) => [tool.id, tool]));

export const getTool = (id: string): Tool | undefined => toolById.get(id);

export const toolsByCategory = (categoryId: CategoryId): Tool[] =>
  tools.filter((tool) => tool.categoryId === categoryId);

export const readyTools = (): Tool[] => tools.filter((tool) => tool.status === "ready");

export const toolRoute = (tool: Tool): string | undefined =>
  tool.slug ? `/tools/${tool.slug}` : undefined;
