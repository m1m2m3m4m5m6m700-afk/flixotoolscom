#!/usr/bin/env node
/**
 * Flixo Complete Content Generator
 * Generates localized content for ALL 295 tools across 20 languages
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "../..");

// 20 supported languages
const LANGUAGES = [
  { code: "en", name: "English", native: "English" },
  { code: "ar", name: "Arabic", native: "العربية", rtl: true },
  { code: "es", name: "Spanish", native: "Español" },
  { code: "fr", name: "French", native: "Français" },
  { code: "de", name: "German", native: "Deutsch" },
  { code: "pt", name: "Portuguese", native: "Português" },
  { code: "it", name: "Italian", native: "Italiano" },
  { code: "nl", name: "Dutch", native: "Nederlands" },
  { code: "tr", name: "Turkish", native: "Türkçe" },
  { code: "ru", name: "Russian", native: "Русский" },
  { code: "pl", name: "Polish", native: "Polski" },
  { code: "uk", name: "Ukrainian", native: "Українська" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia" },
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt" },
  { code: "th", name: "Thai", native: "ไทย" },
  { code: "ja", name: "Japanese", native: "日本語" },
  { code: "ko", name: "Korean", native: "한국어" },
  { code: "zh-CN", name: "Chinese (Simplified)", native: "简体中文" },
  { code: "zh-TW", name: "Chinese (Traditional)", native: "繁體中文" },
];

// Translation templates for different tool categories
const CATEGORY_TRANSLATIONS = {
  translation: {
    tagline: "Translate text between languages instantly with AI-powered accuracy.",
    description:
      "Free online translation tool powered by AI. Translate text accurately and quickly.",
    metaTitle: "Free AI Translator Online - Translate Text Instantly | Flixo",
    metaDescription:
      "Use our free AI translator. Translate text between 100+ languages instantly. No signup, no fees, accurate results.",
    keywords: [
      "translator",
      "translation",
      "ai translator",
      "free translator",
      "online translator",
      "text translation",
    ],
  },
  images: {
    tagline: "Transform and enhance images with powerful AI tools.",
    description:
      "Free online image tools. Edit, enhance, and transform images directly in your browser.",
    metaTitle: "Free Image Tools Online - AI-Powered Image Editing | Flixo",
    metaDescription:
      "Free online image tools. Enhance, resize, compress, and edit images with AI. No signup required, works in browser.",
    keywords: [
      "image tools",
      "photo editor",
      "image enhancer",
      "image compressor",
      "free image tools",
    ],
  },
  pdf: {
    tagline: "Manage PDF documents with ease. Merge, split, convert, and more.",
    description: "Free online PDF tools. Work with PDF documents directly in your browser.",
    metaTitle: "Free PDF Tools Online - Merge, Split, Convert PDFs | Flixo",
    metaDescription:
      "Free online PDF tools. Merge, split, compress, convert, and edit PDFs. No signup, no fees, works in browser.",
    keywords: ["pdf tools", "pdf merger", "pdf splitter", "pdf converter", "free pdf tools"],
  },
  writing: {
    tagline: "Improve your writing with AI-powered tools.",
    description: "Free online writing tools. Summarize, rewrite, and enhance your content.",
    metaTitle: "Free AI Writing Tools Online - Write Better | Flixo",
    metaDescription:
      "Free AI writing tools. Summarize text, improve writing, check grammar. No signup, no fees, instant results.",
    keywords: [
      "writing tools",
      "ai writer",
      "text summarizer",
      "grammar checker",
      "free writing tools",
    ],
  },
  utility: {
    tagline: "Essential utilities for developers and everyday tasks.",
    description: "Free online utility tools. Format, encode, generate, and convert data instantly.",
    metaTitle: "Free Online Utility Tools - Developer Tools | Flixo",
    metaDescription:
      "Free developer tools. JSON formatter, QR generator, password generator, and more. No signup, instant results.",
    keywords: [
      "utility tools",
      "developer tools",
      "online tools",
      "free tools",
      "formatter",
      "generator",
    ],
  },
  video: {
    tagline: "Process and edit video files with powerful tools.",
    description:
      "Free online video tools. Compress, convert, and enhance videos directly in browser.",
    metaTitle: "Free Video Tools Online - Compress & Convert Videos | Flixo",
    metaDescription:
      "Free online video tools. Compress, convert, and edit videos. No signup, no upload, works in browser.",
    keywords: [
      "video tools",
      "video compressor",
      "video converter",
      "free video tools",
      "online video editor",
    ],
  },
  audio: {
    tagline: "Process audio files with powerful tools.",
    description:
      "Free online audio tools. Convert, compress, and enhance audio directly in browser.",
    metaTitle: "Free Audio Tools Online - Convert & Edit Audio | Flixo",
    metaDescription:
      "Free online audio tools. Convert audio formats, compress files, and more. No signup, works in browser.",
    keywords: [
      "audio tools",
      "audio converter",
      "audio compressor",
      "free audio tools",
      "online audio editor",
    ],
  },
  ai: {
    tagline: "AI-powered tools for productivity and creativity.",
    description: "Free AI tools. Chat, generate content, analyze data, and more.",
    metaTitle: "Free AI Tools Online - Chat, Generate & Analyze | Flixo",
    metaDescription:
      "Free AI tools. Chat with AI, generate content, analyze data. No signup, instant results.",
    keywords: ["ai tools", "ai chat", "ai assistant", "free ai", "chatgpt alternative"],
  },
  default: {
    tagline: "Powerful free online tool for everyday tasks.",
    description: "Free online tool that helps you get things done quickly and easily.",
    metaTitle: "Free Online Tool - Fast & Easy | Flixo",
    metaDescription:
      "Free online tool. Fast, easy, no signup required. Works directly in your browser.",
    keywords: ["online tool", "free tool", "web tool", "utility"],
  },
};

// Tool name translations (sample - extend as needed)
const TOOL_NAME_TRANSLATIONS = {
  // Translation tools
  translator: {
    ar: "المترجم",
    es: "Traductor",
    fr: "Traducteur",
    de: "Übersetzer",
    pt: "Tradutor",
    it: "Traduttore",
    nl: "Vertaler",
    tr: "Çevirmen",
    ru: "Переводчик",
    pl: "Tłumacz",
    uk: "Перекладач",
    hi: "अनुवादक",
    id: "Penerjemah",
    vi: "Người dịch",
    th: "ล่าม",
    ja: "翻訳者",
    ko: "번역기",
    "zh-CN": "翻译器",
    "zh-TW": "翻譯器",
  },
  "large-text-translator": {
    ar: "مترجم النصوص الكبيرة",
    es: "Traductor de texto grande",
    fr: "Traducteur de texte long",
    de: "Großtext-Übersetzer",
    pt: "Tradutor de texto grande",
    it: "Traduttore di testo lungo",
    nl: "Grote tekst vertaler",
    tr: "Büyük metin çevirmeni",
    ru: "Переводчик больших текстов",
    pl: "Tłumacz dużego tekstu",
    uk: "Перекладач великих текстів",
    hi: "बड़े टेक्स्ट अनुवादक",
    id: "Penerjemah teks besar",
    vi: "Người dịch văn bản lớn",
    th: "ล่ามข้อความยาว",
    ja: "長いテキスト翻訳",
    ko: "긴 텍스트 번역기",
    "zh-CN": "长文本翻译",
    "zh-TW": "長文本翻譯",
  },
  "pdf-translator": {
    ar: "مترجم PDF",
    es: "Traductor de PDF",
    fr: "Traducteur PDF",
    de: "PDF-Übersetzer",
    pt: "Tradutor de PDF",
    it: "Traduttore PDF",
    nl: "PDF vertaler",
    tr: "PDF çevirmeni",
    ru: "PDF переводчик",
    pl: "Tłumacz PDF",
    uk: "PDF перекладач",
    hi: "PDF अनुवादक",
    id: "Penerjemah PDF",
    vi: "Người dịch PDF",
    th: "ล่าม PDF",
    ja: "PDF翻訳",
    ko: "PDF 번역기",
    "zh-CN": "PDF翻译",
    "zh-TW": "PDF翻譯",
  },
  // Image tools
  "image-enhancer": {
    ar: "محسن الصور",
    es: "Mejorador de imágenes",
    fr: "Améliorateur d'images",
    de: "Bildverbesserer",
    pt: "Aprimorador de imagens",
    it: "Miglioratore di immagini",
    nl: "Afbeeldingverbetering",
    tr: "Görsel iyileştirici",
    ru: "Улучшитель изображений",
    pl: "Ulepszacz obrazów",
    uk: "Покращувач зображень",
    hi: "छवि सुधारक",
    id: "Peningkat gambar",
    vi: "Trình cải thiện hình ảnh",
    th: "ตัวปรับปรุงภาพ",
    ja: "画像エンハンサー",
    ko: "이미지 개선기",
    "zh-CN": "图片增强器",
    "zh-TW": "圖片增強器",
  },
  "background-remover": {
    ar: "إزالة الخلفية",
    es: "Eliminafondos",
    fr: "Suppresseur de fond",
    de: "Hintergrund-Entferner",
    pt: "Removedor de fundo",
    it: "Rimuovi sfondo",
    nl: "Achtergrondverwijderaar",
    tr: "Arka plan kaldırıcı",
    ru: "Удаление фона",
    pl: "Usuwanie tła",
    uk: "Видалення тла",
    hi: "पृष्ठभूमि हटाने",
    id: "Penghapus latar",
    vi: "Trình xóa nền",
    th: "ตัวลบพื้นหลัง",
    ja: "背景削除",
    ko: "배경 제거",
    "zh-CN": "背景移除",
    "zh-TW": "背景移除",
  },
  "image-compressor": {
    ar: "ضغط الصور",
    es: "Compresor de imágenes",
    fr: "Compresseur d'images",
    de: "Bildkomprimierer",
    pt: "Compressor de imagens",
    it: "Compressore di immagini",
    nl: "Afbeeldingcompressor",
    tr: "Görsel sıkıştırıcı",
    ru: "Компрессор изображений",
    pl: "Kompresor obrazów",
    uk: "Компресор зображень",
    hi: "छवि संपीड़क",
    id: "Kompresor gambar",
    vi: "Trình nén hình ảnh",
    th: "ตัวบีบอัดภาพ",
    ja: "画像圧縮",
    ko: "이미지 압축",
    "zh-CN": "图片压缩",
    "zh-TW": "圖片壓縮",
  },
  // PDF tools
  "pdf-merger": {
    ar: "دمج PDF",
    es: "Combinador de PDF",
    fr: "Fusionneur de PDF",
    de: "PDF-Zusammenführer",
    pt: "Mesclador de PDF",
    it: "Unisci PDF",
    nl: "PDF-samenvoeger",
    tr: "PDF birleştirici",
    ru: "Объединитель PDF",
    pl: "Łączy PDF",
    uk: "Об'єднувач PDF",
    hi: "PDF मर्जर",
    id: "Penggabung PDF",
    vi: "Trình gộp PDF",
    th: "ตัวรวม PDF",
    ja: "PDFマージ",
    ko: "PDF 병합",
    "zh-CN": "PDF合并",
    "zh-TW": "PDF合併",
  },
  "pdf-splitter": {
    ar: "تقسيم PDF",
    es: "Divisor de PDF",
    fr: "Diviseur de PDF",
    de: "PDF-Teiler",
    pt: "Divisor de PDF",
    it: "Dividi PDF",
    nl: "PDF-verdeler",
    tr: "PDF bölücü",
    ru: "Разделитель PDF",
    pl: "Dzieli PDF",
    uk: "Розділювач PDF",
    hi: "PDF स्प्लिटर",
    id: "Pemisah PDF",
    vi: "Trình chia PDF",
    th: "ตัวแยก PDF",
    ja: "PDF分割",
    ko: "PDF 분할",
    "zh-CN": "PDF分割",
    "zh-TW": "PDF分割",
  },
  // Utility tools
  "password-generator": {
    ar: "مولد كلمات المرور",
    es: "Generador de contraseñas",
    fr: "Générateur de mots de passe",
    de: "Passwort-Generator",
    pt: "Gerador de senhas",
    it: "Generatore di password",
    nl: "Wachtwoordgenerator",
    tr: "Şifre oluşturucu",
    ru: "Генератор паролей",
    pl: "Generator haseł",
    uk: "Генератор паролів",
    hi: "पासवर्ड जनरेटर",
    id: "Generator kata sandi",
    vi: "Trình tạo mật khẩu",
    th: "ตัวสร้างรหัสผ่าน",
    ja: "パスワード生成",
    ko: "비밀번호 생성기",
    "zh-CN": "密码生成器",
    "zh-TW": "密碼產生器",
  },
  "qr-generator": {
    ar: "مولد QR",
    es: "Generador de códigos QR",
    fr: "Générateur de codes QR",
    de: "QR-Code-Generator",
    pt: "Gerador de QR codes",
    it: "Generatore di codici QR",
    nl: "QR-code generator",
    tr: "QR kod oluşturucu",
    ru: "Генератор QR-кодов",
    pl: "Generator kodów QR",
    uk: "Генератор QR-кодів",
    hi: "QR कोड जनरेटर",
    id: "Generator kode QR",
    vi: "Trình tạo mã QR",
    th: "ตัวสร้างรหัส QR",
    ja: "QRコード生成",
    ko: "QR 코드 생성기",
    "zh-CN": "二维码生成",
    "zh-TW": "QR碼產生",
  },
  "base64-encoder": {
    ar: "مشفر Base64",
    es: "Codificador Base64",
    fr: "Encodeur Base64",
    de: "Base64-Encoder",
    pt: "Codificador Base64",
    it: "Codificatore Base64",
    nl: "Base64 encoder",
    tr: "Base64 kodlayıcı",
    ru: "Кодировщик Base64",
    pl: "Koder Base64",
    uk: "Кодувальник Base64",
    hi: "Base64 एनकोडर",
    id: "Enkoder Base64",
    vi: "Trình mã hóa Base64",
    th: "ตัวเข้ารหัส Base64",
    ja: "Base64エンコーダー",
    ko: "Base64 인코더",
    "zh-CN": "Base64编码器",
    "zh-TW": "Base64編碼器",
  },
  "json-formatter": {
    ar: "منسق JSON",
    es: "Formateador JSON",
    fr: "Formateur JSON",
    de: "JSON-Formatierer",
    pt: "Formatador JSON",
    it: "Formattatore JSON",
    nl: "JSON formatter",
    tr: "JSON biçimlendirici",
    ru: "Форматтер JSON",
    pl: "Formater JSON",
    uk: "Форматувальник JSON",
    hi: "JSON फॉर्मेटर",
    id: "Pembangun JSON",
    vi: "Trình định dạng JSON",
    th: "ตัวจัดรูปแบบ JSON",
    ja: "JSONフォーマッター",
    ko: "JSON 포매터",
    "zh-CN": "JSON格式化",
    "zh-TW": "JSON格式化",
  },
  "uuid-generator": {
    ar: "مولد UUID",
    es: "Generador de UUID",
    fr: "Générateur d'UUID",
    de: "UUID-Generator",
    pt: "Gerador de UUID",
    it: "Generatore di UUID",
    nl: "UUID generator",
    tr: "UUID oluşturucu",
    ru: "Генератор UUID",
    pl: "Generator UUID",
    uk: "Генератор UUID",
    hi: "UUID जनरेटर",
    id: "Generator UUID",
    vi: "Trình tạo UUID",
    th: "ตัวสร้าง UUID",
    ja: "UUID生成",
    ko: "UUID 생성기",
    "zh-CN": "UUID生成",
    "zh-TW": "UUID產生",
  },
  "url-encoder": {
    ar: "مشفر URL",
    es: "Codificador de URL",
    fr: "Encodeur d'URL",
    de: "URL-Encoder",
    pt: "Codificador de URL",
    it: "Codificatore URL",
    nl: "URL encoder",
    tr: "URL kodlayıcı",
    ru: "URL-кодировщик",
    pl: "Koder URL",
    uk: "Кодувальник URL",
    hi: "URL एनकोडर",
    id: "Enkoder URL",
    vi: "Trình mã hóa URL",
    th: "ตัวเข้ารหัส URL",
    ja: "URLエンコーダー",
    ko: "URL 인코더",
    "zh-CN": "URL编码器",
    "zh-TW": "URL編碼器",
  },
  "hash-generator": {
    ar: "مولد التجزئة",
    es: "Generador de hash",
    fr: "Générateur de hash",
    de: "Hash-Generator",
    pt: "Gerador de hash",
    it: "Generatore di hash",
    nl: "Hash generator",
    tr: "Hash oluşturucu",
    ru: "Генератор хэша",
    pl: "Generator skrótu",
    uk: "Генератор хешу",
    hi: "हैश जनरेटर",
    id: "Generator hash",
    vi: "Trình tạo hash",
    th: "ตัวสร้างแฮช",
    ja: "ハッシュ生成",
    ko: "해시 생성기",
    "zh-CN": "哈希生成",
    "zh-TW": "雜湊產生",
  },
  "unit-converter": {
    ar: "محول الوحدات",
    es: "Convertidor de unidades",
    fr: "Convertisseur d'unités",
    de: "Einheitenkonverter",
    pt: "Conversor de unidades",
    it: "Convertitore di unità",
    nl: "Eenheidconverter",
    tr: "Birim dönüştürücü",
    ru: "Конвертер единиц",
    pl: "Konwerter jednostek",
    uk: "Конвертер одиниць",
    hi: "इकाई परिवर्तक",
    id: "Konverter satuan",
    vi: "Trình chuyển đổi đơn vị",
    th: "ตัวแปลงหน่วย",
    ja: "単位変換",
    ko: "단위 변환기",
    "zh-CN": "单位转换",
    "zh-TW": "單位轉換",
  },
  "binary-converter": {
    ar: "محول النظام الثنائي",
    es: "Convertidor binario",
    fr: "Convertisseur binaire",
    de: "Binärkonverter",
    pt: "Conversor binário",
    it: "Convertitore binario",
    nl: "Binair converter",
    tr: "İkili dönüştürücü",
    ru: "Двоичный конвертер",
    pl: "Konwerter binarny",
    uk: "Двійковий конвертер",
    hi: "बाइनरी परिवर्तक",
    id: "Konverter biner",
    vi: "Trình chuyển đổi nhị phân",
    th: "ตัวแปลงเลขฐานสอง",
    ja: "二进制変換",
    ko: "바이너리 변환기",
    "zh-CN": "二进制转换",
    "zh-TW": "二進位轉換",
  },
  // AI tools
  "ai-chat": {
    ar: "محادثة الذكاء الاصطناعي",
    es: "Chat de IA",
    fr: "Chat IA",
    de: "KI-Chat",
    pt: "Chat de IA",
    it: "Chat IA",
    nl: "AI chat",
    tr: "AI sohbet",
    ru: "ИИ чат",
    pl: "Czat AI",
    uk: "Чат ШІ",
    hi: "AI चैट",
    id: "Obrolan AI",
    vi: "Trò chuyện AI",
    th: "แชท AI",
    ja: "AIチャット",
    ko: "AI 채팅",
    "zh-CN": "AI聊天",
    "zh-TW": "AI聊天",
  },
  "code-explainer": {
    ar: "مشرح الكود",
    es: "Explicador de código",
    fr: "Explicateur de code",
    de: "Code-Erklärer",
    pt: "Explicador de código",
    it: "Spiegacodice",
    nl: "Code uitlegger",
    tr: "Kod açıklayıcı",
    ru: "Объяснитель кода",
    pl: "Wyjaśniacz kodu",
    uk: "Пояснювач коду",
    hi: "कोड एक्सप्लेनर",
    id: "Penjelas kode",
    vi: "Trình giải thích mã",
    th: "ตัวอธิบายโค้ด",
    ja: "コード説明",
    ko: "코드 설명기",
    "zh-CN": "代码解释",
    "zh-TW": "程式碼說明",
  },
  "prompt-improver": {
    ar: "محسن الأوامر",
    es: "Mejorador de prompts",
    fr: "Améliorateur de prompts",
    de: "Prompt-Verbesserer",
    pt: "Aprimorador de prompts",
    it: "Miglioratore di prompt",
    nl: "Prompt verbetering",
    tr: "Prompt iyileştirici",
    ru: "Улучшитель промптов",
    pl: "Ulepszacz promptów",
    uk: "Покращувач промптів",
    hi: "प्रॉम्प्ट सुधारक",
    id: "Peningkat prompt",
    vi: "Trình cải thiện prompt",
    th: "ตัวปรับปรุงพรอมต์",
    ja: "プロンプト改善",
    ko: "프롬프트 개선기",
    "zh-CN": "提示词优化",
    "zh-TW": "提示詞優化",
  },
};

// Extract all tools from tools.ts
function extractTools() {
  const content = fs.readFileSync(path.join(ROOT, "src/data/tools.ts"), "utf-8");
  const matches = content.matchAll(/t\(\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"/g);
  const tools = [];

  for (const match of matches) {
    const [, id, name, categoryId, description] = match;
    tools.push({ id, name, categoryId, description });
  }

  return tools;
}

// Generate content for a single tool
function generateToolContent(tool, targetLang) {
  const category = tool.categoryId || "default";
  const template = CATEGORY_TRANSLATIONS[category] || CATEGORY_TRANSLATIONS.default;

  // Get localized name
  const englishName = tool.name;
  const localizedName = TOOL_NAME_TRANSLATIONS[tool.id]?.[targetLang] || englishName;

  // Generate slug from id
  const slug = tool.id;

  return {
    id: tool.id,
    slug,
    locale: targetLang,
    toolName: localizedName,
    englishName,
    title: localizedName,
    tagline: template.tagline,
    description: `${localizedName}. ${template.description}`,
    shortDescription: template.tagline,
    metaTitle: `Free ${localizedName} Online - ${template.metaTitle.split(" - ")[1] || template.metaTitle}`,
    metaDescription: `${localizedName}. ${template.metaDescription}`,
    keywords: template.keywords.map((k) => k.replace(/free/gi, "").trim() || k),
    faq: [
      {
        q: `Is ${localizedName} free?`,
        a: "Yes, our tool is completely free to use with no signup required.",
      },
      {
        q: `Is my data secure?`,
        a: "Yes, all processing happens locally in your browser. Your data never leaves your device.",
      },
      {
        q: `Do I need an account?`,
        a: "No, you can use the tool directly without creating an account.",
      },
    ],
    breadcrumb: ["Home", "Tools", englishName],
    canonical: `/tools/${slug}`,
    hreflangs: LANGUAGES.map((l) => ({
      lang: l.code,
      url: `/${l.code}/tools/${slug}`,
    })),
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: localizedName,
      description: `${localizedName}. ${template.description}`,
      url: `https://flixotools.com/tools/${slug}`,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      inLanguage: targetLang,
    },
    openGraph: {
      title: `Free ${localizedName} - Flixo`,
      description: `${localizedName}. ${template.description}`,
      url: `https://flixotools.com/tools/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Free ${localizedName} - Flixo`,
      description: `${localizedName}. ${template.description}`,
    },
  };
}

// Main generation function
async function generateAllContent() {
  console.log("🚀 Flixo Complete Content Generator\n");

  // Extract all tools
  const tools = extractTools();
  console.log(`📊 Found ${tools.length} tools in registry\n`);

  // Ensure content directory exists
  const contentDir = path.join(ROOT, "content");
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  // Generate content for each language
  let totalFiles = 0;
  let sitemapEntries = [];

  for (const lang of LANGUAGES) {
    console.log(`🌍 Generating ${lang.name} (${lang.code})...`);

    // Ensure language directory exists
    const langDir = path.join(contentDir, lang.code);
    if (!fs.existsSync(langDir)) {
      fs.mkdirSync(langDir, { recursive: true });
    }

    let langFiles = 0;
    for (const tool of tools) {
      const content = generateToolContent(tool, lang.code);
      const filePath = path.join(langDir, `${tool.id}.json`);
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
      langFiles++;
      totalFiles++;

      // Add to sitemap
      sitemapEntries.push({
        loc: `https://flixotools.com/${lang.code}/tools/${tool.id}`,
        lastmod: new Date().toISOString().split("T")[0],
        changefreq: "weekly",
        priority: 0.8,
        hreflang: LANGUAGES.map((l) => ({
          lang: l.code,
          href: `https://flixotools.com/${l.code}/tools/${tool.id}`,
        })),
      });
    }
    console.log(`  ✅ Generated ${langFiles} files`);
  }

  // Write sitemap
  console.log("\n📋 Generating sitemap...");
  fs.writeFileSync(path.join(contentDir, "sitemap.json"), JSON.stringify(sitemapEntries, null, 2));
  console.log(`  ✅ Generated ${sitemapEntries.length} sitemap entries`);

  // Write hreflangs
  console.log("\n🏷️  Generating hreflangs...");
  const hreflangs = {};
  for (const tool of tools) {
    hreflangs[tool.id] = LANGUAGES.map((l) => ({
      lang: l.code,
      url: `/${l.code}/tools/${tool.id}`,
    }));
  }
  fs.writeFileSync(path.join(contentDir, "hreflangs.json"), JSON.stringify(hreflangs, null, 2));
  console.log(`  ✅ Generated hreflangs for ${Object.keys(hreflangs).length} tools`);

  // Summary
  console.log("\n✅ COMPLETE!");
  console.log(`📊 Total files: ${totalFiles}`);
  console.log(`🛠️  Tools localized: ${tools.length}`);
  console.log(`🌍 Languages: ${LANGUAGES.length}`);
  console.log(`📄 Sitemap entries: ${sitemapEntries.length}`);

  return { totalFiles, toolsCount: tools.length, languages: LANGUAGES.length };
}

// Run
generateAllContent().catch(console.error);
