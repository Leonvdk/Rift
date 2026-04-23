import Image from "next/image"
import { FadeIn } from "@/components/fade-in"

import img1 from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-1.jpg"
import img2a from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-3.jpg"
import img2b from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-5.jpg"
import img3a from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-8.jpg"
import img3b from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-10.jpg"
import img4 from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-12.jpg"
import img5a from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-14.jpg"
import img5b from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-15.jpg"

export default function ProcessPage() {
  return (
    <>
      {/* ── 1. Getting Acquainted — single image LEFT, text RIGHT ── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="rift-container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12 lg:gap-16">
            <div className="flex flex-col justify-center md:col-span-1 md:order-last">
              <FadeIn direction="side" delay={100}>
                <h2 className="mb-6 font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-tight">
                  1. Getting Acquainted
                </h2>
              </FadeIn>
              <FadeIn direction="up" delay={200}>
                <p className="text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed">
                  Every project starts with a meeting. We explore your needs,
                  preferences, and the way you use your space. Through an
                  initial call and a visit to discover possibilities and
                  direction, we follow up with a clear proposal and initial
                  inspiration.
                </p>
              </FadeIn>
            </div>

            <FadeIn
              direction="up"
              className="relative aspect-[4/3] md:col-span-3"
            >
              <Image
                src={img1}
                alt="Getting acquainted — initial meeting"
                fill
                placeholder="blur"
                className="object-cover"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 2. Concept & Design — text LEFT, double image RIGHT ── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="rift-container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10 lg:gap-14">
            <div className="flex items-center">
              <div>
                <FadeIn direction="side">
                  <h2 className="mb-6 font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-tight">
                    2. Concept &amp; Design
                  </h2>
                </FadeIn>
                <FadeIn direction="up" delay={150}>
                  <p className="text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed">
                    Ideas begin to take shape. We translate your inputs into a
                    considered design, combining proven materials and
                    atmosphere. You receive a visual concept that gives a
                    clear sense of the final interior, the design refined
                    through technical drawings.
                  </p>
                </FadeIn>
              </div>
            </div>

            <FadeIn direction="side" delay={100} className="relative aspect-[7/10]">
              <Image
                src={img2a}
                alt="Concept & design sketch"
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
                alt="Concept & design detail"
                fill
                placeholder="blur"
                className="object-cover"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 3. Detailing — double image LEFT, text RIGHT ── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="rift-container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10 lg:gap-14">
            <div className="flex items-center md:order-last">
              <div>
                <FadeIn direction="side">
                  <h2 className="mb-6 font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-tight">
                    3. Detailing
                  </h2>
                </FadeIn>
                <FadeIn direction="up" delay={150}>
                  <p className="text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed">
                    With the design set, we focus on precision. We take your
                    measurements on site and develop the project into technical
                    detail drawings, ensuring everything is prepared for a
                    seamless execution.
                  </p>
                </FadeIn>
              </div>
            </div>

            <FadeIn direction="side" className="relative aspect-[7/10]">
              <Image
                src={img3a}
                alt="Detailing — craftsmanship"
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
                src={img3b}
                alt="Detailing — joinery"
                fill
                placeholder="blur"
                className="object-cover"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 4. Craft & Production — text LEFT, single image RIGHT ── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="rift-container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12 lg:gap-16">
            <div className="flex flex-col justify-center md:col-span-1">
              <FadeIn direction="side">
                <h2 className="mb-6 font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-tight">
                  4. Craft &amp; Production
                </h2>
              </FadeIn>
              <FadeIn direction="up" delay={150}>
                <p className="text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed">
                  The design moves into production, where each element is
                  handled with care and attention by our master craftsmen.
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
                alt="Craft & production — workshop"
                fill
                placeholder="blur"
                className="object-cover"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 5. Installation — double image LEFT, text RIGHT ── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="rift-container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10 lg:gap-14">
            <div className="flex items-center md:order-last">
              <div>
                <FadeIn direction="side">
                  <h2 className="mb-6 font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-tight">
                    5. Installation
                  </h2>
                </FadeIn>
                <FadeIn direction="up" delay={150}>
                  <p className="text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed">
                    We bring everything together on site. The final
                    installation is executed with care and precision, resulting
                    in a space that feels distinctive, personal, and complete.
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
