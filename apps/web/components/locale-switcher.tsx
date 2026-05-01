"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { LOCALES, stripLocaleFromPath, withLocale, type Locale } from "@/lib/i18n"

type Props = {
  locale: Locale
}

const ABOVE_LINE_PX = 16 // gap above the footer's gray line (1rem)
const BASE_OFFSET_PX = 8 // sits right at the bottom edge

/**
 * Sticky language switcher pinned to the bottom-left of the viewport.
 * Stays at the same bottom offset throughout, except when the footer's gray
 * hairline enters view — then it pushes up to stop 1rem above it.
 */
export function LocaleSwitcher({ locale }: Props) {
  const pathname = usePathname()
  const basePath = stripLocaleFromPath(pathname ?? "/")
  const [bottomOffset, setBottomOffset] = useState(BASE_OFFSET_PX)

  useEffect(() => {
    const update = () => {
      const target =
        document.querySelector<HTMLElement>("[data-footer-line]") ??
        document.querySelector<HTMLElement>("footer")
      if (!target) {
        setBottomOffset(BASE_OFFSET_PX)
        return
      }
      const rect = target.getBoundingClientRect()
      const overlap = window.innerHeight - rect.top
      const aboveLine = overlap + ABOVE_LINE_PX
      setBottomOffset(Math.max(BASE_OFFSET_PX, aboveLine))
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update, { passive: true })
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed left-6 z-[70] text-white mix-blend-difference"
      style={{ bottom: `${bottomOffset}px` }}
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
