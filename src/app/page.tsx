import { auth, signOut } from "@/auth"
import Link from "next/link"
import { Suspense } from "react"
import { InstallButton } from "@/components/InstallButton"
import { connection } from "next/server"

async function UserNav() {
  await connection()
  const session = await auth()

  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-sans text-sm lg:flex bg-white p-6 sm:p-8 rounded-2xl shadow-xl shadow-slate-100 border border-slate-200/80">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dobrodošli u Gemi</h1>
        <InstallButton />
      </div>
      {session?.user ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          <span className="text-slate-600">Prijavljeni ste kao: <strong className="text-slate-900">{session.user.email}</strong></span>
          <form
            action={async () => {
              "use server"
              await signOut()
            }}
          >
            <button
              type="submit"
              className="w-full sm:w-auto rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 transition-colors"
            >
              Odjavi se
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-3 mt-6 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          <Link
            href="/login"
            className="w-full sm:w-auto text-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-all"
          >
            Prijava
          </Link>
          <Link
            href="/register"
            className="w-full sm:w-auto text-center rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-all"
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
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 lg:p-24 bg-gradient-to-br from-slate-50 to-slate-100">
      <Suspense fallback={<div>Učitavanje...</div>}>
        <UserNav />
      </Suspense>
    </main>
  )
}






