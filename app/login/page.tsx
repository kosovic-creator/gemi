"use client"

import { useState } from "react"
import { loginUser } from "@/app/actions"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/context"
import { TranslationKey } from "@/lib/i18n/translations"
import { PasswordField } from "@/components/PasswordField"

export default function LoginPage() {
  const { t, locale } = useLanguage()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const result = await loginUser(formData, locale)

    if (result?.error) {
      const translatedError =
        result.errorKey && t[result.errorKey as TranslationKey]
          ? (t[result.errorKey as TranslationKey] as string)
          : result.error
      setError(translatedError)
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-4 py-12 sm:px-6 lg:px-8">
      {/* Ambijentalno osvetljenje */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/95 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {t.welcomeBack}
          </h1>
          <p className="text-sm text-slate-500">
            {t.loginSubtitle}
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                {t.emailLabel}
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder={t.emailPlaceholder}
                className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all shadow-sm"
              />
            </div>

            <PasswordField />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-lg bg-indigo-600 text-white font-medium text-sm shadow-md shadow-indigo-600/20 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
          >
            {loading ? t.signingIn : t.signInButton}
          </button>

          <div className="text-center text-sm text-slate-500 pt-2">
            {t.noAccount}{" "}
            <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
              {t.signUpLink}
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

