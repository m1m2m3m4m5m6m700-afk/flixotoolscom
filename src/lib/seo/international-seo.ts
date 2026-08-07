/**
 * International SEO utilities for Flixo
 * Handles hreflang, sitemaps, canonical URLs, and metadata for all 20 languages
 */
import { LOCALES, type LocaleCode, localeMeta, DEFAULT_LOCALE } from "../i18n";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://flixotools.com";

/**
 * Generate hreflang tags for a page
 */
export function generateHreflangTags(path: string): string {
  const tags: string[] = [];

  // Add x-default for the default locale
  tags.push(`<link rel="alternate" hreflang="x-default" href="${BASE_URL}${path}" />`);

  // Add hreflang for each supported language
  for (const locale of LOCALES) {
    const href = `${BASE_URL}/${locale.code}${path}`;
    tags.push(`<link rel="alternate" hreflang="${locale.hreflang}" href="${href}" />`);
  }

  // Add self-referencing hreflang (already included above for default)
  return tags.join("\n");
}

/**
 * Generate alternate URLs for all languages
 */
export function generateAlternateUrls(path: string): Array<{
  locale: LocaleCode;
  url: string;
  label: string;
}> {
  return LOCALES.map((locale) => ({
    locale: locale.code,
    url: `${BASE_URL}/${locale.code}${path}`,
    label: locale.label,
  }));
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path: string, locale?: LocaleCode): string {
  // For default locale, use root path without language prefix
  if (locale === DEFAULT_LOCALE || !locale) {
    return `${BASE_URL}${path}`;
  }
  return `${BASE_URL}/${locale}${path}`;
}

/**
 * Generate JSON-LD for international pages
 */
export function generateInternationalJsonLd(path: string, locale: LocaleCode) {
  const meta = localeMeta(locale);
  const alternates = generateAlternateUrls(path);

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Flixo",
    url: BASE_URL,
    description: "One workspace for every AI tool",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    inLanguage: meta.hreflang,
    availableLanguage: LOCALES.map((l) => l.hreflang),
    alternateName: alternates.map((a) => ({
      "@type": "Language",
      name: a.label,
      alternateName: a.locale,
    })),
  };
}

/**
 * Generate breadcrumb JSON-LD
 */
export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
  locale: LocaleCode,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate Open Graph tags for international SEO
 */
export function generateOpenGraphTags(
  path: string,
  title: string,
  description: string,
  locale: LocaleCode,
  image?: string,
) {
  const meta = localeMeta(locale);
  const url = `${BASE_URL}/${locale}${path}`;

  return {
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogLocale: meta.hreflang,
    ogSiteName: "Flixo",
    ogImage: image || `${BASE_URL}/og-image.png`,
    ogType: "website" as const,
  };
}

/**
 * Generate Twitter Card tags
 */
export function generateTwitterCardTags(title: string, description: string, image?: string) {
  return {
    twitterCard: "summary_large_image" as const,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image || `${BASE_URL}/og-image.png`,
    twitterSite: "@flixotools",
  };
}

/**
 * Generate meta robots with language-specific directives
 */
export function generateRobotsMeta(locale: LocaleCode, isIndexable: boolean = true) {
  if (!isIndexable) {
    return { robots: "noindex, nofollow" };
  }

  // For all languages, allow indexing
  return { robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" };
}

/**
 * Generate sitemap URL entry
 */
export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
  hreflang?: Array<{
    lang: string;
    href: string;
  }>;
}

export function generateSitemapUrl(
  path: string,
  lastmod?: string,
  changefreq: SitemapUrl["changefreq"] = "weekly",
  priority: number = 0.5,
): SitemapUrl {
  const url: SitemapUrl = {
    loc: `${BASE_URL}${path}`,
    lastmod,
    changefreq,
    priority,
  };

  // Add hreflang alternatives
  url.hreflang = LOCALES.map((locale) => ({
    lang: locale.hreflang,
    href: `${BASE_URL}/${locale.code}${path}`,
  }));

  // Add x-default
  url.hreflang.unshift({
    lang: "x-default",
    href: `${BASE_URL}${path}`,
  });

  return url;
}

/**
 * Generate sitemap index entry
 */
export interface SitemapIndexEntry {
  loc: string;
  lastmod: string;
}

