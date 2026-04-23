import Link from "next/link"
import { FadeIn } from "@/components/fade-in"
import { RiftStarburst } from "@/components/rift-starburst"

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-20 md:py-28 lg:py-36">
      <div className="rift-container">
        <div className="flex flex-col items-center text-center">
          <FadeIn direction="fade">
            <RiftStarburst className="mb-10 h-16 w-16 text-aubergine md:h-20 md:w-20" />
          </FadeIn>

          <FadeIn direction="up" delay={150}>
            <h1 className="font-serif text-[clamp(4rem,10vw,8rem)] font-light leading-none">
              404
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={300}>
            <p className="mt-6 max-w-md text-[clamp(0.938rem,1.1vw,1.125rem)] font-normal leading-relaxed">
              The page you&rsquo;re looking for doesn&rsquo;t exist or has been
              moved.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={450}>
            <Link
              href="/"
              className="mt-10 inline-block text-[clamp(0.938rem,1.1vw,1.125rem)] text-warm-gray underline-offset-4 transition-colors hover:text-aubergine hover:underline"
            >
              Return home
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
