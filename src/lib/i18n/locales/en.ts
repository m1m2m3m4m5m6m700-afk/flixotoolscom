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
  "hero.promo.badge": "New",
  "hero.promo.body":
    "Try the AI Image Enhancer today — sharpen, upscale, and remove noise from your photos instantly.",
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
  "tool.ai-chat.name": "AI Chat",
  "tool.ai-chat.tagline":
    "Ask questions, brainstorm ideas, or get instant answers from a general AI assistant.",
  "tool.ai-chat.pageDescription":
    "Chat with a general AI assistant for ideas, questions, and quick problem solving.",
  "tool.prompt-improver.name": "Prompt Improver",
  "tool.prompt-improver.tagline": "Rewrite your prompts to get clearer, more useful AI results.",
  "tool.prompt-improver.pageDescription":
    "Improve prompts for better performance across all AI tools and workflows.",
  "tool.code-explainer.name": "Code Explainer",
  "tool.code-explainer.tagline":
    "Explain code snippets in plain language and discover what they do.",
  "tool.code-explainer.pageDescription":
    "Paste a code snippet and get an easy-to-understand explanation of its behavior.",
  "tool.data-insights.name": "Data Insights",

  "tool.age-calculator.name": "Age Calculator",
  "tool.age-calculator.tagline": "Free online age calculator tool",
  "tool.age-calculator.pageDescription":
    "Use our free age calculator tool. No signup, no fees, just results.",
  "tool.bmi-calculator.name": "Bmi Calculator",
  "tool.bmi-calculator.tagline": "Free online bmi calculator tool",
  "tool.bmi-calculator.pageDescription":
    "Use our free bmi calculator tool. No signup, no fees, just results.",
  "tool.barcode-generator.name": "Barcode Generator",
  "tool.barcode-generator.tagline": "Free online barcode generator tool",
  "tool.barcode-generator.pageDescription":
    "Use our free barcode generator tool. No signup, no fees, just results.",
  "tool.base64-encoder.name": "Base64 Encoder",
  "tool.base64-encoder.tagline": "Free online base64 encoder tool",
  "tool.base64-encoder.pageDescription":
    "Use our free base64 encoder tool. No signup, no fees, just results.",
  "tool.base64-image-encoder.name": "Base64 Image Encoder",
  "tool.base64-image-encoder.tagline": "Free online base64 image encoder tool",
  "tool.base64-image-encoder.pageDescription":
    "Use our free base64 image encoder tool. No signup, no fees, just results.",
  "tool.binary-converter.name": "Binary Converter",
  "tool.binary-converter.tagline": "Free online binary converter tool",
  "tool.binary-converter.pageDescription":
    "Use our free binary converter tool. No signup, no fees, just results.",
  "tool.css-gradient-generator.name": "Css Gradient Generator",
  "tool.css-gradient-generator.tagline": "Free online css gradient generator tool",
  "tool.css-gradient-generator.pageDescription":
    "Use our free css gradient generator tool. No signup, no fees, just results.",
  "tool.css-minifier.name": "Css Minifier",
  "tool.css-minifier.tagline": "Free online css minifier tool",
  "tool.css-minifier.pageDescription":
    "Use our free css minifier tool. No signup, no fees, just results.",
  "tool.csv-to-json-converter.name": "Csv To Json Converter",
  "tool.csv-to-json-converter.tagline": "Free online csv to json converter tool",
  "tool.csv-to-json-converter.pageDescription":
    "Use our free csv to json converter tool. No signup, no fees, just results.",
  "tool.csv-viewer.name": "Csv Viewer",
  "tool.csv-viewer.tagline": "Free online csv viewer tool",
  "tool.csv-viewer.pageDescription":
    "Use our free csv viewer tool. No signup, no fees, just results.",
  "tool.case-transformer.name": "Case Transformer",
  "tool.case-transformer.tagline": "Free online case transformer tool",
  "tool.case-transformer.pageDescription":
    "Use our free case transformer tool. No signup, no fees, just results.",
  "tool.color-converter.name": "Color Converter",
  "tool.color-converter.tagline": "Free online color converter tool",
  "tool.color-converter.pageDescription":
    "Use our free color converter tool. No signup, no fees, just results.",
  "tool.color-mixer.name": "Color Mixer",
  "tool.color-mixer.tagline": "Free online color mixer tool",
  "tool.color-mixer.pageDescription":
    "Use our free color mixer tool. No signup, no fees, just results.",
  "tool.color-palette-generator.name": "Color Palette Generator",
  "tool.color-palette-generator.tagline": "Free online color palette generator tool",
  "tool.color-palette-generator.pageDescription":
    "Use our free color palette generator tool. No signup, no fees, just results.",
  "tool.countdown-timer.name": "Countdown Timer",
  "tool.countdown-timer.tagline": "Free online countdown timer tool",
  "tool.countdown-timer.pageDescription":
    "Use our free countdown timer tool. No signup, no fees, just results.",
  "tool.credit-card-generator.name": "Credit Card Generator",
  "tool.credit-card-generator.tagline": "Free online credit card generator tool",
  "tool.credit-card-generator.pageDescription":
    "Use our free credit card generator tool. No signup, no fees, just results.",
  "tool.credit-card-validator.name": "Credit Card Validator",
  "tool.credit-card-validator.tagline": "Free online credit card validator tool",
  "tool.credit-card-validator.pageDescription":
    "Use our free credit card validator tool. No signup, no fees, just results.",
  "tool.cron-expression-generator.name": "Cron Expression Generator",
  "tool.cron-expression-generator.tagline": "Free online cron expression generator tool",
  "tool.cron-expression-generator.pageDescription":
    "Use our free cron expression generator tool. No signup, no fees, just results.",
  "tool.cron-parser.name": "Cron Parser",
  "tool.cron-parser.tagline": "Free online cron parser tool",
  "tool.cron-parser.pageDescription":
    "Use our free cron parser tool. No signup, no fees, just results.",
  "tool.currency-converter.name": "Currency Converter",
  "tool.currency-converter.tagline": "Free online currency converter tool",
  "tool.currency-converter.pageDescription":
    "Use our free currency converter tool. No signup, no fees, just results.",
  "tool.currency-formatter.name": "Currency Formatter",
  "tool.currency-formatter.tagline": "Free online currency formatter tool",
  "tool.currency-formatter.pageDescription":
    "Use our free currency formatter tool. No signup, no fees, just results.",
  "tool.date-calculator.name": "Date Calculator",
  "tool.date-calculator.tagline": "Free online date calculator tool",
  "tool.date-calculator.pageDescription":
    "Use our free date calculator tool. No signup, no fees, just results.",
  "tool.dice-roller.name": "Dice Roller",
  "tool.dice-roller.tagline": "Free online dice roller tool",
  "tool.dice-roller.pageDescription":
    "Use our free dice roller tool. No signup, no fees, just results.",
  "tool.discount-calculator.name": "Discount Calculator",
  "tool.discount-calculator.tagline": "Free online discount calculator tool",
  "tool.discount-calculator.pageDescription":
    "Use our free discount calculator tool. No signup, no fees, just results.",
  "tool.duplicate-character-finder.name": "Duplicate Character Finder",
  "tool.duplicate-character-finder.tagline": "Free online duplicate character finder tool",
  "tool.duplicate-character-finder.pageDescription":
    "Use our free duplicate character finder tool. No signup, no fees, just results.",
  "tool.duplicate-lines-remover.name": "Duplicate Lines Remover",
  "tool.duplicate-lines-remover.tagline": "Free online duplicate lines remover tool",
  "tool.duplicate-lines-remover.pageDescription":
    "Use our free duplicate lines remover tool. No signup, no fees, just results.",
  "tool.enc-dec-text.name": "Enc Dec Text",
  "tool.enc-dec-text.tagline": "Free online enc dec text tool",
  "tool.enc-dec-text.pageDescription":
    "Use our free enc dec text tool. No signup, no fees, just results.",
  "tool.favicon-generator.name": "Favicon Generator",
  "tool.favicon-generator.tagline": "Free online favicon generator tool",
  "tool.favicon-generator.pageDescription":
    "Use our free favicon generator tool. No signup, no fees, just results.",
  "tool.flip-coin-simulator.name": "Flip Coin Simulator",
  "tool.flip-coin-simulator.tagline": "Free online flip coin simulator tool",
  "tool.flip-coin-simulator.pageDescription":
    "Use our free flip coin simulator tool. No signup, no fees, just results.",
  "tool.hsl-to-hex-converter.name": "Hsl To Hex Converter",
  "tool.hsl-to-hex-converter.tagline": "Free online hsl to hex converter tool",
  "tool.hsl-to-hex-converter.pageDescription":
    "Use our free hsl to hex converter tool. No signup, no fees, just results.",
  "tool.html-encoder-decoder.name": "Html Encoder Decoder",
  "tool.html-encoder-decoder.tagline": "Free online html encoder decoder tool",
  "tool.html-encoder-decoder.pageDescription":
    "Use our free html encoder decoder tool. No signup, no fees, just results.",
  "tool.html-minifier.name": "Html Minifier",
  "tool.html-minifier.tagline": "Free online html minifier tool",
  "tool.html-minifier.pageDescription":
    "Use our free html minifier tool. No signup, no fees, just results.",
  "tool.html-to-react-converter.name": "Html To React Converter",
  "tool.html-to-react-converter.tagline": "Free online html to react converter tool",
  "tool.html-to-react-converter.pageDescription":
    "Use our free html to react converter tool. No signup, no fees, just results.",
  "tool.hash-check-generator.name": "Hash Check Generator",
  "tool.hash-check-generator.tagline": "Free online hash check generator tool",
  "tool.hash-check-generator.pageDescription":
    "Use our free hash check generator tool. No signup, no fees, just results.",
  "tool.hash-comparator.name": "Hash Comparator",
  "tool.hash-comparator.tagline": "Free online hash comparator tool",
  "tool.hash-comparator.pageDescription":
    "Use our free hash comparator tool. No signup, no fees, just results.",
  "tool.hash-generator.name": "Hash Generator",
  "tool.hash-generator.tagline": "Free online hash generator tool",
  "tool.hash-generator.pageDescription":
    "Use our free hash generator tool. No signup, no fees, just results.",
  "tool.hex-converter.name": "Hex Converter",
  "tool.hex-converter.tagline": "Free online hex converter tool",
  "tool.hex-converter.pageDescription":
    "Use our free hex converter tool. No signup, no fees, just results.",
  "tool.hex-rgb-converter.name": "Hex Rgb Converter",
  "tool.hex-rgb-converter.tagline": "Free online hex rgb converter tool",
  "tool.hex-rgb-converter.pageDescription":
    "Use our free hex rgb converter tool. No signup, no fees, just results.",
  "tool.hex-to-rgb-converter.name": "Hex To Rgb Converter",
  "tool.hex-to-rgb-converter.tagline": "Free online hex to rgb converter tool",
  "tool.hex-to-rgb-converter.pageDescription":
    "Use our free hex to rgb converter tool. No signup, no fees, just results.",
  "tool.ip-address-info.name": "Ip Address Info",
  "tool.ip-address-info.tagline": "Free online ip address info tool",
  "tool.ip-address-info.pageDescription":
    "Use our free ip address info tool. No signup, no fees, just results.",
  "tool.interest-calculator.name": "Interest Calculator",
  "tool.interest-calculator.tagline": "Free online interest calculator tool",
  "tool.interest-calculator.pageDescription":
    "Use our free interest calculator tool. No signup, no fees, just results.",
  "tool.investment-calculator.name": "Investment Calculator",
  "tool.investment-calculator.tagline": "Free online investment calculator tool",
  "tool.investment-calculator.pageDescription":
    "Use our free investment calculator tool. No signup, no fees, just results.",
  "tool.js-minifier.name": "Js Minifier",
  "tool.js-minifier.tagline": "Free online js minifier tool",
  "tool.js-minifier.pageDescription":
    "Use our free js minifier tool. No signup, no fees, just results.",
  "tool.json-formatter.name": "Json Formatter",
  "tool.json-formatter.tagline": "Free online json formatter tool",
  "tool.json-formatter.pageDescription":
    "Use our free json formatter tool. No signup, no fees, just results.",
  "tool.json-merger.name": "Json Merger",
  "tool.json-merger.tagline": "Free online json merger tool",
  "tool.json-merger.pageDescription":
    "Use our free json merger tool. No signup, no fees, just results.",
  "tool.json-path-evaluator.name": "Json Path Evaluator",
  "tool.json-path-evaluator.tagline": "Free online json path evaluator tool",
  "tool.json-path-evaluator.pageDescription":
    "Use our free json path evaluator tool. No signup, no fees, just results.",
  "tool.json-path-tester.name": "Json Path Tester",
  "tool.json-path-tester.tagline": "Free online json path tester tool",
  "tool.json-path-tester.pageDescription":
    "Use our free json path tester tool. No signup, no fees, just results.",
  "tool.json-to-csv-converter.name": "Json To Csv Converter",
  "tool.json-to-csv-converter.tagline": "Free online json to csv converter tool",
  "tool.json-to-csv-converter.pageDescription":
    "Use our free json to csv converter tool. No signup, no fees, just results.",
  "tool.json-to-xml-converter.name": "Json To Xml Converter",
  "tool.json-to-xml-converter.tagline": "Free online json to xml converter tool",
  "tool.json-to-xml-converter.pageDescription":
    "Use our free json to xml converter tool. No signup, no fees, just results.",
  "tool.json-validator.name": "Json Validator",
  "tool.json-validator.tagline": "Free online json validator tool",
  "tool.json-validator.pageDescription":
    "Use our free json validator tool. No signup, no fees, just results.",
  "tool.jwt-decoder.name": "Jwt Decoder",
  "tool.jwt-decoder.tagline": "Free online jwt decoder tool",
  "tool.jwt-decoder.pageDescription":
    "Use our free jwt decoder tool. No signup, no fees, just results.",
  "tool.jwt-encoder.name": "Jwt Encoder",
  "tool.jwt-encoder.tagline": "Free online jwt encoder tool",
  "tool.jwt-encoder.pageDescription":
    "Use our free jwt encoder tool. No signup, no fees, just results.",
  "tool.line-counter.name": "Line Counter",
  "tool.line-counter.tagline": "Free online line counter tool",
  "tool.line-counter.pageDescription":
    "Use our free line counter tool. No signup, no fees, just results.",
  "tool.list-randomizer.name": "List Randomizer",
  "tool.list-randomizer.tagline": "Free online list randomizer tool",
  "tool.list-randomizer.pageDescription":
    "Use our free list randomizer tool. No signup, no fees, just results.",
  "tool.loan-calculator.name": "Loan Calculator",
  "tool.loan-calculator.tagline": "Free online loan calculator tool",
  "tool.loan-calculator.pageDescription":
    "Use our free loan calculator tool. No signup, no fees, just results.",
  "tool.lorem-ipsum-customizer.name": "Lorem Ipsum Customizer",
  "tool.lorem-ipsum-customizer.tagline": "Free online lorem ipsum customizer tool",
  "tool.lorem-ipsum-customizer.pageDescription":
    "Use our free lorem ipsum customizer tool. No signup, no fees, just results.",
  "tool.lorem-ipsum-generator.name": "Lorem Ipsum Generator",
  "tool.lorem-ipsum-generator.tagline": "Free online lorem ipsum generator tool",
  "tool.lorem-ipsum-generator.pageDescription":
    "Use our free lorem ipsum generator tool. No signup, no fees, just results.",
  "tool.md5-generator.name": "Md5 Generator",
  "tool.md5-generator.tagline": "Free online md5 generator tool",
  "tool.md5-generator.pageDescription":
    "Use our free md5 generator tool. No signup, no fees, just results.",
  "tool.mark-down-preview.name": "Mark Down Preview",
  "tool.mark-down-preview.tagline": "Free online mark down preview tool",
  "tool.mark-down-preview.pageDescription":
    "Use our free mark down preview tool. No signup, no fees, just results.",
  "tool.morse-code-converter.name": "Morse Code Converter",
  "tool.morse-code-converter.tagline": "Free online morse code converter tool",
  "tool.morse-code-converter.pageDescription":
    "Use our free morse code converter tool. No signup, no fees, just results.",
  "tool.number-base-converter.name": "Number Base Converter",
  "tool.number-base-converter.tagline": "Free online number base converter tool",
  "tool.number-base-converter.pageDescription":
    "Use our free number base converter tool. No signup, no fees, just results.",
  "tool.number-speller.name": "Number Speller",
  "tool.number-speller.tagline": "Free online number speller tool",
  "tool.number-speller.pageDescription":
    "Use our free number speller tool. No signup, no fees, just results.",
  "tool.number-to-words-converter.name": "Number To Words Converter",
  "tool.number-to-words-converter.tagline": "Free online number to words converter tool",
  "tool.number-to-words-converter.pageDescription":
    "Use our free number to words converter tool. No signup, no fees, just results.",
  "tool.password-strength-checker.name": "Password Strength Checker",
  "tool.password-strength-checker.tagline": "Free online password strength checker tool",
  "tool.password-strength-checker.pageDescription":
    "Use our free password strength checker tool. No signup, no fees, just results.",
  "tool.password-strength-tester.name": "Password Strength Tester",
  "tool.password-strength-tester.tagline": "Free online password strength tester tool",
  "tool.password-strength-tester.pageDescription":
    "Use our free password strength tester tool. No signup, no fees, just results.",
  "tool.percentage-calculator.name": "Percentage Calculator",
  "tool.percentage-calculator.tagline": "Free online percentage calculator tool",
  "tool.percentage-calculator.pageDescription":
    "Use our free percentage calculator tool. No signup, no fees, just results.",
  "tool.percentage-change-calculator.name": "Percentage Change Calculator",
  "tool.percentage-change-calculator.tagline": "Free online percentage change calculator tool",
  "tool.percentage-change-calculator.pageDescription":
    "Use our free percentage change calculator tool. No signup, no fees, just results.",
  "tool.percentage-difference-calculator.name": "Percentage Difference Calculator",
  "tool.percentage-difference-calculator.tagline":
    "Free online percentage difference calculator tool",
  "tool.percentage-difference-calculator.pageDescription":
    "Use our free percentage difference calculator tool. No signup, no fees, just results.",
  "tool.percentage-distribution-calculator.name": "Percentage Distribution Calculator",
  "tool.percentage-distribution-calculator.tagline":
    "Free online percentage distribution calculator tool",
  "tool.percentage-distribution-calculator.pageDescription":
    "Use our free percentage distribution calculator tool. No signup, no fees, just results.",
  "tool.qr-code-generator.name": "Qr Code Generator",
  "tool.qr-code-generator.tagline": "Free online qr code generator tool",
  "tool.qr-code-generator.pageDescription":
    "Use our free qr code generator tool. No signup, no fees, just results.",
  "tool.random-color-generator.name": "Random Color Generator",
  "tool.random-color-generator.tagline": "Free online random color generator tool",
  "tool.random-color-generator.pageDescription":
    "Use our free random color generator tool. No signup, no fees, just results.",
  "tool.random-date-generator.name": "Random Date Generator",
  "tool.random-date-generator.tagline": "Free online random date generator tool",
  "tool.random-date-generator.pageDescription":
    "Use our free random date generator tool. No signup, no fees, just results.",
  "tool.random-decimal-generator.name": "Random Decimal Generator",
  "tool.random-decimal-generator.tagline": "Free online random decimal generator tool",
  "tool.random-decimal-generator.pageDescription":
    "Use our free random decimal generator tool. No signup, no fees, just results.",
  "tool.random-hex-generator.name": "Random Hex Generator",
  "tool.random-hex-generator.tagline": "Free online random hex generator tool",
  "tool.random-hex-generator.pageDescription":
    "Use our free random hex generator tool. No signup, no fees, just results.",
  "tool.random-id-generator.name": "Random Id Generator",
  "tool.random-id-generator.tagline": "Free online random id generator tool",
  "tool.random-id-generator.pageDescription":
    "Use our free random id generator tool. No signup, no fees, just results.",
  "tool.random-lottery-number-generator.name": "Random Lottery Number Generator",
  "tool.random-lottery-number-generator.tagline":
    "Free online random lottery number generator tool",
  "tool.random-lottery-number-generator.pageDescription":
    "Use our free random lottery number generator tool. No signup, no fees, just results.",
  "tool.random-name-generator.name": "Random Name Generator",
  "tool.random-name-generator.tagline": "Free online random name generator tool",
  "tool.random-name-generator.pageDescription":
    "Use our free random name generator tool. No signup, no fees, just results.",
  "tool.random-number-generator.name": "Random Number Generator",
  "tool.random-number-generator.tagline": "Free online random number generator tool",
  "tool.random-number-generator.pageDescription":
    "Use our free random number generator tool. No signup, no fees, just results.",
  "tool.random-password-generator.name": "Random Password Generator",
  "tool.random-password-generator.tagline": "Free online random password generator tool",
  "tool.random-password-generator.pageDescription":
    "Use our free random password generator tool. No signup, no fees, just results.",
  "tool.random-picker.name": "Random Picker",
  "tool.random-picker.tagline": "Free online random picker tool",
  "tool.random-picker.pageDescription":
    "Use our free random picker tool. No signup, no fees, just results.",
  "tool.random-team-generator.name": "Random Team Generator",
  "tool.random-team-generator.tagline": "Free online random team generator tool",
  "tool.random-team-generator.pageDescription":
    "Use our free random team generator tool. No signup, no fees, just results.",
  "tool.regex-generator.name": "Regex Generator",
  "tool.regex-generator.tagline": "Free online regex generator tool",
  "tool.regex-generator.pageDescription":
    "Use our free regex generator tool. No signup, no fees, just results.",
  "tool.regex-tester.name": "Regex Tester",
  "tool.regex-tester.tagline": "Free online regex tester tool",
  "tool.regex-tester.pageDescription":
    "Use our free regex tester tool. No signup, no fees, just results.",
  "tool.roman-numeral-converter.name": "Roman Numeral Converter",
  "tool.roman-numeral-converter.tagline": "Free online roman numeral converter tool",
  "tool.roman-numeral-converter.pageDescription":
    "Use our free roman numeral converter tool. No signup, no fees, just results.",
  "tool.sql-formatter.name": "Sql Formatter",
  "tool.sql-formatter.tagline": "Free online sql formatter tool",
  "tool.sql-formatter.pageDescription":
    "Use our free sql formatter tool. No signup, no fees, just results.",
  "tool.sentence-case-converter.name": "Sentence Case Converter",
  "tool.sentence-case-converter.tagline": "Free online sentence case converter tool",
  "tool.sentence-case-converter.pageDescription":
    "Use our free sentence case converter tool. No signup, no fees, just results.",
  "tool.slug-checker.name": "Slug Checker",
  "tool.slug-checker.tagline": "Free online slug checker tool",
  "tool.slug-checker.pageDescription":
    "Use our free slug checker tool. No signup, no fees, just results.",
  "tool.slug-generator.name": "Slug Generator",
  "tool.slug-generator.tagline": "Free online slug generator tool",
  "tool.slug-generator.pageDescription":
    "Use our free slug generator tool. No signup, no fees, just results.",
  "tool.stopwatch.name": "Stopwatch",
  "tool.stopwatch.tagline": "Free online stopwatch tool",
  "tool.stopwatch.pageDescription":
    "Use our free stopwatch tool. No signup, no fees, just results.",
  "tool.string-diff-checker.name": "String Diff Checker",
  "tool.string-diff-checker.tagline": "Free online string diff checker tool",
  "tool.string-diff-checker.pageDescription":
    "Use our free string diff checker tool. No signup, no fees, just results.",
  "tool.temperature-converter.name": "Temperature Converter",
  "tool.temperature-converter.tagline": "Free online temperature converter tool",
  "tool.temperature-converter.pageDescription":
    "Use our free temperature converter tool. No signup, no fees, just results.",
  "tool.text-case-converter.name": "Text Case Converter",
  "tool.text-case-converter.tagline": "Free online text case converter tool",
  "tool.text-case-converter.pageDescription":
    "Use our free text case converter tool. No signup, no fees, just results.",
  "tool.text-diff-checker.name": "Text Diff Checker",
  "tool.text-diff-checker.tagline": "Free online text diff checker tool",
  "tool.text-diff-checker.pageDescription":
    "Use our free text diff checker tool. No signup, no fees, just results.",
  "tool.text-to-slug.name": "Text To Slug",
  "tool.text-to-slug.tagline": "Free online text to slug tool",
  "tool.text-to-slug.pageDescription":
    "Use our free text to slug tool. No signup, no fees, just results.",
  "tool.text-to-speech.name": "Text To Speech",
  "tool.text-to-speech.tagline": "Free online text to speech tool",
  "tool.text-to-speech.pageDescription":
    "Use our free text to speech tool. No signup, no fees, just results.",
  "tool.time-between-dates.name": "Time Between Dates",
  "tool.time-between-dates.tagline": "Free online time between dates tool",
  "tool.time-between-dates.pageDescription":
    "Use our free time between dates tool. No signup, no fees, just results.",
  "tool.time-zone-converter.name": "Time Zone Converter",
  "tool.time-zone-converter.tagline": "Free online time zone converter tool",
  "tool.time-zone-converter.pageDescription":
    "Use our free time zone converter tool. No signup, no fees, just results.",
  "tool.tip-calculator.name": "Tip Calculator",
  "tool.tip-calculator.tagline": "Free online tip calculator tool",
  "tool.tip-calculator.pageDescription":
    "Use our free tip calculator tool. No signup, no fees, just results.",
  "tool.tip-splitter.name": "Tip Splitter",
  "tool.tip-splitter.tagline": "Free online tip splitter tool",
  "tool.tip-splitter.pageDescription":
    "Use our free tip splitter tool. No signup, no fees, just results.",
  "tool.url-encoder.name": "Url Encoder",
  "tool.url-encoder.tagline": "Free online url encoder tool",
  "tool.url-encoder.pageDescription":
    "Use our free url encoder tool. No signup, no fees, just results.",
  "tool.url-parser.name": "Url Parser",
  "tool.url-parser.tagline": "Free online url parser tool",
  "tool.url-parser.pageDescription":
    "Use our free url parser tool. No signup, no fees, just results.",
  "tool.uuid-generator.name": "Uuid Generator",
  "tool.uuid-generator.tagline": "Free online uuid generator tool",
  "tool.uuid-generator.pageDescription":
    "Use our free uuid generator tool. No signup, no fees, just results.",
  "tool.uui-dv4-generator.name": "Uui Dv4 Generator",
  "tool.uui-dv4-generator.tagline": "Free online uui dv4 generator tool",
  "tool.uui-dv4-generator.pageDescription":
    "Use our free uui dv4 generator tool. No signup, no fees, just results.",
  "tool.uui-dv7-generator.name": "Uui Dv7 Generator",
  "tool.uui-dv7-generator.tagline": "Free online uui dv7 generator tool",
  "tool.uui-dv7-generator.pageDescription":
    "Use our free uui dv7 generator tool. No signup, no fees, just results.",
  "tool.unit-converter.name": "Unit Converter",
  "tool.unit-converter.tagline": "Free online unit converter tool",
  "tool.unit-converter.pageDescription":
    "Use our free unit converter tool. No signup, no fees, just results.",
  "tool.vat-calculator.name": "Vat Calculator",
  "tool.vat-calculator.tagline": "Free online vat calculator tool",
  "tool.vat-calculator.pageDescription":
    "Use our free vat calculator tool. No signup, no fees, just results.",
  "tool.word-cloud-generator.name": "Word Cloud Generator",
  "tool.word-cloud-generator.tagline": "Free online word cloud generator tool",
  "tool.word-cloud-generator.pageDescription":
    "Use our free word cloud generator tool. No signup, no fees, just results.",
  "tool.word-counter.name": "Word Counter",
  "tool.word-counter.tagline": "Free online word counter tool",
  "tool.word-counter.pageDescription":
    "Use our free word counter tool. No signup, no fees, just results.",
  "tool.word-density-analyzer.name": "Word Density Analyzer",
  "tool.word-density-analyzer.tagline": "Free online word density analyzer tool",
  "tool.word-density-analyzer.pageDescription":
    "Use our free word density analyzer tool. No signup, no fees, just results.",
  "tool.word-frequency-analyzer.name": "Word Frequency Analyzer",
  "tool.word-frequency-analyzer.tagline": "Free online word frequency analyzer tool",
  "tool.word-frequency-analyzer.pageDescription":
    "Use our free word frequency analyzer tool. No signup, no fees, just results.",
  "tool.xml-formatter.name": "Xml Formatter",
  "tool.markdown-preview.name": "Markdown Preview",
  "tool.markdown-preview.tagline": "Free online markdown preview tool",
  "tool.markdown-preview.pageDescription":
    "Use our free markdown preview tool. No signup, no fees, just results.",
  "tool.uuidv4-generator.name": "Uuidv4 Generator",
  "tool.uuidv4-generator.tagline": "Free online uuidv4 generator tool",
  "tool.uuidv4-generator.pageDescription":
    "Use our free uuidv4 generator tool. No signup, no fees, just results.",
  "tool.uuidv7-generator.name": "Uuidv7 Generator",
  "tool.uuidv7-generator.tagline": "Free online uuidv7 generator tool",
  "tool.uuidv7-generator.pageDescription":
    "Use our free uuidv7 generator tool. No signup, no fees, just results.",
  "tool.xml-formatter.tagline": "Free online xml formatter tool",
  "tool.xml-formatter.pageDescription":
    "Use our free xml formatter tool. No signup, no fees, just results.",
  "tool.data-insights.tagline": "Upload tables or CSVs and surface AI-driven insights quickly.",
  "tool.data-insights.pageDescription":
    "Analyze tables, CSVs, and data sets with instant AI insights and summaries.",

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
