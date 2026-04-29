"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { FadeIn } from "@/components/fade-in"
import { RiftStarburst } from "@/components/rift-starburst"
import { localeFromSegment, withLocale } from "@/lib/i18n"

const T = {
  nl: {
    body: "De pagina die je zoekt bestaat niet of is verplaatst.",
    home: "Terug naar home",
  },
  en: {
    body: "The page you’re looking for doesn’t exist or has been moved.",
    home: "Return home",
  },
} as const

export default function NotFound() {
  const params = useParams<{ locale: string }>()
  const locale = localeFromSegment(params?.locale)
  const t = T[locale]

  return (
    <section className="flex min-h-[70vh] items-center py-12 md:py-14 lg:py-16">
      <div className="rift-container">
        <div className="flex flex-col items-center text-center">
          <FadeIn direction="fade">
            <RiftStarburst className="mb-10 h-16 w-16 text-aubergine md:h-20 md:w-20" />
          </FadeIn>

          <FadeIn direction="up" delay={150}>
            <h1 className="font-sans text-[clamp(3.375rem,10vw,6rem)] font-medium tracking-normal leading-none">
              404
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={300}>
            <p className="mt-6 max-w-md text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed">
              {t.body}
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={450}>
            <Link
              href={withLocale(locale, "/")}
              className="mt-10 inline-block text-[clamp(0.938rem,1.1vw,1.125rem)] text-warm-gray underline-offset-4 transition-colors hover:text-aubergine hover:underline"
            >
              {t.home}
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
