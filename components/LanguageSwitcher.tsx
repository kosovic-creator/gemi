"use client"

import Image from "next/image"
import { useLanguage } from "@/lib/i18n/client"

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage()

  return (
    <div
      role="region"
      aria-label={t("language")}
      className="fixed top-4 right-4 z-50 flex items-center gap-1 rounded-full border border-white/20 bg-slate-900/85 p-1.5 shadow-xl backdrop-blur-xl"
    >
      <button
        type="button"
        onClick={() => setLocale("mn")}
        className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
          locale === "mn"
            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
            : "text-slate-300 hover:bg-white/10 hover:text-white"
        }`}
        aria-pressed={locale === "mn"}
        title={t("montenegrin")}
      >
        <Image
          src="/flags/mn.svg"
          alt=""
          width={20}
          height={14}
          className="h-3.5 w-5 rounded-[2px] object-cover shadow-xs shrink-0"
          unoptimized
        />
        <span>MN</span>
      </button>

      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
          locale === "en"
            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
            : "text-slate-300 hover:bg-white/10 hover:text-white"
        }`}
        aria-pressed={locale === "en"}
        title={t("english")}
      >
        <Image
          src="/flags/en.svg"
          alt=""
          width={20}
          height={14}
          className="h-3.5 w-5 rounded-[2px] object-cover shadow-xs shrink-0"
          unoptimized
        />
        <span>EN</span>
      </button>
    </div>
  )
}



