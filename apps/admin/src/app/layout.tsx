import { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "@cwm/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@cwm/ui/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "CodeWithMangesh | Admin",
  description:
    "Learn modern development by building real applications step by step.",
  icons: {
    icon: "/logo.svg",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
