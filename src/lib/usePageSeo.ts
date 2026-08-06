import { useEffect } from "react";
import { type ToolSeoData } from "@/data/toolSeo";
import { SITE_NAME, SITE_TWITTER_HANDLE } from "@/lib/seo/site";
import { resolvePageSeo } from "@/lib/seo/toolPageMetadata";

export function usePageSeo(slug?: string, customData?: Partial<ToolSeoData>) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const { title, description, keywords, robots, pageUrl, canonicalUrl, ogImage } = resolvePageSeo(
      slug,
      customData,
    );

    document.title = title;

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

    const setCanonical = (url: string) => {
      let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", "canonical");
        document.head.appendChild(element);
      }
      element.setAttribute("href", url);
    };

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

    setMeta("name", "description", description);
    setMeta("name", "keywords", keywords.join(", "));
    setMeta("name", "robots", robots);
    setCanonical(canonicalUrl);

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
      const langUrl =
        code === "x-default" || code === "en" ? canonicalUrl : `${canonicalUrl}?lang=${code}`;
      setHreflang(code, langUrl);
    });

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", pageUrl);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:image", ogImage);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:site", SITE_TWITTER_HANDLE);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);
  }, [slug, customData]);
}
