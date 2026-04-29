import { FadeIn } from "@/components/fade-in"
import { RichText, isRichTextEmpty, type RichTextValue } from "@/components/rich-text"

type Props = {
  heading?: RichTextValue
  paragraphs?: { text: RichTextValue; id?: string | null }[] | null
}

export function RichTextSection({ heading, paragraphs }: Props) {
  const hasHeading = !isRichTextEmpty(heading)

  return (
    <section className="py-7 md:py-9 lg:py-12">
      <div className="rift-container max-w-3xl">
        {hasHeading && (
          <FadeIn direction="up">
            <RichText
              data={heading}
              tag="h2"
              className="mb-6 font-sans text-[clamp(1.4375rem,3vw,2.1875rem)] font-normal tracking-normal leading-tight md:mb-8"
            />
          </FadeIn>
        )}
        {paragraphs?.map((p, i) => (
          <FadeIn key={p.id ?? i} direction="up" delay={50 + i * 30}>
            <RichText
              data={p.text}
              className={`text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed ${
                i > 0 ? "mt-6" : ""
              }`}
            />
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
