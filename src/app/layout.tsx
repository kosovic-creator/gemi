import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gemi App",
  description: "Gemi PWA application",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Gemi",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4f46e5" />
      </head>
      <body>{children}</body>
    </html>
  );
}

