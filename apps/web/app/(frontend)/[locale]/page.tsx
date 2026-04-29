import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlockRenderer } from "@/components/BlockRenderer"
import { PrefetchRoutes } from "@/components/prefetch-routes"
import { getPageBySlug } from "@/lib/payload"
import { isLocale, withLocale } from "@/lib/i18n"

export const revalidate = 300

const TOP_LEVEL_PATHS = ["/projects", "/about", "/process", "/contact"]

type Args = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const page = await getPageBySlug("home", locale)
  return {
    title: page?.meta?.title ?? page?.title ?? "Rift",
    description: page?.meta?.description ?? undefined,
  }
}

export default async function HomePage({ params }: Args) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const page = await getPageBySlug("home", locale)
  if (!page) notFound()

  const prefetchRoutes = TOP_LEVEL_PATHS.map((p) => withLocale(locale, p))

  return (
    <>
      <PrefetchRoutes routes={prefetchRoutes} />
      <BlockRenderer blocks={page.layout} />
    </>
  )
}
