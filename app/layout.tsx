import { LanguageProvider } from "@/lib/i18n/client"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { fallbackLng } from "@/lib/i18n/settings"
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
    <html lang={fallbackLng} suppressHydrationWarning>
      <body className="antialiased selection:bg-indigo-500 selection:text-white" suppressHydrationWarning>
        <LanguageProvider initialLocale={fallbackLng}>
          <LanguageSwitcher />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}





