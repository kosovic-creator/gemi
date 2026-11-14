"use client"

import { useEffect, useState } from "react"
import { registerUser } from "@/app/actions"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/i18n/client"
import { PasswordField } from "@/components/PasswordField"

export default function RegisterPage() {
  const { t } = useLanguage()
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string
    email?: string
    password?: string
  }>({})
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!success) return

    const timeoutId = window.setTimeout(() => {
      router.push("/login")
    }, 2000)

    return () => window.clearTimeout(timeoutId)
  }, [router, success])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setFieldErrors({})
    setSuccess(null)

    try {
      const formData = new FormData(event.currentTarget)
      const result = await registerUser(formData)

      if (result.status === "error") {
        setError(t(result.errorKey))
        if (result.fieldErrors) {
          setFieldErrors({
            name: result.fieldErrors.name ? t(result.fieldErrors.name) : undefined,
            email: result.fieldErrors.email ? t(result.fieldErrors.email) : undefined,
            password: result.fieldErrors.password ? t(result.fieldErrors.password) : undefined,
          })
        }
      } else {
        setSuccess(t(result.successKey))
      }
    } catch {
      setError(t("errorGeneric"))
    } finally {
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
            {t("createAccount")}
          </h1>
          <p className="text-sm text-slate-500">
            {t("registerSubtitle")}
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          {error && (
            <div role="alert" className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}
          {success && (
            <div role="status" className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm font-medium text-green-600">
              {success}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="register-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                {t("nameLabel")}
              </label>
              <input
                id="register-name"
                name="name"
                type="text"
                autoComplete="name"
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? "register-name-error" : undefined}
                placeholder={t("namePlaceholder")}
                className={`flex h-11 w-full rounded-lg border ${
                  fieldErrors.name
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                    : "border-slate-300 focus:border-indigo-600 focus:ring-indigo-600/20"
                } bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all shadow-sm`}
              />
              {fieldErrors.name && (
                <p id="register-name-error" className="mt-1.5 text-xs text-red-600 font-medium">
                  {fieldErrors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="register-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                {t("emailLabel")}
              </label>
              <input
                id="register-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "register-email-error" : undefined}
                placeholder={t("emailPlaceholder")}
                className={`flex h-11 w-full rounded-lg border ${
                  fieldErrors.email
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                    : "border-slate-300 focus:border-indigo-600 focus:ring-indigo-600/20"
                } bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all shadow-sm`}
              />
              {fieldErrors.email && (
                <p id="register-email-error" className="mt-1.5 text-xs text-red-600 font-medium">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <PasswordField id="register-password" autoComplete="new-password" error={fieldErrors.password} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="submit"
              disabled={loading || Boolean(success)}
              className="w-full h-11 rounded-lg bg-indigo-600 text-white font-medium text-sm shadow-md shadow-indigo-600/20 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
            >
              {loading ? t("registering") : t("signUpButton")}
            </button>

            <Link
              href="/"
              className="w-full h-11 rounded-lg bg-slate-100 text-slate-700 font-medium text-sm hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all flex items-center justify-center border border-slate-200 cursor-pointer"
            >
              {t("postponeButton")}
            </Link>
          </div>

          <div className="text-center text-sm text-slate-500 pt-2">
            {t("haveAccount")}{" "}
            <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
              {t("signInLink")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}



