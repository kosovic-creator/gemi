"use client"

import React, { useEffect, useSyncExternalStore } from "react"
import i18next from "i18next"
import { initReactI18next, I18nextProvider } from "react-i18next"
import { getOptions, fallbackLng, defaultNS, Locale } from "./settings"
import { resources, TranslationKey } from "./resources"

if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    ...getOptions(fallbackLng),
    resources,
    react: {
      useSuspense: false,
    },
  })
}

function getClientLocale(): Locale {
  if (typeof window === "undefined") {
    return fallbackLng
  }
  const stored = localStorage.getItem("locale")
  if (stored === "mn" || stored === "en") {
    return stored as Locale
  }
  const cookieMatch = document.cookie.match(/(?:^|;\s*)locale=([^;]*)/)
  const cookieLocale = cookieMatch ? cookieMatch[1] : null
  if (cookieLocale === "mn" || cookieLocale === "en") {
    return cookieLocale as Locale
  }
  return fallbackLng
}

function getServerLocale(): Locale {
  return fallbackLng
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {}
  }
  window.addEventListener("storage", callback)
  window.addEventListener("localechange", callback)
  return () => {
    window.removeEventListener("storage", callback)
    window.removeEventListener("localechange", callback)
  }
}

export function useLanguage(ns = defaultNS) {
  const locale = useSyncExternalStore(subscribe, getClientLocale, getServerLocale)

  useEffect(() => {
    if (i18next.language !== locale) {
      i18next.changeLanguage(locale)
    }
  }, [locale])

  const setLocale = (newLocale: Locale) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", newLocale)
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
      document.documentElement.lang = newLocale
      i18next.changeLanguage(newLocale)
      window.dispatchEvent(new Event("localechange"))
    }
  }

  const fixedT = i18next.getFixedT(locale, ns)

  // Support both t("key") and t.key
  const tProxy = new Proxy(fixedT, {
    get(target, prop, receiver) {
      if (typeof prop === "string" && prop in resources.mn.common) {
        return target(prop as unknown as TranslationKey)
      }
      return Reflect.get(target, prop, receiver)
    },
  })

  return {
    t: tProxy as typeof fixedT & Record<TranslationKey, string>,
    locale,
    setLocale,
    i18n: i18next,
  }
}

export function useTranslation(ns = defaultNS) {
  const { t, locale, i18n } = useLanguage(ns)
  return { t, i18n, ready: true, lng: locale }
}

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode
  initialLocale?: Locale
}) {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
}

export { i18next, I18nextProvider }


