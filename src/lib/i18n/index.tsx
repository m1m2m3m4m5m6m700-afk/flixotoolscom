import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { en, type Dictionary, type TranslationKey } from "./locales/en";
import { ar } from "./locales/ar";
import { es } from "./locales/es";
import { fr } from "./locales/fr";
import { de } from "./locales/de";
import { pt } from "./locales/pt";
import { it } from "./locales/it";
import { nl } from "./locales/nl";
import { tr } from "./locales/tr";
import { ru } from "./locales/ru";
import { pl } from "./locales/pl";
import { uk } from "./locales/uk";
import { hi } from "./locales/hi";
import { id } from "./locales/id";
import { vi } from "./locales/vi";
import { th } from "./locales/th";
import { ja } from "./locales/ja";
import { ko } from "./locales/ko";
import { zhCN } from "./locales/zh-CN";
import { zhTW } from "./locales/zh-TW";

export type LocaleCode =
  | "en"
  | "ar"
  | "es"
  | "fr"
  | "de"
  | "pt"
  | "it"
  | "nl"
  | "tr"
  | "ru"
  | "pl"
  | "uk"
  | "hi"
  | "id"
  | "vi"
  | "th"
  | "ja"
  | "ko"
  | "zh-CN"
  | "zh-TW";

export type Direction = "ltr" | "rtl";

export interface LocaleMeta {
  code: LocaleCode;
  /** Name shown in the switcher, always in its own language. */
  label: string;
  labelNative: string;
  dir: Direction;
  region?: string;
  /** ISO 639-1 code for hreflang */
  hreflang: string;
}

/** All supported languages with metadata */
export const LOCALES: LocaleMeta[] = [
  { code: "en", label: "English", labelNative: "English", dir: "ltr", hreflang: "en" },
  { code: "ar", label: "Arabic", labelNative: "العربية", dir: "rtl", hreflang: "ar" },
  { code: "es", label: "Spanish", labelNative: "Español", dir: "ltr", hreflang: "es" },
  { code: "fr", label: "French", labelNative: "Français", dir: "ltr", hreflang: "fr" },
  { code: "de", label: "German", labelNative: "Deutsch", dir: "ltr", hreflang: "de" },
  { code: "pt", label: "Portuguese", labelNative: "Português", dir: "ltr", hreflang: "pt" },
  { code: "it", label: "Italian", labelNative: "Italiano", dir: "ltr", hreflang: "it" },
  { code: "nl", label: "Dutch", labelNative: "Nederlands", dir: "ltr", hreflang: "nl" },
  { code: "tr", label: "Turkish", labelNative: "Türkçe", dir: "ltr", hreflang: "tr" },
  { code: "ru", label: "Russian", labelNative: "Русский", dir: "ltr", hreflang: "ru" },
  { code: "pl", label: "Polish", labelNative: "Polski", dir: "ltr", hreflang: "pl" },
  { code: "uk", label: "Ukrainian", labelNative: "Українська", dir: "ltr", hreflang: "uk" },
  { code: "hi", label: "Hindi", labelNative: "हिन्दी", dir: "ltr", hreflang: "hi" },
  { code: "id", label: "Indonesian", labelNative: "Bahasa Indonesia", dir: "ltr", hreflang: "id" },
  { code: "vi", label: "Vietnamese", labelNative: "Tiếng Việt", dir: "ltr", hreflang: "vi" },
  { code: "th", label: "Thai", labelNative: "ไทย", dir: "ltr", hreflang: "th" },
  { code: "ja", label: "Japanese", labelNative: "日本語", dir: "ltr", hreflang: "ja" },
  { code: "ko", label: "Korean", labelNative: "한국어", dir: "ltr", hreflang: "ko" },
  {
    code: "zh-CN",
    label: "Chinese (Simplified)",
    labelNative: "简体中文",
    dir: "ltr",
    region: "CN",
    hreflang: "zh-CN",
  },
  {
    code: "zh-TW",
    label: "Chinese (Traditional)",
    labelNative: "繁體中文",
    dir: "ltr",
    region: "TW",
    hreflang: "zh-TW",
  },
];

/** English as master source for fallback */
export const DICTIONARIES: Record<LocaleCode, PartialDictionary> = {
  en,
  ar,
  es,
  fr,
  de,
  pt,
  it,
  nl,
  tr,
  ru,
  pl,
  uk,
  hi,
  id,
  vi,
  th,
  ja,
  ko,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
};

export const DEFAULT_LOCALE: LocaleCode = "en";
export const LOCALE_STORAGE_KEY = "flixo-lang";
export const SUPPORTED_LANGUAGE_CODES = LOCALES.map((l) => l.code);

export function localeMeta(code: LocaleCode): LocaleMeta {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}

export function isValidLocale(code: string): code is LocaleCode {
  return SUPPORTED_LANGUAGE_CODES.includes(code as LocaleCode);
}

export function getHreflangUrl(baseUrl: string, locale: LocaleCode, path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}/${locale}${cleanPath}`;
}

type Vars = Record<string, string | number>;

/** Allow partial dictionaries - missing keys fallback to English */
type PartialDictionary = Partial<Record<TranslationKey, string>>;

interface I18nValue {
  locale: LocaleCode;
  dir: Direction;
  setLocale: (code: LocaleCode) => void;
  t: (key: TranslationKey, vars?: Vars) => string;
}

const I18nContext = createContext<I18nValue>({
  locale: DEFAULT_LOCALE,
  dir: "ltr",
  setLocale: () => {},
  t: (key) => en[key] ?? key,
});

function interpolate(template: string, vars?: Vars) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match,
  );
}

function detectBrowserLocale(): LocaleCode | null {
  if (typeof navigator === "undefined") return null;
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of candidates) {
    const found = LOCALES.find((l) => raw?.toLowerCase().startsWith(l.code));
    if (found) return found.code;
  }
  return null;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>(DEFAULT_LOCALE);

  // Resolve stored choice, else browser language, after hydration.
  useEffect(() => {
    let next: LocaleCode | null = null;
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as LocaleCode | null;
      if (stored && LOCALES.some((l) => l.code === stored)) next = stored;
    } catch {
      /* storage unavailable */
    }
    if (!next) next = detectBrowserLocale();
    if (next && next !== DEFAULT_LOCALE) setLocaleState(next);
  }, []);

  const dir = localeMeta(locale).dir;

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("lang", locale);
    root.setAttribute("dir", dir);
  }, [locale, dir]);

  const setLocale = useCallback((code: LocaleCode) => {
    setLocaleState(code);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, code);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = useMemo<I18nValue>(() => {
    const dict = DICTIONARIES[locale] ?? en;
    return {
      locale,
      dir,
      setLocale,
      t: (key, vars) => interpolate(dict[key] ?? en[key] ?? key, vars),
    };
  }, [locale, dir, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
export type { TranslationKey };
