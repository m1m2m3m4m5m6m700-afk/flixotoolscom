import type { CategoryId } from "@/data/categories";
import type { TranslationKey } from "./locales/en";

/** Translation-key helpers for labels backed by the canonical data registry. */
export const toolNameKey = (slug: string) => `tool.${slug}.name` as TranslationKey;
export const toolTaglineKey = (slug: string) => `tool.${slug}.tagline` as TranslationKey;
export const categoryNameKey = (id: CategoryId) => `category.${id}.name` as TranslationKey;
export const categoryBlurbKey = (id: CategoryId) => `category.${id}.blurb` as TranslationKey;
export const categoryToolsKey = (id: CategoryId) => `category.${id}.tools` as TranslationKey;
