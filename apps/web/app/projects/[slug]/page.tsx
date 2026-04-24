import Image from "next/image"
import { FadeIn } from "@/components/fade-in"

import heroImg from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-7.jpg"
import imgLeft from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-4.jpg"
import imgRight from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-15.jpg"
import sectionImg from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-1.jpg"

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <>
      {/* ── Hero — full bleed, same as home ── */}
      <section className="relative h-[75vh] min-h-[480px] overflow-hidden bg-aubergine md:h-[70vh]">
        <Image
          src={heroImg}
          alt={`${title} — project overview`}
          fill
          priority
          placeholder="blur"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 flex h-full flex-col items-center justify-end pb-14 text-cream md:pb-20 lg:pb-24 md:hidden">
          <FadeIn direction="fade" delay={300}>
            <h1 className="font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-none">
              Guestroom Amsterdam
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* ── Title + intro text ── */}
      <section className="pt-10 md:pt-14 lg:pt-18">
        <div className="rift-container">
          <div className="lg:ml-[100px]">
            <FadeIn direction="up">
              <h1 className="mb-3 hidden font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-none md:block md:mb-4 lg:mb-5">
                Guestroom Amsterdam
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={100}>
              <p className="text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed lg:max-w-[35%]">
                For this guest room in Amsterdam, a multifunctional space was
                created in the basement, making optimal use of a compact area as
                both a home gym and guest room.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Text wraps around a floated image pair on desktop ── */}
      <section className="pt-10 pb-20 md:pt-14 md:pb-28 lg:pt-18 lg:pb-36">
        <div className="rift-container">
          {/* Floated image pair — on desktop floats right, text wraps around */}
          <FadeIn
            direction="up"
            className="mb-8 flex gap-4 md:float-right md:mb-4 md:ml-10 md:w-2/3 md:gap-10 lg:ml-14 lg:gap-14"
          >
            {/* Image 1 — hidden on mobile */}
            <div className="relative hidden aspect-[7/10] flex-1 md:block">
              <Image
                src={imgLeft}
                alt={`${title} — interior view`}
                fill
                placeholder="blur"
                className="object-cover"
              />
            </div>
            {/* Image 2 — always visible */}
            <div className="relative aspect-[7/10] flex-1">
              <Image
                src={imgRight}
                alt={`${title} — furniture detail`}
                fill
                placeholder="blur"
                className="object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn direction="up">
            <p className="text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed">
              By carefully considering the available space, a Murphy bed and
              smart integrated storage solutions were chosen. This provides
              sufficient space for all necessary materials and equipment, such
              as gym gear, without compromising the sense of calm or
              functionality of the space.
            </p>
          </FadeIn>

          <div className="clear-both" />
        </div>
      </section>

      {/* ── Title + image — text 1/4, image 3/4 (same as home "We are Rift") ── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="rift-container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12 lg:gap-16">
            <div className="md:col-span-1">
              <FadeIn direction="up" delay={150}>
                <p className="text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed">
                  The use of warm oak finishes, combined with contrasting
                  stainless steel cabinet fronts, creates a contemporary and
                  well-balanced aesthetic.
                </p>
              </FadeIn>
            </div>

            <FadeIn
              direction="up"
              delay={200}
              className="relative aspect-[4/3] md:col-span-3"
            >
              <Image
                src={sectionImg}
                alt={`${title} — craftsmanship detail`}
                fill
                placeholder="blur"
                className="object-cover"
              />
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
