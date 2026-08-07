/**
 * Sitemap generator for Flixo
 * Generates language-specific sitemaps and sitemap index
 */
import { LOCALES, type LocaleCode, DEFAULT_LOCALE } from "../i18n";
import {
  generateSitemapUrl,
  generateSitemapIndexEntry,
  type SitemapUrl,
  type SitemapIndexEntry,
} from "./international-seo";
import { tools } from "../../data/tools";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://flixotools.com";

/**
 * Static pages that don't require tool-specific content
 */
const STATIC_PAGES = [
  { path: "/", priority: 1.0, changefreq: "daily" as const },
  { path: "/tools", priority: 0.9, changefreq: "daily" as const },
  { path: "/categories", priority: 0.8, changefreq: "weekly" as const },
  { path: "/collections", priority: 0.7, changefreq: "weekly" as const },
  { path: "/compare", priority: 0.6, changefreq: "monthly" as const },
  { path: "/use-cases", priority: 0.6, changefreq: "weekly" as const },
  { path: "/blog", priority: 0.7, changefreq: "daily" as const },
  { path: "/changelog", priority: 0.5, changefreq: "weekly" as const },
  { path: "/contact", priority: 0.5, changefreq: "monthly" as const },
  { path: "/about", priority: 0.5, changefreq: "monthly" as const },
  { path: "/privacy", priority: 0.3, changefreq: "yearly" as const },
  { path: "/terms", priority: 0.3, changefreq: "yearly" as const },
];

/**
 * Get all tool slugs
 */
function getToolSlugs(): string[] {
  return tools
    .filter((tool) => tool.slug && tool.status === "ready")
    .map((tool) => `/tools/${tool.slug}`);
}

/**
 * Get all category pages
 */
const CATEGORIES = [
  "translation-tools",
  "image-tools",
  "pdf-tools",
  "writing-tools",
  "video-tools",
  "audio-tools",
  "ai-tools",
  "file-types",
  "developer-tools",
  "data-tools",
  "text-tools",
  "conversion-tools",
  "utility-tools",
  "education-tools",
  "finance-tools",
  "health-tools",
  "marketing-tools",
  "seo-tools",
  "social-media-tools",
  "ecommerce-tools",
];

/**
 * Generate sitemap URLs for all pages
 */
export function generateAllSitemapUrls(): SitemapUrl[] {
  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().split("T")[0];

  // Add static pages
  for (const page of STATIC_PAGES) {
    urls.push(generateSitemapUrl(page.path, today, page.changefreq, page.priority));
  }

  // Add tool pages
  const toolSlugs = getToolSlugs();
  for (const slug of toolSlugs) {
    urls.push(generateSitemapUrl(slug, today, "weekly", 0.8));
  }

  // Add category pages
  for (const category of CATEGORIES) {
    urls.push(generateSitemapUrl(`/categories/${category}`, today, "weekly", 0.7));
  }

  return urls;
}

/**
 * Generate XML for a single sitemap
 */
export function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlEntries = urls
    .map((url) => {
      let entry = `  <url>`;
      entry += `<loc>${escapeXml(url.loc)}</loc>`;

      if (url.lastmod) {
        entry += `<lastmod>${url.lastmod}</lastmod>`;
      }

      if (url.changefreq) {
        entry += `<changefreq>${url.changefreq}</changefreq>`;
      }

      if (url.priority !== undefined) {
        entry += `<priority>${url.priority.toFixed(1)}</priority>`;
      }

      // Add hreflang alternatives
      if (url.hreflang) {
        for (const hreflang of url.hreflang) {
          entry += `<xhtml:link rel="alternate" hreflang="${hreflang.lang}" href="${escapeXml(hreflang.href)}"/>`;
        }
      }

      entry += `</url>`;
      return entry;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`;
}

/**
 * Generate sitemap index XML
 */
export function generateSitemapIndexXml(entries: SitemapIndexEntry[]): string {
  const sitemapEntries = entries
    .map((entry) => {
      return `  <sitemap>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
  </sitemap>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;
}

/**
 * Generate language-specific sitemap
 */
export function generateLanguageSitemap(locale: LocaleCode): string {
  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().split("T")[0];
  const pathPrefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  // Add static pages with language prefix
  for (const page of STATIC_PAGES) {
    urls.push({
      ...generateSitemapUrl(`${pathPrefix}${page.path}`, today, page.changefreq, page.priority),
      hreflang: undefined, // Language-specific sitemaps don't need hreflang
    });
  }

  // Add tool pages with language prefix
  const toolSlugs = getToolSlugs();
  for (const slug of toolSlugs) {
    urls.push({
      ...generateSitemapUrl(`${pathPrefix}${slug}`, today, "weekly", 0.8),
      hreflang: undefined,
    });
  }

  // Add category pages with language prefix
  for (const category of CATEGORIES) {
    urls.push({
      ...generateSitemapUrl(`${pathPrefix}/categories/${category}`, today, "weekly", 0.7),
      hreflang: undefined,
    });
  }

  return generateSitemapXml(urls);
}

/**
 * Generate all sitemap indices
 */
export function generateAllSitemaps(): { index: string; sitemaps: Map<LocaleCode, string> } {
  const today = new Date().toISOString().split("T")[0];

  // Generate sitemap index entries
  const indexEntries: SitemapIndexEntry[] = [];

  for (const locale of LOCALES) {
    indexEntries.push(generateSitemapIndexEntry(locale.code, today));
  }

  // Generate individual sitemaps
  const sitemaps = new Map<LocaleCode, string>();
  for (const locale of LOCALES) {
    sitemaps.set(locale.code, generateLanguageSitemap(locale.code));
  }

  return {
    index: generateSitemapIndexXml(indexEntries),
    sitemaps,
  };
}

/**
 * Escape XML special characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxtContent(): string {
  const lines = [
    "# Flixo Robots.txt",
    "# International SEO optimized",
    "",
    "User-agent: *",
    "Allow: /",
    "",
    "# Crawl-delay for polite crawling",
    "Crawl-delay: 1",
    "",
  ];

  // Add sitemap references
  lines.push("# Sitemap locations");
  lines.push(`Sitemap: ${BASE_URL}/sitemap-index.xml`);
  lines.push("");

  // Block common non-content paths
  lines.push("# Block common non-content paths");
  lines.push("Disallow: /api/");
  lines.push("Disallow: /_next/");
  lines.push("Disallow: /admin/");
  lines.push("Disallow: /private/");
  lines.push("");

  return lines.join("\n");
}
