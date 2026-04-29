import Image from "next/image"
import { FadeIn } from "@/components/fade-in"
import { RiftStarburst } from "@/components/rift-starburst"
import { getMediaAlt, getMediaUrl } from "@/lib/media"
import type { Media } from "@/payload-types"

type Props = {
  image?: number | Media | null
  caption?: string | null
  showStarburst?: boolean | null
}

export function HeroSection({ image, caption, showStarburst }: Props) {
  const url = getMediaUrl(image)
  const alt = getMediaAlt(image, caption ?? "Rift")

  return (
    <section className="relative h-[75vh] min-h-[480px] overflow-hidden bg-aubergine md:h-[85vh]">
      {url ? (
        <Image
          src={url}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-aubergine" />
      )}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-14 text-cream md:pb-20 lg:pb-24">
        {showStarburst !== false && (
          <RiftStarburst className="mb-6 h-20 w-20 text-cream md:mb-8 md:h-28 md:w-28 lg:h-32 lg:w-32" />
        )}
        {caption && (
          <FadeIn direction="fade" delay={1700}>
            <h1 className="font-sans text-[clamp(1.625rem,5vw,2.625rem)] font-normal tracking-normal leading-none">
              {caption}
            </h1>
          </FadeIn>
        )}
      </div>
    </section>
  )
}
