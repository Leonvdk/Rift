import Image from "next/image"
import { FadeIn } from "@/components/fade-in"
import { getMediaAlt, getMediaUrl } from "@/lib/media"
import type { Media } from "@/payload-types"

type Props = {
  imageOne?: number | Media | null
  imageTwo?: number | Media | null
  paragraphs?: { text: string; id?: string | null }[] | null
}

export function FloatedImagePairSection({
  imageOne,
  imageTwo,
  paragraphs,
}: Props) {
  const url1 = getMediaUrl(imageOne)
  const url2 = getMediaUrl(imageTwo)
  const alt1 = getMediaAlt(imageOne)
  const alt2 = getMediaAlt(imageTwo)

  return (
    <section className="pt-10 pb-20 md:pt-14 md:pb-28 lg:pt-6 lg:pb-12">
      <div className="rift-container">
        <FadeIn
          direction="up"
          className="mb-8 flex gap-4 md:float-right md:mb-4 md:ml-10 md:w-2/3 md:gap-5 lg:ml-14 lg:gap-9"
        >
          <div className="relative hidden aspect-[6/10] flex-1 md:block">
            {url1 ? (
              <Image
                src={url1}
                alt={alt1}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-warm-gray/10" />
            )}
          </div>
          <div className="relative aspect-[6/10] flex-1">
            {url2 ? (
              <Image
                src={url2}
                alt={alt2}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-warm-gray/10" />
            )}
          </div>
        </FadeIn>

        <FadeIn direction="up">
          {paragraphs?.map((p, i) => (
            <p
              key={p.id ?? i}
              className={`text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed ${
                i > 0 ? "mt-6" : ""
              }`}
            >
              {p.text}
            </p>
          ))}
        </FadeIn>

        <div className="clear-both" />
      </div>
    </section>
  )
}
