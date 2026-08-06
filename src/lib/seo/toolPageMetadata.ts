import { getToolSeo, type ToolSeoData } from "@/data/toolSeo";
import {
  DEFAULT_ROBOTS,
  SITE_NAME,
  SITE_TWITTER_HANDLE,
  getDefaultOgImageUrl,
  getToolCanonicalUrl,
  stripQueryAndHash,
} from "./site";

export interface SeoMetaTag {
  title?: string;
  name?: string;
  property?: string;
  content?: string;
  charSet?: string;
}

export interface ResolvedPageSeo {
  title: string;
  description: string;
  keywords: string[];
  robots: string;
  pageUrl: string;
  canonicalUrl: string;
  ogImage: string;
}

export function resolvePageSeo(slug?: string, customData?: Partial<ToolSeoData>): ResolvedPageSeo {
  const seoData = slug ? getToolSeo(slug) : null;
  const title = customData?.title || seoData?.title || "Flixo — Free Online Tools & Utilities";
  const description =
    customData?.description ||
    seoData?.description ||
    "Flixo provides free, private, browser-based online tools for images, text, translation, PDFs, and developer utilities with zero sign-up.";
  const keywords = customData?.keywords ||
    seoData?.keywords || ["flixo", "online tools", "free utilities", "browser tools"];

  const fallbackPageUrl = slug ? getToolCanonicalUrl(slug) : "https://flixotools.com";
  const pageUrl =
    typeof window !== "undefined" && window.location?.href ? window.location.href : fallbackPageUrl;
  const canonicalUrl = stripQueryAndHash(pageUrl);
  const origin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "https://flixotools.com";

  return {
    title,
    description,
    keywords,
    robots: DEFAULT_ROBOTS,
    pageUrl,
    canonicalUrl,
    ogImage: getDefaultOgImageUrl(origin),
  };
}

export function buildToolHeadMetadata(slug: string, overrides?: Partial<ToolSeoData>) {
  const seo = resolvePageSeo(slug, overrides);

  return {
    meta: [
      { title: seo.title },
      { name: "description", content: seo.description },
      { name: "keywords", content: seo.keywords.join(", ") },
      { name: "robots", content: seo.robots },
      { property: "og:title", content: seo.title },
      { property: "og:description", content: seo.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: seo.canonicalUrl },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:image", content: seo.ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: SITE_TWITTER_HANDLE },
      { name: "twitter:title", content: seo.title },
      { name: "twitter:description", content: seo.description },
      { name: "twitter:image", content: seo.ogImage },
    ] satisfies SeoMetaTag[],
    links: [{ rel: "canonical", href: seo.canonicalUrl }],
  };
}
