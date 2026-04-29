import { FadeIn } from "@/components/fade-in"

type Props = {
  heading?: string | null
  paragraphs?: { text: string; id?: string | null }[] | null
}

export function RichTextSection({ heading, paragraphs }: Props) {
  return (
    <section className="py-7 md:py-9 lg:py-12">
      <div className="rift-container max-w-3xl">
        {heading && (
          <FadeIn direction="up">
            <h2 className="mb-6 font-sans text-[clamp(1.4375rem,3vw,2.1875rem)] font-normal tracking-normal leading-tight md:mb-8">
              {heading}
            </h2>
          </FadeIn>
        )}
        {paragraphs?.map((p, i) => (
          <FadeIn key={p.id ?? i} direction="up" delay={50 + i * 30}>
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
    </section>
  )
}
