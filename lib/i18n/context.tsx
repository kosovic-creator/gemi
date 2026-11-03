"use client"

import React, { createContext, useContext, useSyncExternalStore, useCallback } from "react"
import { Locale, defaultLocale, translations } from "./translations"

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (typeof translations)[Locale]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function getSnapshot(): Locale {
  if (typeof window === "undefined") {
    return defaultLocale
  }
  const stored = localStorage.getItem("locale") as Locale
  if (stored === "sr" || stored === "en") {
    return stored
  }
  const cookieMatch = document.cookie.match(/(?:^|;\s*)locale=([^;]*)/)
  const cookieLocale = cookieMatch ? (cookieMatch[1] as Locale) : null
  if (cookieLocale === "sr" || cookieLocale === "en") {
    return cookieLocale
  }
  return defaultLocale
}

function getServerSnapshot(): Locale {
  return defaultLocale
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

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode
  initialLocale?: Locale
}) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setLocale = useCallback((newLocale: Locale) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", newLocale)
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
      document.documentElement.lang = newLocale
      window.dispatchEvent(new Event("localechange"))
    }
  }, [])

  const t = translations[locale]

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

