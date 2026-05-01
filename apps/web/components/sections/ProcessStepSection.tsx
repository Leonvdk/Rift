import Image from "next/image"
import { FadeIn } from "@/components/fade-in"
import { getMediaAlt, getMediaFocalPosition, getMediaUrl } from "@/lib/media"
import type { Media } from "@/payload-types"

type Props = {
  stepNumber?: string | null
  title?: string | null
  description?: string | null
  imagePosition?: ("left" | "right") | null
  imageOne?: number | Media | null
  imageTwo?: number | Media | null
  ratio?: ("third" | "quarter") | null
  textVerticalAlign?: ("top" | "center" | "bottom") | null
}

const ALIGN_FLEX = {
  top: "items-start",
  center: "items-center",
  bottom: "items-end",
}

const ALIGN_COL = {
  top: "justify-start",
  center: "justify-center",
  bottom: "justify-end",
}

export function ProcessStepSection({
  stepNumber,
  title,
  description,
  imagePosition,
  imageOne,
  imageTwo,
  ratio,
  textVerticalAlign,
}: Props) {
  const url1 = getMediaUrl(imageOne)
  const url2 = getMediaUrl(imageTwo)
  const alt1 = getMediaAlt(imageOne, title ?? "")
  const alt2 = getMediaAlt(imageTwo, title ?? "")
  const imageOnLeft = imagePosition === "left"
  const isDouble = Boolean(imageTwo)
  const isQuarter = ratio === "quarter"
  const align = textVerticalAlign ?? "center"
  const flexAlignClass = ALIGN_FLEX[align]
  const colAlignClass = ALIGN_COL[align]
  const isTop = align === "top"
  const topOffsetClass = isTop ? "md:-mt-[10px]" : ""

  const headingMarkup = (
    <h2 className="mb-6 font-sans text-[clamp(1.4375rem,3vw,2.1875rem)] font-normal tracking-normal leading-tight">
      {stepNumber ? `${stepNumber} ${title}` : title}
    </h2>
  )

  if (isDouble) {
    // text + img + img — `third` keeps even split, `quarter` narrows the text
    const doubleGridClass = isQuarter
      ? "md:grid-cols-[1fr_1.5fr_1.5fr]"
      : "md:grid-cols-3"
    return (
      <section className="py-7 md:py-9 lg:py-12">
        <div className="rift-container">
          <div className={`grid grid-cols-1 gap-8 ${doubleGridClass} md:gap-5 lg:gap-9`}>
            <div
              className={`flex ${flexAlignClass} ${imageOnLeft ? "md:order-last" : ""}`}
            >
              <div className={topOffsetClass}>
                <FadeIn direction="side">{headingMarkup}</FadeIn>
                <FadeIn direction="up" delay={150}>
                  <p className="text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed">
                    {description}
                  </p>
                </FadeIn>
              </div>
            </div>

            <FadeIn direction="side" delay={100} className="relative aspect-[6/10]">
              {url1 ? (
                <Image
                  src={url1}
                  alt={alt1}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: getMediaFocalPosition(imageOne) }}
                />
              ) : (
                <div className="absolute inset-0 bg-warm-gray/10" />
              )}
            </FadeIn>
            <FadeIn
              direction="side"
              delay={180}
              className="relative hidden aspect-[6/10] md:block"
            >
              {url2 ? (
                <Image
                  src={url2}
                  alt={alt2}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: getMediaFocalPosition(imageTwo) }}
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

  // Single image: text col-1, image col-2 (third) or col-3 (quarter)
  const singleGridCols = isQuarter ? "md:grid-cols-4" : "md:grid-cols-3"
  const singleImageColSpan = isQuarter ? "md:col-span-3" : "md:col-span-2"
  return (
    <section className="py-7 md:py-9 lg:py-12">
      <div className="rift-container">
        <div className={`grid grid-cols-1 gap-8 ${singleGridCols} md:gap-12 lg:gap-16`}>
          <div
            className={`flex flex-col ${colAlignClass} md:col-span-1 ${
              imageOnLeft ? "md:order-last" : ""
            } ${topOffsetClass}`}
          >
            <FadeIn direction="side" delay={100}>
              {headingMarkup}
            </FadeIn>
            <FadeIn direction="up" delay={200}>
              <p className="text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed">
                {description}
              </p>
            </FadeIn>
          </div>

          <FadeIn
            direction="up"
            delay={150}
            className={`relative aspect-[4/3] ${singleImageColSpan}`}
          >
            {url1 ? (
              <Image
                src={url1}
                alt={alt1}
                fill
                sizes="(min-width: 768px) 75vw, 100vw"
                className="object-cover"
                style={{ objectPosition: getMediaFocalPosition(imageOne) }}
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
