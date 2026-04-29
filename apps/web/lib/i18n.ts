export const LOCALES = ["nl", "en"] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = "nl"

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "nl" || value === "en"
}

export function localeFromSegment(segment: string | undefined | null): Locale {
  return isLocale(segment) ? segment : DEFAULT_LOCALE
}

export function withLocale(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`
  if (clean === "/") return `/${locale}`
  return `/${locale}${clean}`
}

export function stripLocaleFromPath(pathname: string): string {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}`) return "/"
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(`/${locale}`.length)
  }
  return pathname
}
