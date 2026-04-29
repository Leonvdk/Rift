import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { FadeIn } from "@/components/fade-in"
import { BlockRenderer } from "@/components/BlockRenderer"
import { getMediaAlt, getMediaUrl } from "@/lib/media"
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
  const heroAlt = getMediaAlt(project.heroImage, project.title ?? "")

  return (
    <>
      <section className="relative h-[75vh] min-h-[480px] overflow-hidden bg-aubergine md:h-[70vh]">
        {heroUrl ? (
          <Image
            src={heroUrl}
            alt={heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-aubergine" />
        )}
        <div className="absolute inset-0 bg-black/20" />
      </section>

      {(project.title || project.intro) && (
        <section className="pt-7 md:pt-10 lg:pt-20">
          <div className="rift-container">
            <div className="lg:ml-[100px]">
              {project.title && (
                <FadeIn direction="up">
                  <h1 className="mb-3 font-sans text-[clamp(1.625rem,5vw,2.625rem)] font-medium tracking-normal leading-none md:mb-4 lg:mb-5">
                    {project.title}
                  </h1>
                </FadeIn>
              )}
              {project.intro && (
                <FadeIn direction="up" delay={100}>
                  <p className="text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed lg:max-w-[35%]">
                    {project.intro}
                  </p>
                </FadeIn>
              )}
            </div>
          </div>
        </section>
      )}

      <BlockRenderer blocks={project.layout} />
    </>
  )
}
