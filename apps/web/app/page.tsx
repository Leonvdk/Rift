import { FadeIn } from "@/components/fade-in"
import { RiftStarburst } from "@/components/rift-starburst"

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[75vh] min-h-[480px] overflow-hidden bg-aubergine md:h-[85vh]">
        {/* Replace with <Image> when photography is available */}
        <div className="absolute inset-0 bg-gradient-to-br from-aubergine via-[#3a3032] to-[#4a3a2a] opacity-90" />

        <div className="relative z-10 flex h-full flex-col items-center justify-end pb-14 text-cream md:pb-20 lg:pb-24">
          <RiftStarburst className="mb-6 h-20 w-20 text-cream md:mb-8 md:h-28 md:w-28 lg:h-32 lg:w-32" />
          <FadeIn direction="fade" delay={1700}>
            <h1 className="font-sans text-base font-light tracking-[0.15em] md:text-lg lg:text-xl">
              Interior, Craft &amp; Design
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* ── We are Rift — text 1/4, image 3/4 ── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="rift-container">
          <FadeIn direction="side">
            <h2 className="mb-8 font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-none md:mb-12">
              We are Rift
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12 lg:gap-16">
            <div className="md:col-span-1">
              <FadeIn direction="up" delay={150}>
                <p className="text-[clamp(0.938rem,1.1vw,1.125rem)] font-light leading-relaxed">
                  At Rift, we create interiors where design, craftsmanship &amp;
                  detail come together. From the first idea to the final finish
                  we transform ideas into refined and distinctive interiors.
                </p>
              </FadeIn>
            </div>

            <FadeIn
              direction="up"
              delay={200}
              className="relative aspect-[4/3] md:col-span-3"
            >
              {/* Replace with <Image> when photography is available */}
              <div className="absolute inset-0 bg-gradient-to-br from-aubergine via-[#3a3032] to-[#4a3a2a]" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Two images + Quote ── */}
      {/* On mobile: show one image + quote. On desktop: two images + quote in 3 cols */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="rift-container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10 lg:gap-14">
            {/* Image 1 — always visible */}
            <FadeIn direction="side" className="relative aspect-[7/10]">
              <div className="absolute inset-0 bg-gradient-to-br from-aubergine via-[#3a3032] to-[#4a3a2a]" />
            </FadeIn>

            {/* Image 2 — hidden on mobile */}
            <FadeIn
              direction="side"
              delay={100}
              className="relative hidden aspect-[7/10] md:block"
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-aubergine via-[#3a3032] to-[#4a3a2a]" />
            </FadeIn>

            {/* Quote block */}
            <div className="flex items-center">
              <div>
                <FadeIn direction="up">
                  <p className="text-[clamp(0.938rem,1.1vw,1.125rem)] font-light leading-relaxed">
                    We believe that exceptional interiors start with listening
                    &amp; understanding. At Rift we strive to create spaces that
                    are timeless, thoughtful &amp; refined. Crafted to be lived
                    in and enjoyed every day.
                  </p>
                </FadeIn>
                <FadeIn direction="up" delay={150}>
                  <p className="mt-10 text-xs font-medium uppercase tracking-[0.2em]">
                    RIFT
                  </p>
                  <p className="mt-1.5 font-serif text-[clamp(1.063rem,1.3vw,1.25rem)] italic">
                    &ldquo;Where ideas take shape in timeless
                    interiors&rdquo;
                  </p>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
