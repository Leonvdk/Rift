import Image from "next/image"
import { FadeIn } from "@/components/fade-in"
import { RiftStarburst } from "@/components/rift-starburst"
import { getMediaAlt, getMediaFocalPosition, getMediaUrl } from "@/lib/media"
import type { Media } from "@/payload-types"

type Props = {
  image?: number | Media | null
  caption?: string | null
  animateLogo?: boolean | null
}

export function HeroSection({ image, caption, animateLogo }: Props) {
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
          style={{ objectPosition: getMediaFocalPosition(image) }}
        />
      ) : (
        <div className="absolute inset-0 bg-aubergine" />
      )}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-7 text-cream md:pb-10 lg:pb-12">
        <RiftStarburst
          className="mt-[25px] mb-7 h-[125px] w-[125px] text-cream md:mb-10 lg:mb-12"
          animate={animateLogo !== false}
        />
        {caption && (
          <FadeIn direction="fade" delay={1700}>
            <h1 className="font-sans text-[clamp(1.9375rem,5vw,3.4375rem)] font-normal tracking-normal leading-none">
              {caption}
            </h1>
          </FadeIn>
        )}
      </div>
    </section>
  )
}