export function generateSitemapIndexEntry(locale: LocaleCode, lastmod: string): SitemapIndexEntry {
  if (locale === DEFAULT_LOCALE) {
    return { loc: `${BASE_URL}/sitemap.xml`, lastmod };
  }
  return { loc: `${BASE_URL}/sitemap-${locale}.xml`, lastmod };
}

/**
 * Generate robots.txt content with language-specific directives
 */
export function generateRobotsTxt() {
  const rules: string[] = [
    "# Flixo Robots.txt",
    "# Generated for international SEO",
    "",
    "User-agent: *",
    "Allow: /",
    "",
    `# Sitemap locations for all ${LOCALES.length} languages`,
  ];

  // Add sitemap index
  rules.push(`Sitemap: ${BASE_URL}/sitemap-index.xml`);

  // Add individual language sitemaps
  for (const locale of LOCALES) {
    if (locale.code === DEFAULT_LOCALE) {
      rules.push(`Sitemap: ${BASE_URL}/sitemap.xml`);
    } else {
      rules.push(`Sitemap: ${BASE_URL}/sitemap-${locale.code}.xml`);
    }
  }

  return rules.join("\n");
}

/**
 * Get language from Accept-Language header
 */
export function parseAcceptLanguage(header: string): LocaleCode {
  const languages = header.split(",").map((lang) => {
    const [code, qValue] = lang.trim().split(";q=");
    return {
      code: code.trim().toLowerCase(),
      q: qValue ? parseFloat(qValue) : 1,
    };
  });

  // Sort by quality value
  languages.sort((a, b) => b.q - a.q);

  // Find matching locale
  for (const { code } of languages) {
    // Try exact match first
    const exactMatch = LOCALES.find((l) => l.code.toLowerCase() === code);
    if (exactMatch) return exactMatch.code;

    // Try language-only match (e.g., "zh" matches "zh-CN")
    const langOnly = code.split("-")[0];
    const partialMatch = LOCALES.find((l) => l.code.toLowerCase().startsWith(langOnly));
    if (partialMatch) return partialMatch.code;
  }

  return DEFAULT_LOCALE;
}

/**
 * Check if a path is valid for a given locale
 */
export function isValidPathForLocale(path: string, locale: LocaleCode): boolean {
  // Remove leading slash
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // Default locale should not have language prefix
  if (locale === DEFAULT_LOCALE) {
    return !cleanPath.startsWith("en/");
  }

  // Other locales must have language prefix
  return cleanPath.startsWith(`${locale}/`);
}

/**
 * Strip language prefix from path
 */
export function stripLanguagePrefix(path: string): string {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // Check if starts with any supported language code
  for (const locale of LOCALES) {
    if (cleanPath.startsWith(`${locale.code}/`)) {
      return "/" + cleanPath.slice(locale.code.length + 1);
    }
  }

  return path;
}

/**
 * Add language prefix to path
 */
export function addLanguagePrefix(path: string, locale: LocaleCode): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  if (locale === DEFAULT_LOCALE) {
    return cleanPath;
  }

  return `/${locale}${cleanPath}`;
}

/**
 * Generate complete SEO metadata for a page
 */
export interface PageSeoMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonical: string;
  hreflang: string;
  alternateUrls: Array<{ locale: LocaleCode; url: string; label: string }>;
  og: ReturnType<typeof generateOpenGraphTags>;
  twitter: ReturnType<typeof generateTwitterCardTags>;
  robots: ReturnType<typeof generateRobotsMeta>;
  jsonLd: ReturnType<typeof generateInternationalJsonLd>;
}

export function generatePageSeoMetadata(
  path: string,
  title: string,
  description: string,
  locale: LocaleCode,
  keywords?: string[],
): PageSeoMetadata {
  const canonical = generateCanonicalUrl(path, locale);
  const hreflang = generateHreflangTags(path);
  const alternateUrls = generateAlternateUrls(path);
  const og = generateOpenGraphTags(path, title, description, locale);
  const twitter = generateTwitterCardTags(title, description);
  const robots = generateRobotsMeta(locale);
  const jsonLd = generateInternationalJsonLd(path, locale);

  return {
    title,
    description,
    keywords,
    canonical,
    hreflang,
    alternateUrls,
    og,
    twitter,
    robots,
    jsonLd,
  };
}
