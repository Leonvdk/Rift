import Image from "next/image"
import Link from "next/link"
import { FadeIn } from "@/components/fade-in"

import img1 from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-3.jpg"
import img2 from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-5.jpg"
import img3 from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-8.jpg"
import img4 from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-9.jpg"
import img5 from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-11.jpg"
import img6 from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-14.jpg"

const projects = [
  { slug: "janita-emmastraat", title: "Janita Emmastraat", image: img1 },
  { slug: "villa-bergen", title: "Villa Bergen", image: img2 },
  { slug: "studio-haarlem", title: "Studio Haarlem", image: img3 },
  { slug: "woning-alkmaar", title: "Woning Alkmaar", image: img4 },
  { slug: "atelier-amstel", title: "Atelier Amstel", image: img5 },
  { slug: "loft-jordaan", title: "Loft Jordaan", image: img6 },
]

const PROJECTS_PER_PAGE = 6

export default function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  return <ProjectsContent searchParams={searchParams} />
}

async function ProjectsContent({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const currentPage = Math.max(1, Number(params.page) || 1)
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE)
  const start = (currentPage - 1) * PROJECTS_PER_PAGE
  const pageProjects = projects.slice(start, start + PROJECTS_PER_PAGE)

  return (
    <section className="py-10 md:py-16 lg:py-20">
      <div className="rift-container">
        {/* Project grid — 1 col mobile, 2 col desktop */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 md:gap-x-10 md:gap-y-14 lg:gap-x-14 lg:gap-y-16">
          {pageProjects.map((project, i) => (
            <FadeIn key={project.slug} direction="up" delay={i * 80}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    placeholder="blur"
                    className="scale-[1.03] object-cover transition-transform duration-700 ease-out group-hover:scale-100"
                  />
                </div>
                <p className="mt-3 text-[15px] font-light [text-shadow:0_0_0_transparent] transition-[text-shadow] duration-700 ease-out group-hover:[text-shadow:0.3px_0_0_currentColor,-0.3px_0_0_currentColor] md:mt-4">
                  {project.title}
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <FadeIn direction="up" delay={200}>
            <nav className="mt-16 flex items-center justify-center gap-8 text-sm font-light md:mt-20">
              {currentPage > 1 ? (
                <Link
                  href={`/projects?page=${currentPage - 1}`}
                  className="transition-opacity duration-300 hover:opacity-50"
                >
                  &larr; Previous page
                </Link>
              ) : (
                <span className="opacity-30">&larr; Previous page</span>
              )}

              {currentPage < totalPages ? (
                <Link
                  href={`/projects?page=${currentPage + 1}`}
                  className="transition-opacity duration-300 hover:opacity-50"
                >
                  Next page &rarr;
                </Link>
              ) : (
                <span className="opacity-30">Next page &rarr;</span>
              )}
            </nav>
          </FadeIn>
        )}
      </div>
    </section>
  )
}
