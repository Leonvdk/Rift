import Image from "next/image"
import { FadeIn } from "@/components/fade-in"
import { RichText, isRichTextEmpty, type RichTextValue } from "@/components/rich-text"
import { getMediaAlt, getMediaUrl } from "@/lib/media"
import type { Media } from "@/payload-types"

type Props = {
  leadingText?: RichTextValue
  quote?: RichTextValue
  attributionLabel?: string | null
  imageOne?: number | Media | null
  imageTwo?: number | Media | null
  quotePosition?: ("left" | "right") | null
  textVerticalAlign?: ("top" | "center" | "bottom") | null
}

const ALIGN_CLASS = {
  top: "items-start",
  center: "items-center",
  bottom: "items-end",
}

export function TwoImagesQuoteSection({
  leadingText,
  quote,
  attributionLabel,
  imageOne,
  imageTwo,
  quotePosition,
  textVerticalAlign,
}: Props) {
  const url1 = getMediaUrl(imageOne)
  const url2 = getMediaUrl(imageTwo)
  const alt1 = getMediaAlt(imageOne, "Rift interior craftsmanship")
  const alt2 = getMediaAlt(imageTwo, "Rift custom furniture detail")
  const quoteOnRight = quotePosition !== "left"
  const alignClass = ALIGN_CLASS[textVerticalAlign ?? "center"]

  return (
    <section className="py-7 md:py-9 lg:py-12">
      <div className="rift-container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-5 lg:gap-9">
          <div
            className={`flex ${alignClass} ${quoteOnRight ? "md:order-last" : ""}`}
          >
            <div>
              {!isRichTextEmpty(leadingText) && (
                <FadeIn direction="up">
                  <RichText
                    data={leadingText}
                    className="text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed"
                  />
                </FadeIn>
              )}
              {(attributionLabel || !isRichTextEmpty(quote)) && (
                <FadeIn direction="up" delay={150}>
                  <div className="mt-10 font-sans text-[clamp(1.063rem,1.3vw,1.25rem)] font-medium">
                    {attributionLabel && <span>{attributionLabel} </span>}
                    {!isRichTextEmpty(quote) && (
                      <span className="inline">
                        &ldquo;
                        <RichText data={quote} tag="span" />
                        &rdquo;
                      </span>
                    )}
                  </div>
                </FadeIn>
              )}
            </div>
          </div>

          <FadeIn direction="side" className="relative aspect-[6/10]">
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
          </FadeIn>

          <FadeIn
            direction="side"
            delay={100}
            className="relative hidden aspect-[6/10] md:block"
          >
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
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
