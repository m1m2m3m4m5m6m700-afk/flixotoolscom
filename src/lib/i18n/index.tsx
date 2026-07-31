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

export type LocaleCode = "en" | "ar";
export type Direction = "ltr" | "rtl";

export interface LocaleMeta {
  code: LocaleCode;
  /** Name shown in the switcher, always in its own language. */
  label: string;
  dir: Direction;
}

/** Add a new language here + a dictionary file — everything else adapts. */
export const LOCALES: LocaleMeta[] = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
];

const DICTIONARIES: Record<LocaleCode, Dictionary> = { en, ar };

export const DEFAULT_LOCALE: LocaleCode = "en";
export const LOCALE_STORAGE_KEY = "flixo-lang";

export function localeMeta(code: LocaleCode): LocaleMeta {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}

/**
 * Runs in <head> before paint so the first frame already has the right
 * lang/dir — no flash and no hydration jump.
 */
export const localeInitScript = `(function(){try{var c=${JSON.stringify(
  LOCALES.map((l) => l.code),
)};var s=localStorage.getItem('${LOCALE_STORAGE_KEY}');if(c.indexOf(s)===-1){s=null;var n=(navigator.languages&&navigator.languages[0])||navigator.language||'';for(var i=0;i<c.length;i++){if(n.toLowerCase().indexOf(c[i])===0){s=c[i];break;}}}var l=s||'${DEFAULT_LOCALE}';var d=document.documentElement;d.setAttribute('lang',l);d.setAttribute('dir',l==='ar'?'rtl':'ltr');}catch(e){}})();`;

type Vars = Record<string, string | number>;

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
