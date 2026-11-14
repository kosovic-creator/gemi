import { LanguageProvider } from "@/lib/i18n/client"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { parseLocale } from "@/lib/i18n/settings"
import { cookies } from "next/headers"
import "./globals.css"

export const instant = false

export const metadata = {
  title: "Gemi",
  description: "Next.js Authentication and Localization App",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const locale = parseLocale(cookieStore.get("locale")?.value)

  return (
    <html lang={locale}>
      <body className="antialiased selection:bg-indigo-500 selection:text-white">
        <LanguageProvider initialLocale={locale}>
          <LanguageSwitcher />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}





