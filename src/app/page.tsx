import { auth, signOut } from "@/auth"
import Link from "next/link"
import { Suspense } from "react"
import { InstallButton } from "@/components/InstallButton"
import { connection } from "next/server"

async function UserNav() {
  await connection()
  const session = await auth()

  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex bg-white p-8 rounded-xl shadow-md">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Dobrodošli u Gemi</h1>
        <InstallButton />
      </div>
      {session?.user ? (
        <div className="flex items-center gap-4 mt-4 lg:mt-0">
          <span className="text-gray-700">Prijavljeni ste kao: <strong>{session.user.email}</strong></span>
          <form
            action={async () => {
              "use server"
              await signOut()
            }}
          >
            <button
              type="submit"
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Odjavi se
            </button>
          </form>
        </div>
      ) : (
        <div className="flex gap-4 mt-4 lg:mt-0">
          <Link
            href="/login"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Prijava
          </Link>
          <Link
            href="/register"
            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
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
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <Suspense fallback={<div>Učitavanje...</div>}>
        <UserNav />
      </Suspense>
    </main>
  )
}





