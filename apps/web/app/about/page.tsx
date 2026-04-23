import Image from "next/image"
import { FadeIn } from "@/components/fade-in"

import section1 from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-5.jpg"
import section2a from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-3.jpg"
import section2b from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-9.jpg"

export default function AboutPage() {
  return (
    <>
      {/* ── Section 1 — text 1/4, image 3/4 ── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="rift-container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12 lg:gap-16">
            <div className="md:col-span-1">
              <FadeIn direction="up" delay={150}>
                <p className="text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed">
                  RIFT was founded in 2025. A passion for intentional design
                  &amp; craftsmanship lies at the core of everything we do.
                </p>
                <p className="mt-6 text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed">
                  We believe true quality is defined by how something is made.
                  Through the careful selection of materials, in the precision
                  of every detail, and the attention given to each step of the
                  process. Our interiors are built to stand the test of time,
                  both in durability and in their visual relevance.
                </p>
              </FadeIn>
            </div>

            <FadeIn
              direction="up"
              delay={200}
              className="relative aspect-[4/3] md:col-span-2"
            >
              <Image
                src={section1}
                alt="Rift workshop — craftsman at work"
                fill
                placeholder="blur"
                className="object-cover"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Section 2 — two images + text ── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="rift-container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10 lg:gap-14">
            {/* Image 1 — always visible */}
            <FadeIn direction="side" className="relative aspect-[7/10]">
              <Image
                src={section2a}
                alt="Rift interior craftsmanship"
                fill
                placeholder="blur"
                className="object-cover"
              />
            </FadeIn>

            {/* Image 2 — hidden on mobile */}
            <FadeIn
              direction="side"
              delay={100}
              className="relative hidden aspect-[7/10] md:block"
            >
              <Image
                src={section2b}
                alt="Rift custom furniture detail"
                fill
                placeholder="blur"
                className="object-cover"
              />
            </FadeIn>

            {/* Text block */}
            <div className="flex items-center">
              <FadeIn direction="up">
                <p className="text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed">
                  By combining design and craftsmanship, we maintain control
                  from concept to completion. This allows us to translate ideas
                  into spaces that feel coherent, considered, and deeply
                  connected to the people who use them.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
