#!/usr/bin/env node
/**
 * Automated Content Generator for Flixo
 * 
 * Generates localized content for all 20 languages and all tools.
 * 
 * Usage:
 *   node src/scripts/generate-localized-content.mjs
 *   node src/scripts/generate-localized-content.mjs --tool password-generator
 *   node src/scripts/generate-localized-content.mjs --lang es fr
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "../..");

// Supported languages
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

// Sample tools for generation (in real implementation, this would come from tools.ts)
const SAMPLE_TOOLS = [
  { slug: "password-generator", category: "utility", type: "generator" },
  { slug: "qr-generator", category: "utility", type: "generator" },
  { slug: "base64-encoder", category: "utility", type: "encoder" },
  { slug: "url-encoder", category: "utility", type: "encoder" },
  { slug: "json-formatter", category: "utility", type: "formatter" },
  { slug: "uuid-generator", category: "utility", type: "generator" },
  { slug: "hash-generator", category: "utility", type: "generator" },
  { slug: "color-converter", category: "utility", type: "converter" },
  { slug: "unit-converter", category: "utility", type: "converter" },
  { slug: "binary-converter", category: "utility", type: "converter" },
];

// Tool type descriptions for natural localization
const TOOL_DESCRIPTIONS = {
  generator: {
    en: {
      tagline: "Generate secure passwords instantly with customizable options.",
      description: "A free online password generator that helps you create strong, secure passwords instantly. No signup required, works in your browser.",
      metaTitle: "Free Password Generator Online - Generate Secure Passwords Instantly | Flixo",
      metaDescription: "Use our free password generator tool. Create strong, secure passwords with customizable options. No signup, no fees, instant results.",
      keywords: ["password generator", "free password generator", "secure password", "random password", "password creator"],
      faq: [
        { q: "Is this password generator free?", a: "Yes, our password generator is completely free to use with no signup required." },
        { q: "Is the generated password secure?", a: "Yes, our tool generates cryptographically secure passwords using modern algorithms." },
        { q: "Can I customize the password?", a: "Yes, you can customize length, characters, and other options." },
      ],
      breadcrumb: ["Home", "Tools", "Utility Tools", "Password Generator"],
    },
  },
  encoder: {
    en: {
      tagline: "Encode and decode data quickly and accurately.",
      description: "A free online encoder tool that lets you encode and decode data instantly. No server upload, your data stays private.",
      metaTitle: "Free Base64 Encoder Online - Encode/Decode Instantly | Flixo",
      metaDescription: "Use our free encoder tool. Encode or decode data instantly. No signup, no upload, 100% private.",
      keywords: ["base64 encoder", "encode base64", "decode base64", "free encoder", "online encoder"],
      faq: [
        { q: "Is my data secure?", a: "Yes, all encoding happens in your browser. Your data never leaves your device." },
        { q: "Is this encoder free?", a: "Yes, completely free with no signup required." },
        { q: "Can I decode data back?", a: "Yes, use the decode function to reverse the encoding." },
      ],
      breadcrumb: ["Home", "Tools", "Utility Tools", "Base64 Encoder"],
    },
  },
  formatter: {
    en: {
      tagline: "Format and validate data with syntax highlighting.",
      description: "A free online formatter tool that formats, validates, and pretty-prints data. Instant validation with error detection.",
      metaTitle: "Free JSON Formatter Online - Format & Validate Instantly | Flixo",
      metaDescription: "Use our free JSON formatter tool. Format, validate, and beautify JSON. Instant validation, error detection, no signup.",
      keywords: ["json formatter", "format json", "validate json", "pretty print json", "json beautifier"],
      faq: [
        { q: "Does this validate JSON?", a: "Yes, it validates your JSON and highlights any errors." },
        { q: "Can I minify JSON?", a: "Yes, use the minify option to compress JSON." },
        { q: "Is my data uploaded?", a: "No, all processing happens locally in your browser." },
      ],
      breadcrumb: ["Home", "Tools", "Utility Tools", "JSON Formatter"],
    },
  },
  converter: {
    en: {
      tagline: "Convert between different formats quickly and accurately.",
      description: "A free online converter tool that converts data between different formats. Fast, accurate, and works entirely in your browser.",
      metaTitle: "Free Unit Converter Online - Convert Units Instantly | Flixo",
      metaDescription: "Use our free unit converter tool. Convert between units instantly with high accuracy. No signup, no upload, works offline.",
      keywords: ["unit converter", "convert units", "measurement converter", "free converter", "online converter"],
      faq: [
        { q: "What formats are supported?", a: "We support all major formats. Check the tool for full list." },
        { q: "Is this converter free?", a: "Yes, completely free with no signup required." },
        { q: "Is my data secure?", a: "Yes, all conversions happen locally in your browser." },
      ],
      breadcrumb: ["Home", "Tools", "Utility Tools", "Unit Converter"],
    },
  },
};

// Natural translations for tool names (demonstrative - in production, use professional translations)
const TOOL_NAME_TRANSLATIONS = {
  "password-generator": {
    en: "Password Generator",
    ar: "مولد كلمات المرور",
    es: "Generador de contraseñas",
    fr: "Générateur de mots de passe",
    de: "Passwort-Generator",
    pt: "Gerador de senhas",
    it: "Generatore di password",
    nl: "Wachtwoordgenerator",
    tr: "Şifre Üretici",
    ru: "Генератор паролей",
    pl: "Generator haseł",
    uk: "Генератор паролів",
    hi: "पासवर्ड जनरेटर",
    id: "Generator kata sandi",
    vi: "Trình tạo mật khẩu",
    th: "ตัวสร้างรหัสผ่าน",
    ja: "パスワード生成ツール",
    ko: "비밀번호 생성기",
    "zh-CN": "密码生成器",
    "zh-TW": "密碼產生器",
  },
  "qr-generator": {
    en: "QR Code Generator",
    ar: "مولد رموز QR",
    es: "Generador de códigos QR",
    fr: "Générateur de codes QR",
    de: "QR-Code-Generator",
    pt: "Gerador de QR codes",
    it: "Generatore di codici QR",
    nl: "QR-code generator",
    tr: "QR Kod Üretici",
    ru: "Генератор QR-кодов",
    pl: "Generator kodów QR",
    uk: "Генератор QR-кодів",
    hi: "QR कोड जनरेटर",
    id: "Generator kode QR",
    vi: "Trình tạo mã QR",
    th: "ตัวสร้างรหัส QR",
    ja: "QRコード生成ツール",
    ko: "QR 코드 생성기",
    "zh-CN": "二维码生成器",
    "zh-TW": "QR碼產生器",
  },
  "base64-encoder": {
    en: "Base64 Encoder",
    ar: "مشفر Base64",
    es: "Codificador Base64",
    fr: "Encodeur Base64",
    de: "Base64-Encoder",
    pt: "Codificador Base64",
    it: "Codificatore Base64",
    nl: "Base64 encoder",
    tr: "Base64 Kodlayıcı",
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
  "url-encoder": {
    en: "URL Encoder",
    ar: "مشفر الروابط",
    es: "Codificador de URL",
    fr: "Encodeur d'URL",
    de: "URL-Encoder",
    pt: "Codificador de URL",
    it: "Codificatore URL",
    nl: "URL encoder",
    tr: "URL Kodlayıcı",
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
  "json-formatter": {
    en: "JSON Formatter",
    ar: "منسق JSON",
    es: "Formateador JSON",
    fr: "Formateur JSON",
    de: "JSON-Formatierer",
    pt: "Formatador JSON",
    it: "Formattatore JSON",
    nl: "JSON formatter",
    tr: "JSON Biçimlendirici",
    ru: "Форматтер JSON",
    pl: "Formater JSON",
    uk: "Форматувальник JSON",
    hi: "JSON फॉर्मेटर",
    id: "Pembangun JSON",
    vi: "Trình định dạng JSON",
    th: "ตัวจัดรูปแบบ JSON",
    ja: "JSONフォーマッター",
    ko: "JSON 포매터",
    "zh-CN": "JSON格式化器",
    "zh-TW": "JSON格式化工具",
  },
  "uuid-generator": {
    en: "UUID Generator",
    ar: "مولد UUID",
    es: "Generador de UUID",
    fr: "Générateur d'UUID",
    de: "UUID-Generator",
    pt: "Gerador de UUID",
    it: "Generatore di UUID",
    nl: "UUID generator",
    tr: "UUID Üretici",
    ru: "Генератор UUID",
    pl: "Generator UUID",
    uk: "Генератор UUID",
    hi: "UUID जनरेटर",
    id: "Generator UUID",
    vi: "Trình tạo UUID",
    th: "ตัวสร้าง UUID",
    ja: "UUID生成ツール",
    ko: "UUID 생성기",
    "zh-CN": "UUID生成器",
    "zh-TW": "UUID產生器",
  },
  "hash-generator": {
    en: "Hash Generator",
    ar: "مولد التجزئة",
    es: "Generador de hash",
    fr: "Générateur de hash",
    de: "Hash-Generator",
    pt: "Gerador de hash",
    it: "Generatore di hash",
    nl: "Hash generator",
    tr: "Hash Üretici",
    ru: "Генератор хэша",
    pl: "Generator skrótu",
    uk: "Генератор хешу",
    hi: "हैश जनरेटर",
    id: "Generator hash",
    vi: "Trình tạo hash",
    th: "ตัวสร้างแฮช",
    ja: "ハッシュ生成ツール",
    ko: "해시 생성기",
    "zh-CN": "哈希生成器",
    "zh-TW": "雜湊產生器",
  },
  "color-converter": {
    en: "Color Converter",
    ar: "محول الألوان",
    es: "Convertidor de color",
    fr: "Convertisseur de couleur",
    de: "Farbkonverter",
    pt: "Conversor de cor",
    it: "Convertitore di colore",
    nl: "Kleurconverter",
    tr: "Renk Dönüştürücü",
    ru: "Конвертер цветов",
    pl: "Konwerter kolorów",
    uk: "Конвертер кольорів",
    hi: "रंग परिवर्तक",
    id: "Konverter warna",
    vi: "Trình chuyển đổi màu",
    th: "ตัวแปลงสี",
    ja: "カラーコンバーター",
    ko: "색상 변환기",
    "zh-CN": "颜色转换器",
    "zh-TW": "顏色轉換器",
  },
  "unit-converter": {
    en: "Unit Converter",
    ar: "محول الوحدات",
    es: "Convertidor de unidades",
    fr: "Convertisseur d'unités",
    de: "Einheitenkonverter",
    pt: "Conversor de unidades",
    it: "Convertitore di unità",
    nl: "Eenheidconverter",
    tr: "Birim Dönüştürücü",
    ru: "Конвертер единиц",
    pl: "Konwerter jednostek",
    uk: "Конвертер одиниць",
    hi: "इकाई परिवर्तक",
    id: "Konverter satuan",
    vi: "Trình chuyển đổi đơn vị",
    th: "ตัวแปลงหน่วย",
    ja: "単位変換ツール",
    ko: "단위 변환기",
    "zh-CN": "单位转换器",
    "zh-TW": "單位轉換器",
  },
  "binary-converter": {
    en: "Binary Converter",
    ar: "محول النظام الثنائي",
    es: "Convertidor binario",
    fr: "Convertisseur binaire",
    de: "Binärkonverter",
    pt: "Conversor binário",
    it: "Convertitore binario",
    nl: "Binair converter",
    tr: "İkili Dönüştürücü",
    ru: "Двоичный конвертер",
    pl: "Konwerter binarny",
    uk: "Двійковий конвертер",
    hi: "बाइनरी परिवर्तक",
    id: "Konverter biner",
    vi: "Trình chuyển đổi nhị phân",
    th: "ตัวแปลงเลขฐานสอง",
    ja: "二进制转换器",
    ko: "바이너리 변환기",
    "zh-CN": "二进制转换器",
    "zh-TW": "二進位轉換器",
  },
};

/**
 * Generate localized content for a tool
 */
