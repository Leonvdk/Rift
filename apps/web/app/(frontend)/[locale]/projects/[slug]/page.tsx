import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { FadeIn } from "@/components/fade-in"
import { BlockRenderer } from "@/components/BlockRenderer"
import { MediaImage } from "@/components/media-image"
import { getMediaUrl } from "@/lib/media"
import { getProjectBySlug } from "@/lib/payload"
import { isLocale } from "@/lib/i18n"

export const revalidate = 300

type Args = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const project = await getProjectBySlug(slug, locale)
  return {
    title: project?.meta?.title ?? project?.title ?? "Rift",
    description: project?.meta?.description ?? undefined,
  }
}

export default async function ProjectPage({ params }: Args) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const project = await getProjectBySlug(slug, locale)
  if (!project) notFound()

  const heroUrl = getMediaUrl(project.heroImage)

  return (
    <>
      <section className="relative h-[75vh] min-h-[480px] overflow-hidden bg-aubergine md:h-[70vh]">
        {heroUrl ? (
          <MediaImage
            media={project.heroImage}
            alt={project.title ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            applyFocalPosition
          />
        ) : (
          <div className="absolute inset-0 bg-aubergine" />
        )}
        <div className="absolute inset-0 bg-black/20" />

        {project.title && (
          <div className="relative z-10 flex h-full flex-col items-center justify-end pb-7 text-cream md:pb-10 lg:pb-12">
            <FadeIn direction="fade" delay={300}>
              <h1 className="font-sans text-[clamp(1.9375rem,5vw,3.4375rem)] font-normal tracking-normal leading-none">
                {project.title}
              </h1>
            </FadeIn>
          </div>
        )}
      </section>

      <div className="pt-7 md:pt-9 lg:pt-12">
        <BlockRenderer blocks={project.layout} />
      </div>
    </>
  )
}
