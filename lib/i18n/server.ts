import { createInstance } from "i18next"
import { getOptions, Locale, fallbackLng, defaultNS } from "./settings"
import { resources, TranslationKey } from "./resources"

export async function getServerTranslation(lng: Locale = fallbackLng, ns = defaultNS) {
  const i18nInstance = createInstance()
  await i18nInstance.init({
    ...getOptions(lng, ns),
    resources,
  })

  return {
    t: i18nInstance.getFixedT(lng, ns),
    i18n: i18nInstance,
  }
}

export type { TranslationKey, Locale }