function generateToolContent(slug, type, targetLang) {
  const template = TOOL_DESCRIPTIONS[type]?.en || TOOL_DESCRIPTIONS.generator.en;
  const translatedName = TOOL_NAME_TRANSLATIONS[slug]?.[targetLang] || TOOL_NAME_TRANSLATIONS[slug]?.en || slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const englishName = TOOL_NAME_TRANSLATIONS[slug]?.en || slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  
  // Generate localized content
  const localizedContent = {
    slug,
    locale: targetLang,
    toolName: translatedName,
    englishName: englishName,
    title: translatedName,
    tagline: template.tagline.replace(/{toolNameLower}/g, englishName.toLowerCase()),
    description: template.description.replace(/{toolName}/g, translatedName).replace(/{toolNameLower}/g, englishName.toLowerCase()),
    metaTitle: template.metaTitle.replace(/{toolName}/g, translatedName).replace(/{toolNameLower}/g, englishName.toLowerCase()),
    metaDescription: template.metaDescription.replace(/{toolName}/g, translatedName).replace(/{toolNameLower}/g, englishName.toLowerCase()),
    keywords: template.keywords.map(k => k.replace(/{toolNameLower}/g, englishName.toLowerCase())),
    faq: template.faq.map(item => ({
      q: item.q.replace(/{toolNameLower}/g, englishName.toLowerCase()),
      a: item.a.replace(/{toolNameLower}/g, englishName.toLowerCase()),
    })),
    breadcrumb: template.breadcrumb.map(b => b.replace(/{toolName}/g, translatedName)),
    canonical: `/tools/${slug}`,
    hreflangs: LANGUAGES.map(l => ({
      lang: l.code,
      url: `/${l.code}/tools/${slug}`,
    })),
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: translatedName,
      description: template.description.replace(/{toolName}/g, translatedName).replace(/{toolNameLower}/g, englishName.toLowerCase()),
      url: `https://flixotools.com/tools/${slug}`,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      inLanguage: targetLang,
    },
    openGraph: {
      title: template.metaTitle.replace(/{toolName}/g, translatedName).replace(/{toolNameLower}/g, englishName.toLowerCase()),
      description: template.metaDescription.replace(/{toolName}/g, translatedName).replace(/{toolNameLower}/g, englishName.toLowerCase()),
      url: `https://flixotools.com/tools/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: template.metaTitle.replace(/{toolName}/g, translatedName).replace(/{toolNameLower}/g, englishName.toLowerCase()),
      description: template.metaDescription.replace(/{toolName}/g, translatedName).replace(/{toolNameLower}/g, englishName.toLowerCase()),
    },
  };
  
  return localizedContent;
}

/**
 * Generate sitemap entries for a tool across all languages
 */
function generateSitemapEntries(slug) {
  const entries = [];
  
  for (const lang of LANGUAGES) {
    entries.push({
      loc: `https://flixotools.com/${lang.code}/tools/${slug}`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "weekly",
      priority: 0.8,
      hreflang: LANGUAGES.map(l => ({
        lang: l.code,
        href: `https://flixotools.com/${l.code}/tools/${slug}`,
      })),
    });
  }
  
  return entries;
}

