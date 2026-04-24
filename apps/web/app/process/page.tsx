import Image from "next/image"
import { FadeIn } from "@/components/fade-in"

import img1 from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-1.jpg"
import img2a from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-3.jpg"
import img2b from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-5.jpg"
import img4 from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-12.jpg"
import img5a from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-14.jpg"
import img5b from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-15.jpg"

export default function ProcessPage() {
  return (
    <>
      {/* ── 1. Introduction — single image LEFT, text RIGHT ── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="rift-container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12 lg:gap-16">
            <div className="flex flex-col justify-center md:col-span-1 md:order-last">
              <FadeIn direction="side" delay={100}>
                <h2 className="mb-6 font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-tight">
                  1. Introduction
                </h2>
              </FadeIn>
              <FadeIn direction="up" delay={200}>
                <p className="text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed">
                  Every project begins with a conversation. We take the time to
                  understand your needs, preferences, and how you use your
                  space. Through an initial call and meeting, you get a first
                  feel for materials, possibilities, and direction. We then
                  follow up with a clear proposal and an initial cost
                  indication.
                </p>
              </FadeIn>
            </div>

            <FadeIn
              direction="up"
              className="relative aspect-[4/3] md:col-span-3"
            >
              <Image
                src={img1}
                alt="Introduction — initial meeting"
                fill
                placeholder="blur"
                className="object-cover"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 2. Design — text LEFT, double image RIGHT ── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="rift-container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10 lg:gap-14">
            <div className="flex items-center">
              <div>
                <FadeIn direction="side">
                  <h2 className="mb-6 font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-tight">
                    2. Design
                  </h2>
                </FadeIn>
                <FadeIn direction="up" delay={150}>
                  <p className="text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed">
                    This is where ideas start to take form. We translate your
                    input into a cohesive design, bringing together layout,
                    materials, and atmosphere. You receive a visual
                    presentation that gives a clear sense of the final result.
                    After alignment, the design is refined into detailed
                    technical drawings.
                  </p>
                </FadeIn>
              </div>
            </div>

            <FadeIn direction="side" delay={100} className="relative aspect-[7/10]">
              <Image
                src={img2a}
                alt="Design sketch"
                fill
                placeholder="blur"
                className="object-cover"
              />
            </FadeIn>
            <FadeIn
              direction="side"
              delay={180}
              className="relative hidden aspect-[7/10] md:block"
            >
              <Image
                src={img2b}
                alt="Design detail"
                fill
                placeholder="blur"
                className="object-cover"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 3. Production — text LEFT, single image RIGHT ── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="rift-container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12 lg:gap-16">
            <div className="flex flex-col justify-center md:col-span-1">
              <FadeIn direction="side">
                <h2 className="mb-6 font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-tight">
                  3. Production
                </h2>
              </FadeIn>
              <FadeIn direction="up" delay={150}>
                <p className="text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed">
                  The design is brought to life. During production, every
                  element is carefully crafted with precision and attention to
                  detail, ensuring quality at every stage.
                </p>
              </FadeIn>
            </div>

            <FadeIn
              direction="up"
              delay={200}
              className="relative aspect-[4/3] md:col-span-3"
            >
              <Image
                src={img4}
                alt="Production — workshop"
                fill
                placeholder="blur"
                className="object-cover"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 4. Installation — double image LEFT, text RIGHT ── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="rift-container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10 lg:gap-14">
            <div className="flex items-center md:order-last">
              <div>
                <FadeIn direction="side">
                  <h2 className="mb-6 font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-tight">
                    4. Installation
                  </h2>
                </FadeIn>
                <FadeIn direction="up" delay={150}>
                  <p className="text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed">
                    On site, everything comes together. The installation is
                    carried out with care and precision, resulting in an
                    interior that feels balanced, personal, and complete.
                  </p>
                </FadeIn>
              </div>
            </div>

            <FadeIn direction="side" className="relative aspect-[7/10]">
              <Image
                src={img5a}
                alt="Installation — fitting"
                fill
                placeholder="blur"
                className="object-cover"
              />
            </FadeIn>
            <FadeIn
              direction="side"
              delay={100}
              className="relative hidden aspect-[7/10] md:block"
            >
              <Image
                src={img5b}
                alt="Installation — completion"
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
