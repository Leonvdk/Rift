import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlockRenderer } from "@/components/BlockRenderer"
import { getPageBySlug } from "@/lib/payload"
import { isLocale } from "@/lib/i18n"

export const revalidate = 300

type Args = {
  params: Promise<{ locale: string; slug: string[] }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const page = await getPageBySlug(slug.join("/"), locale)
  return {
    title: page?.meta?.title ?? page?.title ?? "Rift",
    description: page?.meta?.description ?? undefined,
  }
}

export default async function CatchAllPage({ params }: Args) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const page = await getPageBySlug(slug.join("/"), locale)
  if (!page) notFound()

  return <BlockRenderer blocks={page.layout} />
}
