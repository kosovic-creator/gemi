import { LanguageProvider } from "@/lib/i18n/context"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { defaultLocale } from "@/lib/i18n/translations"
import "./globals.css"

export const metadata = {
  title: "Gemi",
  description: "Next.js Authentication and Localization App",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={defaultLocale} suppressHydrationWarning>
      <body className="antialiased selection:bg-indigo-500 selection:text-white">
        <LanguageProvider initialLocale={defaultLocale}>
          <LanguageSwitcher />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}


