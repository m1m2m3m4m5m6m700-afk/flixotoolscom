/**
 * English source dictionary. This file is the single source of truth for keys —
 * every other locale must implement the same key set (enforced by the Dictionary type).
 */
export const en = {
  "lang.name": "English",
  "lang.switch": "Change language",

  "nav.tools": "Tools",
  "nav.categories": "Categories",
  "nav.popular": "Popular",
  "nav.why": "Why Flixo",
  "nav.faq": "FAQ",
  "nav.openTranslator": "Open Translator",
  "nav.toggleTheme": "Toggle color theme",
  "nav.toggleMenu": "Toggle navigation",

  "hero.badge": "One workspace, every AI tool",
  "hero.title": "One workspace for every AI tool",
  "hero.description":
    "Translation, images, PDFs, writing and utilities — five tool hubs under a single calm interface. No accounts, no API keys, just open a tool and start working.",
  "hero.searchLabel": "Describe what you want to do",
  "hero.searchPlaceholder":
    "Try: “translate this to Arabic”, “summarize a PDF”, “generate an image”…",
  "hero.browse": "Browse tools",
  "hero.cta": "Try the AI Translator",
  "hero.note": "Free · No sign-up required",

  "assistant.eyebrow": "AI Assistant",
  "assistant.title": "Tell me what you need — I'll find the right tool",
  "assistant.placeholder": "Describe your task… e.g. “translate a paragraph to French”",
  "assistant.button": "Find a tool",
  "assistant.thinking": "Thinking…",
  "assistant.reset": "Ask something else",
  "assistant.result.category": "Category",
  "assistant.result.matched": "Matched",
  "assistant.result.open": "Open tool",
  "assistant.result.soon": "Coming soon",
  "assistant.suggestion.translation":
    "It looks like you want to translate text. The AI Translator is ready for you.",
  "assistant.suggestion.images":
    "You're looking to work with images. No image tool is live yet — request one and we'll prioritize it.",
  "assistant.suggestion.pdf":
    "You mentioned a PDF. No PDF tool is live yet — request one and we'll prioritize it.",
  "assistant.suggestion.writing":
    "You want help with writing. No writing tool is live yet — request one and we'll prioritize it.",
  "assistant.suggestion.utilities":
    "You need a utility tool. No utility tool is live yet — request one and we'll prioritize it.",
  "assistant.suggestion.unknown":
    "I'm not sure which category fits that yet. Describe a bit more, or request a new tool and we'll build it.",
  "assistant.empty.title": "Your suggestion appears here",
  "assistant.empty.body":
    "Type a task above and the assistant will match you to the right Flixo tool — or help you request a new one.",

  "request.trigger": "Request a Tool",
  "request.title": "Request a new tool",
  "request.description": "Tell us what you need and we'll prioritize it for the next release.",
  "request.label": "What do you need the tool to do?",
  "request.placeholder": "e.g. A tool that converts PDF to Word while keeping formatting…",
  "request.submit": "Submit request",
  "request.cancel": "Cancel",
  "request.success":
    "Thanks! Your request has been noted — we'll prioritize it for the next release.",
  "request.ok": "Done",

  "categories.eyebrow": "Tool hubs",
  "categories.title": "Five hubs, one workspace",
  "categories.description":
    "Every Flixo tool lives in one of these hubs. Each is a placeholder for now — the foundation is ready to scale.",
  "categories.status.coming": "Coming soon",
  "categories.status.live": "{count} live",
  "categories.toolsLabel": "Planned tools",
  "status.live": "Live",
  "status.soon": "Soon",

  "category.translation.name": "Translation Hub",
  "category.translation.blurb":
    "Translate, localize and subtitle across 20+ languages with auto detection.",
  "category.translation.tools": "Translator · Localizer · Subtitle Translator",
  "category.images.name": "Image Tools",
  "category.images.blurb": "Generate, upscale and remove backgrounds from images.",
  "category.images.tools": "Image Generator · Upscaler · Background Remover",
  "category.pdf.name": "PDF Tools",
  "category.pdf.blurb": "Merge, split, compress and convert PDF documents.",
  "category.pdf.tools": "Merge · Split · Compress · PDF to Word",
  "category.writing.name": "AI Writing",
  "category.writing.blurb": "Summarize, rewrite and draft content with the right tone.",
  "category.writing.tools": "Summarizer · Tone Rewriter · Email Drafter",
  "category.utilities.name": "Utilities",
  "category.utilities.blurb": "Format, convert and generate everyday technical snippets.",
  "category.utilities.tools": "JSON Formatter · QR Generator · Base64 Converter",

  "tool.translator.name": "AI Translator",
  "tool.translator.tagline":
    "Translate between 20+ languages with auto detection and instant swapping.",
  "tool.background-remover.name": "Background Remover",
  "tool.background-remover.tagline": "Cut out image backgrounds and export transparent PNGs.",
  "tool.image-enhancer.name": "AI Image Enhancer",
  "tool.image-enhancer.tagline":
    "Upscale resolution up to 8x, restore faces, remove noise and sharpen photos.",
  "tool.image-compressor.name": "Image Compressor",
  "tool.image-compressor.tagline": "Shrink image file size directly in your browser.",
  "tool.qr-generator.name": "QR Generator",
  "tool.qr-generator.tagline": "Create custom QR codes for links, text, Wi-Fi and contact details.",
  "tool.password-generator.name": "Password Generator",
  "tool.password-generator.tagline": "Generate strong, secure passwords with entropy meter.",

  "why.eyebrow": "Why Flixo",
  "why.title": "Built to remove friction, not add features",
  "why.speed.title": "Instant by default",
  "why.speed.body":
    "Tools open in under a second and run in the browser — no queues, no cold starts.",
  "why.consistency.title": "One consistent surface",
  "why.consistency.body":
    "Every tool shares the same layout, shortcuts and result actions, so nothing needs relearning.",
  "why.privacy.title": "Privacy-first",
  "why.privacy.body":
    "Nothing is stored between sessions. Your input stays in the tab you typed it in.",
  "why.access.title": "No accounts, no keys",
  "why.access.body":
    "Skip API keys, dashboards and seat management. Open a tool and start working.",

  "stats.tasks": "Tasks processed",
  "stats.languages": "Languages supported",
  "stats.latency": "Median response time",
  "stats.uptime": "Uptime last 12 months",

  "faq.eyebrow": "FAQ",
  "faq.title": "Questions, answered",
  "faq.description": "Everything worth knowing before you open your first tool.",
  "faq.q1": "Is Flixo free to use?",
  "faq.a1":
    "Yes. Every tool currently available on Flixo is free and requires no account or credit card.",
  "faq.q2": "How does the AI Translator work?",
  "faq.a2":
    "You paste text, pick a source and target language (or let auto detect do it), and Flixo returns the translation. The current build uses a local demo engine so you can explore the full flow offline.",
  "faq.q3": "Do you store what I type?",
  "faq.a3":
    "No. Input and output live only in your browser tab and disappear when you close or clear the tool.",
  "faq.q4": "Which languages are supported?",
  "faq.a4":
    "Twenty languages across Latin, Cyrillic, Arabic, Hebrew, Indic and CJK scripts, plus automatic source detection.",
  "faq.q5": "When will the other tools launch?",
  "faq.a5":
    "The five hubs — Translation, Images, PDF, Writing and Utilities — are the roadmap. New tools plug into the same registry and inherit the shared layout as they're built.",

  "footer.tagline": "One calm workspace for every AI tool your team reaches for during the day.",
  "footer.product": "Product",
  "footer.featured": "Featured tools",
  "footer.popular": "Popular tools",
  "footer.numbers": "Numbers",
  "footer.categories": "Categories",
  "footer.tools": "Tools",
  "footer.more": "More coming soon",
  "footer.rights": "© {year} Flixo. All rights reserved.",
  "footer.built": "Built for teams that ship fast.",

  "tool.back": "All tools",
  "translator.pageDescription": "Auto-detect the source language and translate in seconds.",
  "translator.from": "From",
  "translator.to": "To",
  "translator.auto": "Auto detect",
  "translator.swap": "Swap languages",
  "translator.inputPlaceholder": "Type or paste text to translate…",
  "translator.inputLabel": "Text to translate",
  "translator.detected": "detected {language}",
  "translator.copy": "Copy",
  "translator.copied": "Copied",
  "translator.copyError": "Couldn't copy to your clipboard.",
  "translator.genericError": "Something went wrong. Please try again.",
  "translator.clear": "Clear",
  "translator.translate": "Translate",
  "translator.translating": "Translating…",
  "translator.emptyTitle": "Your translation appears here",
  "translator.emptyBody":
    "Pick a target language, drop in some text, and hit Translate. Auto detect figures out the source for you.",
} as const;

export type TranslationKey = keyof typeof en;
export type Dictionary = Record<TranslationKey, string>;
