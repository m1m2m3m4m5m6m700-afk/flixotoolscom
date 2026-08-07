/**
 * Flixo Middleware - Language Detection and URL Localization
 *
 * Features:
 * - Browser language detection
 * - Cookie persistence
 * - Locale-based URL rewriting
 * - x-default handling
 */
import type { H3Event, EventHandlerRequest } from "h3";
import {
  defineEventHandler,
  getRequestURL,
  sendRedirect,
  getHeader,
  setHeader,
  getCookie,
  setCookie,
} from "h3";
import { LOCALES, DEFAULT_LOCALE, isValidLocale, type LocaleCode } from "./lib/i18n";

const LOCALE_STORAGE_KEY = "flixo-lang";
const LOCALE_COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year

// Supported locale codes for matching
const SUPPORTED_CODES = LOCALES.map((l) => l.code);

/**
 * Parse Accept-Language header and return preferred locale
 */
function parseAcceptLanguage(header: string | undefined): LocaleCode | null {
  if (!header) return null;

  const languages = header.split(",").map((lang) => {
    const [code, qValue] = lang.trim().split(";q=");
    return {
      code: code.trim().toLowerCase(),
      q: qValue ? parseFloat(qValue) : 1,
    };
  });

  // Sort by quality value descending
  languages.sort((a, b) => b.q - a.q);

  // Find matching locale
  for (const { code } of languages) {
    // Try exact match (e.g., "en-US" matches "en")
    const exactMatch = SUPPORTED_CODES.find((l) => l.toLowerCase() === code);
    if (exactMatch) return exactMatch;

    // Try language-only match (e.g., "zh" matches "zh-CN" or "zh-TW")
    const langOnly = code.split("-")[0];
    const partialMatch = SUPPORTED_CODES.find((l) => l.toLowerCase().startsWith(langOnly));
    if (partialMatch) return partialMatch;
  }

  return null;
}

/**
 * Check if path starts with a locale code
 */
function extractLocaleFromPath(path: string): { locale: LocaleCode; cleanPath: string } | null {
  // Remove leading slash
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const segments = cleanPath.split("/");

  if (segments.length === 0) return null;

  const firstSegment = segments[0];

  // Check if first segment is a valid locale code
  if (isValidLocale(firstSegment)) {
    return {
      locale: firstSegment as LocaleCode,
      cleanPath: "/" + segments.slice(1).join("/"),
    };
  }

  return null;
}

/**
 * Detect preferred locale from various sources
 */
function detectLocale(event: H3Event<EventHandlerRequest>): LocaleCode {
  const url = getRequestURL(event);
  const path = url.pathname;

  // 1. Check if path already has locale prefix
  const pathLocale = extractLocaleFromPath(path);
  if (pathLocale) {
    return pathLocale.locale;
  }

  // 2. Check cookie
  const cookieLocale = getCookie(event, LOCALE_STORAGE_KEY);
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale as LocaleCode;
  }

  // 3. Check Accept-Language header
  const acceptLanguage = getHeader(event, "accept-language");
  const browserLocale = parseAcceptLanguage(acceptLanguage);
  if (browserLocale) {
    return browserLocale;
  }

  // 4. Default to English
  return DEFAULT_LOCALE;
}

/**
 * Set locale cookie
 */
function setLocaleCookie(event: H3Event<EventHandlerRequest>, locale: LocaleCode): void {
  setCookie(event, LOCALE_STORAGE_KEY, locale, {
    maxAge: LOCALE_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

/**
 * Handle locale routing
 *
 * Rules:
 * - /password-generator → /en/password-generator (default locale)
 * - /{locale}/password-generator → localized version
 * - /ar/password-generator → Arabic version (RTL)
 * - x-default → /password-generator
 */
export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  const path = url.pathname;

  // Skip middleware for:
  // - Static assets
  // - API routes
  // - Next.js internals
  // - Already localized paths
  // - Root path
  if (
    path.startsWith("/_") ||
    path.startsWith("/api/") ||
    path.startsWith("/@") ||
    path.startsWith("/assets/") ||
    path.startsWith("/.output/") ||
    path.includes(".") || // Files with extensions
    path === "/" ||
    extractLocaleFromPath(path) !== null
  ) {
    // Still set locale for downstream handlers
    const locale = detectLocale(event);
    setHeader(event, "x-locale", locale);
    return;
  }

  // Detect locale
  const locale = detectLocale(event);

  // Redirect to localized path if not already localized
  // Only redirect if path is not root
  if (path !== "/" && !path.match(/^\/[a-z]{2}(-[A-Z]{2})?/)) {
    const targetPath = `/${locale}${path === "/" ? "" : path}`;

    // Set cookie for persistence
    setLocaleCookie(event, locale);

    // Set header for downstream handlers
    setHeader(event, "x-locale", locale);
    setHeader(event, "x-original-path", path);

    // Redirect with 307 (Temporary Redirect) to preserve method
    return sendRedirect(event, targetPath, 307);
  }

  // Set locale header for downstream handlers
  setHeader(event, "x-locale", locale);
  setLocaleCookie(event, locale);
});

/**
 * Export helper functions for use in routes
 */
export { detectLocale, setLocaleCookie, extractLocaleFromPath };
