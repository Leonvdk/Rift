import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

const portrait = localFont({
  src: [
    {
      path: "../public/Fonts/Portrait/Portrait-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/Fonts/Portrait/Portrait-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/Fonts/Portrait/Portrait-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Fonts/Portrait/Portrait-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/Fonts/Portrait/Portrait-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/Fonts/Portrait/Portrait-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-serif",
})

const basisGrotesque = localFont({
  src: [
    {
      path: "../public/Fonts/Basis Grotesque Pro/BasisGrotesquePro-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/Fonts/Basis Grotesque Pro/BasisGrotesquePro-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Fonts/Basis Grotesque Pro/BasisGrotesquePro-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/Fonts/Basis Grotesque Pro/BasisGrotesquePro-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Rift — Interior, Craft & Design",
  description:
    "At Rift, we create interiors where design, craftsmanship and attention to detail come together as one. From the first sketch to final realization, we transform ideas into refined and distinctive spaces where form and function converge.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`${portrait.variable} ${basisGrotesque.variable}`}>
      <body className="flex min-h-svh flex-col">
        {/* SVG noise filter — referenced by the body::before grain overlay in globals.css. Must be in the DOM. */}
        <svg className="absolute h-0 w-0" aria-hidden="true">
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
        </svg>
        {children}
      </body>
    </html>
  )
}
