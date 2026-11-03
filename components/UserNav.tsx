"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/i18n/context"
import { logoutUser } from "@/app/actions"

interface UserNavProps {
  user?: {
    email?: string | null
    name?: string | null
  } | null
}

export function UserNav({ user }: UserNavProps) {
  const { t } = useLanguage()

  return (
    <div className="z-10 w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between font-mono text-sm bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl shadow-black/40 border border-white/20 gap-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left tracking-tight">
        {t.welcomeTitle}
      </h1>
      {user ? (
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <span className="text-gray-700 text-center sm:text-left break-all">
            {t.signedInAs} <strong>{user.email}</strong>
          </span>
          <form action={logoutUser} className="w-full sm:w-auto">
            <button
              type="submit"
              className="w-full sm:w-auto cursor-pointer rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 shadow-md shadow-red-600/25 transition-all"
            >
              {t.signOut}
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link
            href="/login"
            className="w-full sm:w-auto text-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/25 transition-all"
          >
            {t.signIn}
          </Link>
          <Link
            href="/register"
            className="w-full sm:w-auto text-center rounded-xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-200 transition-all border border-slate-200"
          >
            {t.register}
          </Link>
        </div>
      )}
    </div>
  )
}
