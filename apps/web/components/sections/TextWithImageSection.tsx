import Image from "next/image"
import { FadeIn } from "@/components/fade-in"
import { getMediaAlt, getMediaFocalPosition, getMediaUrl } from "@/lib/media"
import type { Media } from "@/payload-types"

type Props = {
  heading?: string | null
  paragraphs?: { text: string; id?: string | null }[] | null
  image?: number | Media | null
  video?: number | Media | null
  imagePosition?: ("left" | "right") | null
  ratio?: ("third" | "quarter") | null
  textVerticalAlign?: ("top" | "center" | "bottom") | null
}

const ALIGN_CLASS = {
  top: "items-start",
  center: "items-center",
  bottom: "items-end",
}

export function TextWithImageSection({
  heading,
  paragraphs,
  image,
  video,
  imagePosition,
  ratio,
  textVerticalAlign,
}: Props) {
  const imageUrl = getMediaUrl(image)
  const videoUrl = getMediaUrl(video)
  const alt = getMediaAlt(image, heading ?? "")
  const textOnLeft = imagePosition !== "left"
  const isQuarter = ratio === "quarter"
  const alignClass = ALIGN_CLASS[textVerticalAlign ?? "center"]

  // Quarter: 4-col grid with text col-span-1, image col-span-3
  // Third (default): 3-col grid with text col-span-1, image col-span-2
  const gridCols = isQuarter ? "md:grid-cols-4" : "md:grid-cols-3"
  const imageColSpan = isQuarter ? "md:col-span-3" : "md:col-span-2"
  const textColSpan = "md:col-span-1"

  const sizes = isQuarter
    ? "(min-width: 768px) 75vw, 100vw"
    : "(min-width: 768px) 67vw, 100vw"

  return (
    <section className="py-7 md:py-9 lg:py-12">
      <div className="rift-container">
        {heading && (
          <FadeIn direction="side">
            <h2 className="mb-6 font-sans text-[clamp(1.9375rem,5vw,3.4375rem)] font-normal tracking-normal leading-none md:mb-8">
              {heading}
            </h2>
          </FadeIn>
        )}

        <div className={`grid grid-cols-1 gap-8 ${gridCols} md:gap-12 lg:gap-16`}>
          <div
            className={`${textColSpan} flex ${alignClass} ${
              textOnLeft ? "" : "md:order-last"
            }`}
          >
            <div>
              {paragraphs?.map((p, i) => (
                <FadeIn key={p.id ?? i} direction="up" delay={150 + i * 50}>
                  <p
                    className={`text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed ${
                      i > 0 ? "mt-6" : ""
                    }`}
                  >
                    {p.text}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn
            direction="up"
            delay={200}
            className={`relative aspect-[4/3] ${imageColSpan}`}
          >
            {videoUrl ? (
              <video
                src={videoUrl}
                poster={imageUrl ?? undefined}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : imageUrl ? (
              <Image
                src={imageUrl}
                alt={alt}
                fill
                sizes={sizes}
                className="object-cover"
                style={{ objectPosition: getMediaFocalPosition(image) }}
              />
            ) : (
              <div className="absolute inset-0 bg-warm-gray/10" />
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
