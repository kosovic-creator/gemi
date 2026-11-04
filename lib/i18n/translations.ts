import { resources, TranslationKey } from "./resources"
import { fallbackLng, Locale } from "./settings"

export const defaultLocale: Locale = fallbackLng
export const translations = {
  mn: resources.mn.common,
  en: resources.en.common,
}

export type { Locale, TranslationKey }


