import { auth } from "@/auth"
import { Suspense } from "react"
import { UserNavClient } from "@/components/UserNavClient"

async function UserNav() {
  const session = await auth()
  return <UserNavClient user={session?.user} />
}

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4 sm:p-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      {/* Ambijentalno osvetljenje */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      <Suspense fallback={<div className="text-slate-300 font-medium animate-pulse">Učitavanje...</div>}>
        <UserNav />
      </Suspense>
    </main>
  )
}






