import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FadeIn } from "@/components/fade-in"
import { PrefetchRoutes } from "@/components/prefetch-routes"
import { getMediaFocalPosition, getMediaUrl } from "@/lib/media"
import { getProjects } from "@/lib/payload"
import { isLocale, withLocale } from "@/lib/i18n"

export const revalidate = 300

const PROJECTS_PER_PAGE = 6
const PREFETCH_TOP_N = 4

const PREV_LABEL = { nl: "← Vorige", en: "← Previous page" } as const
const NEXT_LABEL = { nl: "Volgende →", en: "Next page →" } as const

type Args = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string }>
}

export default async function ProjectsPage({ params, searchParams }: Args) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const sp = await searchParams
  const currentPage = Math.max(1, Number(sp.page) || 1)

  const { docs: projects, totalPages } = await getProjects({
    limit: PROJECTS_PER_PAGE,
    page: currentPage,
    locale,
  })

  const prefetchRoutes = projects
    .slice(0, PREFETCH_TOP_N)
    .map((p) => p.slug && withLocale(locale, `/projects/${p.slug}`))
    .filter((r): r is string => Boolean(r))

  return (
    <>
      <PrefetchRoutes routes={prefetchRoutes} />
      <section className="py-10 md:py-16 lg:py-7">
        <div className="rift-container">
          <div className="grid grid-cols-1 gap-x-3 gap-y-5 md:grid-cols-2 md:gap-x-5 md:gap-y-7 lg:gap-x-7 lg:gap-y-8">
            {projects.map((project, i) => {
              const tile = project.thumbnail ?? project.heroImage
              const url = getMediaUrl(tile)
              return (
                <FadeIn key={project.slug} direction="up" delay={i * 80}>
                  <Link
                    href={withLocale(locale, `/projects/${project.slug}`)}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {url ? (
                        <Image
                          src={url}
                          alt={project.title ?? ""}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-opacity duration-500 ease-out group-hover:opacity-80"
                          style={{ objectPosition: getMediaFocalPosition(tile) }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-warm-gray/10" />
                      )}
                    </div>
                    <p className="mt-3 text-[15px] font-light transition-opacity duration-300 ease-out group-hover:opacity-50 md:mt-4">
                      {project.title}
                    </p>
                  </Link>
                </FadeIn>
              )
            })}
          </div>

          {totalPages > 1 && (
            <FadeIn direction="up" delay={200}>
              <nav className="mt-16 flex items-center justify-center gap-8 text-sm font-light md:mt-20">
                {currentPage > 1 ? (
                  <Link
                    href={`${withLocale(locale, "/projects")}?page=${currentPage - 1}`}
                    className="transition-opacity duration-300 hover:opacity-50"
                  >
                    {PREV_LABEL[locale]}
                  </Link>
                ) : (
                  <span className="opacity-30">{PREV_LABEL[locale]}</span>
                )}

                {currentPage < totalPages ? (
                  <Link
                    href={`${withLocale(locale, "/projects")}?page=${currentPage + 1}`}
                    className="transition-opacity duration-300 hover:opacity-50"
                  >
                    {NEXT_LABEL[locale]}
                  </Link>
                ) : (
                  <span className="opacity-30">{NEXT_LABEL[locale]}</span>
                )}
              </nav>
            </FadeIn>
          )}
        </div>
      </section>
    </>
  )
}
