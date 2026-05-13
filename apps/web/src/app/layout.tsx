import type { Metadata } from "next"
import { RootProvider } from "fumadocs-ui/provider/next"
import "./global.css"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Code With Mangesh | Learn to build Real Applications",
  description:
    "Learn modern development by building real applications step by step.",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Code With Mangesh | Learn to build Real Applications",
    description:
      "Learn modern development by building real applications step by step.",
    url: "https://codewithmangesh.in",
    type: "website",
    siteName: "Code With Mangesh",
    images: [
      {
        url: "/opengraph-image.png",
        alt: "Code With Mangesh Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Code With Mangesh | Learn to build Real Applications",
    description:
      "Learn modern development by building real applications step by step.",
    images: [
      {
        url: "/opengraph-image.png",
        alt: "Code With Mangesh Twitter Card Image",
      },
    ],
  },
  alternates: {
    canonical: "https://codewithmangesh.in",
  },
}

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
