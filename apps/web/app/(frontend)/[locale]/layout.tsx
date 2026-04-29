import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getFooter, getHeader } from "@/lib/payload"
import { isLocale, LOCALES } from "@/lib/i18n"

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [header, footer] = await Promise.all([getHeader(locale), getFooter(locale)])

  const navItems = header?.navItems?.map((n) => ({
    label: n.label ?? "",
    href: n.href ?? "/",
  }))

  const links = footer?.links?.map((l) => ({
    label: l.label ?? "",
    href: l.href ?? "/",
    external: l.external,
  }))

  return (
    <>
      <Header
        locale={locale}
        navItems={navItems && navItems.length > 0 ? navItems : undefined}
      />
      <main className="flex-1">{children}</main>
      <Footer
        locale={locale}
        tagline={footer?.tagline}
        email={footer?.email}
        links={links && links.length > 0 ? links : undefined}
      />
    </>
  )
}
