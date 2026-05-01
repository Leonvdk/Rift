"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { stripLocaleFromPath, withLocale, type Locale } from "@/lib/i18n"

type NavItem = { label: string; href: string }

const FALLBACK_NAV: Record<Locale, NavItem[]> = {
  nl: [
    { label: "Projecten", href: "/projects" },
    { label: "Over ons", href: "/about" },
    { label: "Werkwijze", href: "/process" },
    { label: "Contact", href: "/contact" },
  ],
  en: [
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Process", href: "/process" },
    { label: "Contact", href: "/contact" },
  ],
}

type Props = {
  locale: Locale
  navItems?: NavItem[]
}

export function Header({ locale, navItems }: Props) {
  const items = navItems && navItems.length > 0 ? navItems : FALLBACK_NAV[locale]
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const localizedHref = (href: string) => withLocale(locale, href)
  const currentBasePath = stripLocaleFromPath(pathname ?? "/")

  return (
    <>
      <header className="sticky top-0 z-[60] bg-cream/80 shadow-[0_1px_8px_rgba(0,0,0,0.06)] backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1560px] items-end justify-between px-[clamp(1.25rem,3.5vw,2.75rem)] pt-4 pb-0.5 md:pt-5">
          <Link
            href={localizedHref("/")}
            aria-label="Rift — Home"
            className="relative z-[60]"
            onClick={() => setOpen(false)}
          >
            <svg
              viewBox="0 0 1500 1500"
              className="-my-2 h-[5rem] w-auto md:-my-3 md:h-[5.5rem]"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M331.2,767.55v-79.42c-62.8,17.55-108.05,36.94-114.52,39.71v6.46l51.72,24.01v273.36l-55.41,38.79v5.54h191.17v-5.54l-72.96-37.86v-241.96c32.32-28.63,71.11-40.63,92.35-40.63,19.39,0,36.94,7.39,44.33,10.16l21.24-61.88c-8.31-2.77-29.55-9.23-48.02-9.23s-49.87,16.62-109.9,78.5Z"
              />
              <path
                fill="currentColor"
                d="M604.55,572.68c21.24,0,38.79-16.62,38.79-38.79s-17.55-38.79-38.79-38.79-38.79,16.62-38.79,38.79,17.55,38.79,38.79,38.79Z"
              />
              <path
                fill="currentColor"
                d="M640.57,688.12c-63.72,17.55-117.29,39.71-114.52,39.71v5.54l51.72,24.94v273.36l-55.41,38.79v5.54h174.55v-5.54l-56.33-38.79v-343.55Z"
              />
              <path
                fill="currentColor"
                d="M1262.08,741.69l24.94-37.87h-.62l.62-.92h-179.16v-55.41l-74.51,56.33h-179.45v-82.19c0-121.91,70.19-173.62,118.21-173.62,32.32,0,63.72,13.85,92.35,29.55l24.01-52.64c-15.7-4.62-44.33-9.23-78.5-9.23-125.6,0-218.87,105.28-218.87,242.89v44.33l-58.18,32.32v6.46h58.18v289.99l-56.34,38.79v5.54h194.87v-5.54l-75.73-43.41v-285.37h191.16v248.43c0,41.56,26.78,94.2,108.98,94.2,52.64,0,90.5-24.94,115.44-50.79l-3.7-6.47c-18.47,10.16-48.02,18.47-80.35,18.47-51.72,0-77.58-32.32-77.58-70.19v-233.65h154.23Z"
              />
            </svg>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden gap-8 pt-1 text-[15px] font-normal tracking-wide md:flex">
            {items.map((item) => {
              const href = localizedHref(item.href)
              const isActive = currentBasePath === item.href
              return (
                <Link
                  key={item.href}
                  href={href}
                  className={`relative pb-0.5 transition-opacity duration-300 hover:opacity-50 ${
                    isActive ? "" : ""
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-px w-full bg-current"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="relative z-[60] self-end pb-[18px] md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <div className="flex w-6 flex-col gap-[6px]">
              <span
                className={`block h-px w-full bg-current transition-all duration-300 ease-out ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-full bg-current transition-all duration-300 ease-out ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-full bg-current transition-all duration-300 ease-out ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[55] bg-cream transition-all duration-500 ease-out md:hidden ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ transitionDelay: open ? "0ms" : "150ms" }}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-10">
          {items.map((item, i) => {
            const href = localizedHref(item.href)
            const isActive = currentBasePath === item.href
            return (
              <Link
                key={item.href}
                href={href}
                className={`font-sans text-4xl font-normal transition-all duration-500 ease-out ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                } ${isActive ? "opacity-60" : ""}`}
                style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
