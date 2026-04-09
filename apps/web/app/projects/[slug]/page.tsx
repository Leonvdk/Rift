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
      <section className="relative h-[75vh] min-h-[480px] overflow-hidden bg-aubergine md:h-[85vh]">
        <Image
          src={heroImg}
          alt={`${title} — project overview`}
          fill
          priority
          placeholder="blur"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 flex h-full flex-col items-center justify-end pb-14 text-cream md:pb-20 lg:pb-24">
          <FadeIn direction="fade" delay={300}>
            <h1 className="font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-none">
              Janita Emmastraat
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* ── Text + two images — text left, images right ── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="rift-container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10 lg:gap-14">
            {/* Text block — left */}
            <div className="flex items-center">
              <div>
                <FadeIn direction="up">
                  <p className="text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed">
                    At Rift, we create interiors where design, craftsmanship
                    &amp; detail come together. From the first idea to the final
                    finish we transform ideas into refined and distinctive
                    interiors.
                  </p>
                </FadeIn>
              </div>
            </div>

            {/* Image 1 — hidden on mobile */}
            <FadeIn
              direction="side"
              className="relative hidden aspect-[7/10] md:block"
            >
              <Image
                src={imgLeft}
                alt={`${title} — interior view`}
                fill
                placeholder="blur"
                className="object-cover"
              />
            </FadeIn>

            {/* Image 2 — always visible */}
            <FadeIn direction="side" delay={100} className="relative aspect-[7/10]">
              <Image
                src={imgRight}
                alt={`${title} — furniture detail`}
                fill
                placeholder="blur"
                className="object-cover"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Title + image — text 1/4, image 3/4 (same as home "We are Rift") ── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="rift-container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12 lg:gap-16">
            <div className="md:col-span-1">
              <FadeIn direction="up" delay={150}>
                <p className="text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed">
                  We believe that exceptional interiors start with listening
                  &amp; understanding. At Rift we strive to create spaces that
                  are timeless, thoughtful &amp; refined. Crafted to be lived in
                  and enjoyed every day.
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
