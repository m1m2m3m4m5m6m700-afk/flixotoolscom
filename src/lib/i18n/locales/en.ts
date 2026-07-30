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
  "hero.description":
    "A premium AI toolkit that brings translation, writing, vision and audio tools under a single calm interface — no tab juggling, no setup, no accounts.",
  "hero.searchLabel": "Search Flixo tools",
  "hero.searchPlaceholder": "Search tools — translate, summarize, transcribe…",
  "hero.browse": "Browse",
  "hero.cta": "Try the AI Translator",
  "hero.note": "Free · No sign-up required",

  "featured.eyebrow": "Featured tools",
  "featured.title": "Purpose-built tools, not a chat box",
  "featured.description":
    "Each tool is designed around one job and shares the same shortcuts, layout and keyboard flow.",
  "featured.empty": "No tools match “{query}”. Try “translate” or “summarize”.",
  "status.live": "Live",
  "status.soon": "Soon",

  "categories.eyebrow": "Categories",
  "categories.title": "Organised the way work actually happens",
  "categories.description":
    "Browse by the outcome you need rather than by model names or provider logos.",
  "categories.count": "{count} tools",

  "category.language.name": "Language",
  "category.language.blurb": "Translation, localization and multilingual copy.",
  "category.writing.name": "Writing",
  "category.writing.blurb": "Drafting, editing, summarizing and rewriting.",
  "category.vision.name": "Vision",
  "category.vision.blurb": "Image generation, upscaling and background work.",
  "category.audio.name": "Audio",
  "category.audio.blurb": "Transcription, voice cleanup and dubbing.",
  "category.developer.name": "Developer",
  "category.developer.blurb": "Code review, explanation and test scaffolding.",
  "category.research.name": "Research",
  "category.research.blurb": "Extraction, comparison and structured analysis.",

  "tool.translator.name": "AI Translator",
  "tool.translator.tagline":
    "Translate between 20+ languages with auto detection and instant swapping.",
  "tool.summarizer.name": "Text Summarizer",
  "tool.summarizer.tagline": "Condense long documents into sharp, readable takeaways.",
  "tool.image-studio.name": "Image Studio",
  "tool.image-studio.tagline": "Generate and restyle visuals from a single prompt.",
  "tool.transcribe.name": "Voice Transcriber",
  "tool.transcribe.tagline": "Turn meetings and voice notes into clean, timestamped text.",
  "tool.code-explain.name": "Code Explainer",
  "tool.code-explain.tagline": "Understand unfamiliar code with line-by-line commentary.",
  "tool.rewriter.name": "Tone Rewriter",
  "tool.rewriter.tagline": "Rewrite any passage for tone, clarity, or audience.",

  "popular.eyebrow": "Popular",
  "popular.title": "What people reach for most",
  "popular.description":
    "The tools our community opens day after day, ranked by usage this month.",
  "popular.runs": "{count} runs",

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
  "faq.q5": "When are the other tools launching?",
  "faq.a5":
    "Summarizer, Image Studio and Voice Transcriber are next. Each new tool plugs into the same registry and inherits the shared layout.",

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
