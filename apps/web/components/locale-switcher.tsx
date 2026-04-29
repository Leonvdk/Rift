"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LOCALES, stripLocaleFromPath, withLocale, type Locale } from "@/lib/i18n"

type Props = {
  locale: Locale
}

export function LocaleSwitcher({ locale }: Props) {
  const pathname = usePathname()
  const basePath = stripLocaleFromPath(pathname ?? "/")

  return (
    <div
      className="pointer-events-none fixed bottom-6 left-6 z-[70] text-white mix-blend-difference"
      aria-label="Language switcher"
    >
      <div className="pointer-events-auto flex items-center gap-1.5 text-[13px] font-normal uppercase tracking-[0.18em]">
        {LOCALES.map((code, idx) => {
          const isActive = code === locale
          return (
            <span key={code} className="contents">
              {idx > 0 && (
                <span className="opacity-40" aria-hidden="true">
                  ·
                </span>
              )}
              {isActive ? (
                <span aria-current="true">{code}</span>
              ) : (
                <Link
                  href={withLocale(code, basePath)}
                  className="opacity-50 transition-opacity duration-300 hover:opacity-100"
                  aria-label={`Switch to ${code === "nl" ? "Nederlands" : "English"}`}
                >
                  {code}
                </Link>
              )}
            </span>
          )
        })}
      </div>
    </div>
  )
}
