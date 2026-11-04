import mnCommon from "@/locales/mn/common.json"
import enCommon from "@/locales/en/common.json"

export const resources = {
  mn: {
    common: mnCommon,
  },
  en: {
    common: enCommon,
  },
} as const

export type TranslationKey = keyof typeof mnCommon
