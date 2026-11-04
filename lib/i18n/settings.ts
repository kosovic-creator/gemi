export const fallbackLng = "mn"
export const languages = ["mn", "en"] as const
export type Locale = (typeof languages)[number]
export const defaultNS = "common"

export function getOptions(lng: string = fallbackLng, ns: string = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  }
}
