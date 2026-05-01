import type { Page, Project } from "@/payload-types"
import { HeroSection } from "@/components/sections/HeroSection"
import { TextWithImageSection } from "@/components/sections/TextWithImageSection"
import { TwoImagesQuoteSection } from "@/components/sections/TwoImagesQuoteSection"
import { ProcessStepSection } from "@/components/sections/ProcessStepSection"
import { FloatedImagePairSection } from "@/components/sections/FloatedImagePairSection"
import { RichTextSection } from "@/components/sections/RichTextSection"

type AnyBlock =
  | NonNullable<Page["layout"]>[number]
  | NonNullable<Project["layout"]>[number]

type Props = {
  blocks?: AnyBlock[] | null
}

export function BlockRenderer({ blocks }: Props) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, i) => {
        if ("enabled" in block && block.enabled === false) return null
        const key = block.id ?? `${block.blockType}-${i}`

        switch (block.blockType) {
          case "hero":
            return (
              <HeroSection
                key={key}
                image={block.image}
                caption={block.caption}
                showStarburst={block.showStarburst}
              />
            )
          case "textWithImage":
            return (
              <TextWithImageSection
                key={key}
                heading={block.heading}
                paragraphs={block.paragraphs}
                image={block.image}
                video={block.video}
                imagePosition={block.imagePosition}
                ratio={block.ratio}
                textVerticalAlign={block.textVerticalAlign}
              />
            )
          case "twoImagesQuote":
            return (
              <TwoImagesQuoteSection
                key={key}
                leadingText={block.leadingText}
                quote={block.quote}
                attributionLabel={block.attributionLabel}
                imageOne={block.imageOne}
                imageTwo={block.imageTwo}
                quotePosition={block.quotePosition}
                ratio={block.ratio}
                textVerticalAlign={block.textVerticalAlign}
              />
            )
          case "processStep":
            return (
              <ProcessStepSection
                key={key}
                stepNumber={block.stepNumber}
                title={block.title}
                description={block.description}
                imagePosition={block.imagePosition}
                imageOne={block.imageOne}
                imageTwo={block.imageTwo}
                ratio={block.ratio}
                textVerticalAlign={block.textVerticalAlign}
              />
            )
          case "floatedImagePair":
            return (
              <FloatedImagePairSection
                key={key}
                imageOne={block.imageOne}
                imageTwo={block.imageTwo}
                imagesPosition={block.imagesPosition}
                ratio={block.ratio}
                paragraphs={block.paragraphs}
              />
            )
          case "richText":
            return (
              <RichTextSection
                key={key}
                heading={block.heading}
                paragraphs={block.paragraphs}
              />
            )
          default:
            return null
        }
      })}
    </>
  )
}
