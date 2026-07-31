import { useEffect } from "react";
import { getToolSeo, type ToolSeoData } from "@/data/toolSeo";

export function usePageSeo(slug?: string, customData?: Partial<ToolSeoData>) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const seoData = slug ? getToolSeo(slug) : null;
    const title = customData?.title || seoData?.title || "Flixo — Free Online Tools & Utilities";
    const description =
      customData?.description ||
      seoData?.description ||
      "Flixo provides free, private, browser-based online tools for images, text, translation, PDFs, and developer utilities with zero sign-up.";
    const keywords = customData?.keywords ||
      seoData?.keywords || ["flixo", "online tools", "free utilities", "browser tools"];
    const origin = window.location.origin || "https://flixotools.com";
    const pageUrl = window.location.href;
    const ogImage = `${origin}/og-image.png`;

    // 1. Update Document Title
    document.title = title;

    // Helper to update or create meta tag
    const setMeta = (nameAttr: string, valueAttr: string, content: string) => {
      let element = document.querySelector(
        `meta[${nameAttr}="${valueAttr}"]`,
      ) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(nameAttr, valueAttr);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper to update canonical link
    const setCanonical = (url: string) => {
      let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", "canonical");
        document.head.appendChild(element);
      }
      element.setAttribute("href", url);
    };

    // Helper to inject Hreflang alternate links for Multilingual SEO
    const setHreflang = (lang: string, href: string) => {
      let element = document.querySelector(
        `link[rel="alternate"][hreflang="${lang}"]`,
      ) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", "alternate");
        element.setAttribute("hreflang", lang);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // 2. Standard Metadata
    setMeta("name", "description", description);
    setMeta("name", "keywords", keywords.join(", "));
    setMeta(
      "name",
      "robots",
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );
    const cleanUrl = pageUrl.split("?")[0].split("#")[0];
    setCanonical(cleanUrl);

    // Multilingual Hreflang Links Injection
    const supportedLangs = [
      { code: "en", label: "English" },
      { code: "es", label: "Spanish" },
      { code: "fr", label: "French" },
      { code: "de", label: "German" },
      { code: "zh", label: "Chinese" },
      { code: "ja", label: "Japanese" },
      { code: "ar", label: "Arabic" },
      { code: "x-default", label: "Default" },
    ];
    supportedLangs.forEach(({ code }) => {
      const langUrl = code === "x-default" || code === "en" ? cleanUrl : `${cleanUrl}?lang=${code}`;
      setHreflang(code, langUrl);
    });

    // 3. Open Graph Metadata
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", pageUrl);
    setMeta("property", "og:site_name", "Flixo");
    setMeta("property", "og:image", ogImage);

    // 4. Twitter Card Metadata
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:site", "@FlixoTools");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);
  }, [slug, customData?.title, customData?.description, customData?.keywords]);
}
