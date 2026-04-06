import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Rift — Interior, Craft & Design",
  description:
    "At Rift, we create interiors where design, craftsmanship & detail come together. From the first idea to the final finish we transform ideas into refined and distinctive interiors.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="flex min-h-svh flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