/**
 * Generate hreflang tags for a tool
 */
function generateHreflangTags(slug) {
  const tags = [`<link rel="alternate" hreflang="x-default" href="https://flixotools.com/tools/${slug}" />`];
  
  for (const lang of LANGUAGES) {
    tags.push(`<link rel="alternate" hreflang="${lang.code}" href="https://flixotools.com/${lang.code}/tools/${slug}" />`);
  }
  
  return tags.join("\n");
}

/**
 * Main generation function
 */
async function generateAllContent(options = {}) {
  const { tools = SAMPLE_TOOLS, languages = LANGUAGES, outputDir = path.join(ROOT, "content") } = options;
  
  console.log("🚀 Starting content generation...\n");
  console.log(`📁 Output directory: ${outputDir}`);
  console.log(`🌍 Languages: ${languages.length}`);
  console.log(`🛠️  Tools: ${tools.length}\n`);
  
  const stats = {
    files: 0,
    tools: 0,
    languages: 0,
    errors: [],
  };
  
  // Generate content for each tool and language
  for (const tool of tools) {
    for (const lang of languages) {
      try {
        const content = generateToolContent(tool.slug, tool.type, lang.code);
        
        // Create output path
        const outputPath = path.join(outputDir, lang.code, `${tool.slug}.json`);
        
        // Ensure directory exists
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        
        // Write content
        fs.writeFileSync(outputPath, JSON.stringify(content, null, 2));
        
        stats.files++;
      } catch (error) {
        stats.errors.push({ tool: tool.slug, lang: lang.code, error: error.message });
      }
    }
    stats.tools++;
  }
  
  // Generate sitemap entries
  console.log("\n📋 Generating sitemap entries...");
  const sitemapEntries = [];
  for (const tool of tools) {
    sitemapEntries.push(...generateSitemapEntries(tool.slug));
  }
  
  // Write sitemap
  const sitemapPath = path.join(outputDir, "sitemap.json");
  fs.writeFileSync(sitemapPath, JSON.stringify(sitemapEntries, null, 2));
  
  // Generate hreflang tags for each tool
  console.log("🏷️  Generating hreflang tags...");
  const hreflangMap = {};
  for (const tool of tools) {
    hreflangMap[tool.slug] = generateHreflangTags(tool.slug);
  }
  
  const hreflangPath = path.join(outputDir, "hreflangs.json");
  fs.writeFileSync(hreflangPath, JSON.stringify(hreflangMap, null, 2));
  
  // Print summary
  console.log("\n✅ Generation complete!");
  console.log(`📊 Files created: ${stats.files}`);
  console.log(`🛠️  Tools processed: ${stats.tools}`);
  console.log(`🌍 Languages covered: ${languages.length}`);
  
  if (stats.errors.length > 0) {
    console.log(`\n⚠️  Errors: ${stats.errors.length}`);
    for (const err of stats.errors) {
      console.log(`  - ${err.tool} (${err.lang}): ${err.error}`);
    }
  }
  
  return stats;
}

// CLI interface
const args = process.argv.slice(2);
const options = {};

if (args.includes("--help") || args.includes("-h")) {
  console.log(`
Flixo Content Generator
======================

Usage:
  node generate-localized-content.mjs [options]

Options:
  --tool <slug>    Generate content for specific tool only
  --lang <codes>   Generate content for specific languages (comma-separated)
  --all           Generate all content (default)
  --help, -h      Show this help message

Examples:
  node generate-localized-content.mjs
  node generate-localized-content.mjs --tool password-generator
  node generate-localized-content.mjs --lang en es fr
  `);
  process.exit(0);
}

generateAllContent(options);
