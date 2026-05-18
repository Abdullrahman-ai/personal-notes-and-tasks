import { IBM_Plex_Sans_Arabic, Geist_Mono } from "next/font/google"
import Navbar from "@/components/Navbar"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: "تطبيق مهامي",
  description: "تطبيق بسيط لإدارة المهام والملاحظات الشخصية",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", ibmPlexSansArabic.variable)}
    >
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 flex flex-col">
        <ThemeProvider>
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
