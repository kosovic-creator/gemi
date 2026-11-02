import { auth, signOut } from "@/auth"
import Link from "next/link"
import { Suspense } from "react"

async function UserNav() {
  const session = await auth()

  return (
    <div className="z-10 w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between font-mono text-sm bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-100 gap-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left tracking-tight">Dobrodošli u Gemi</h1>
      {session?.user ? (
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <span className="text-gray-700 text-center sm:text-left break-all">Prijavljeni ste kao: <strong>{session.user.email}</strong></span>
          <form
            action={async () => {
              "use server"
              await signOut()
            }}
            className="w-full sm:w-auto"
          >
            <button
              type="submit"
              className="w-full sm:w-auto rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 shadow-md shadow-red-600/25 transition-all"
            >
              Odjavi se
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link
            href="/login"
            className="w-full sm:w-auto text-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/25 transition-all"
          >
            Prijava
          </Link>
          <Link
            href="/register"
            className="w-full sm:w-auto text-center rounded-xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-200 transition-all border border-slate-200"
          >
            Registracija
          </Link>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-slate-50 to-slate-100">
      <Suspense fallback={<div className="text-slate-500 font-medium">Učitavanje...</div>}>
        <UserNav />
      </Suspense>
    </main>
  )
}




