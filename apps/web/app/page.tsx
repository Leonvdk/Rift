import { FadeIn } from "@/components/fade-in"
import { RiftStarburst } from "@/components/rift-starburst"

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-aubergine md:h-[85vh]">
        {/* Replace this div with an <Image> when photography is available */}
        <div className="absolute inset-0 bg-gradient-to-br from-aubergine via-[#3a3032] to-[#4a3a2a] opacity-90" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end pb-12 text-cream md:pb-16 lg:pb-20">
          <RiftStarburst className="mb-6 h-24 w-24 text-cream md:h-32 md:w-32" />
          <FadeIn direction="fade" delay={1700}>
            <h1 className="font-sans text-lg font-normal tracking-wide md:text-2xl lg:text-3xl">
              Interior, Craft &amp; Design
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* We are Rift — text 1/4, image 3/4 */}
      <section className="px-[var(--spacing-edge)] pb-[80px] pt-[40px] md:px-[var(--spacing-edge-md)] lg:px-[var(--spacing-edge-lg)] lg:pb-[120px] lg:pt-[60px]">
        <FadeIn direction="side">
          <h2 className="mb-6 font-serif text-4xl font-light md:mb-6 md:text-5xl lg:text-6xl">
            We are Rift
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="pb-10 pr-6 md:col-span-1 md:pb-0 md:pr-10 lg:pr-14">
          <FadeIn direction="up" delay={150}>
            <p className="text-base leading-relaxed md:text-lg">
              At Rift, we create interiors where design, craftsmanship &amp;
              detail come together. From the first idea to the final finish we
              transform ideas into refined and distinctive interiors.
            </p>
          </FadeIn>
        </div>
        <FadeIn direction="up" delay={200} className="relative aspect-[4/3] md:col-span-3">
          {/* Replace with <Image> when photography is available */}
          <div className="absolute inset-0 bg-gradient-to-br from-aubergine via-[#3a3032] to-[#4a3a2a]" />
        </FadeIn>
        </div>
      </section>

      {/* Two images + Quote — 3 columns on desktop */}
      <section className="grid grid-cols-1 gap-6 px-[var(--spacing-edge)] py-[80px] md:grid-cols-3 md:gap-10 md:px-[var(--spacing-edge-md)] lg:px-[var(--spacing-edge-lg)] lg:py-[120px]">
        <FadeIn direction="side" className="relative aspect-[3/5]">
          <div className="absolute inset-0 bg-gradient-to-br from-aubergine via-[#3a3032] to-[#4a3a2a]" />
        </FadeIn>
        <FadeIn direction="side" delay={100} className="relative aspect-[3/5]">
          <div className="absolute inset-0 bg-gradient-to-bl from-aubergine via-[#3a3032] to-[#4a3a2a]" />
        </FadeIn>
        <div className="flex items-center py-10 md:py-0">
          <div>
            <FadeIn direction="up">
              <p className="text-base leading-relaxed md:text-lg">
                We believe that exceptional interiors start with listening &amp;
                understanding. At Rift we strive to create spaces that are
                timeless, thoughtful &amp; refined. Crafted to be lived in and
                enjoyed every day.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={150}>
              <p className="mt-8 text-sm font-medium uppercase tracking-widest">
                RIFT
              </p>
              <p className="mt-1 font-serif text-lg italic md:text-xl">
                &ldquo;Where ideas take shape in timeless interiors&rdquo;
              </p>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
