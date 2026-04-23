"use client"

import Image from "next/image"
import { FadeIn } from "@/components/fade-in"

import contactImg from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-6.jpg"

export default function ContactPage() {
  return (
    <section className="py-16 md:py-24 lg:py-28">
      <div className="rift-container">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[3fr_2fr] md:gap-12 lg:gap-20">
          {/* ── Left column — contact details + form ── */}
          <div className="flex flex-col">
            <FadeIn direction="up">
              <div className="text-[clamp(0.938rem,1.1vw,1.125rem)] leading-relaxed">
                <p>Rift Furniture</p>
                <p>+31 (0) 6 57 56 48 93</p>
                <p>info@rift-furniture.nl</p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={150}>
              <form
                className="mt-20 flex flex-col gap-8 md:mt-24"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-[clamp(0.938rem,1.1vw,1.125rem)] leading-relaxed"
                  >
                    Your Email:
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="border-b border-aubergine bg-transparent py-2 outline-none transition-colors focus:border-aubergine/60"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-[clamp(0.938rem,1.1vw,1.125rem)] leading-relaxed"
                  >
                    Your Message:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={10}
                    className="border border-aubergine bg-transparent p-3 outline-none transition-colors focus:border-aubergine/60"
                  />
                </div>

                <button
                  type="submit"
                  className="self-start border border-aubergine bg-transparent px-10 py-3 text-xs font-medium uppercase tracking-[0.2em] text-aubergine transition-colors duration-300 hover:bg-aubergine hover:text-cream"
                >
                  Send message
                </button>
              </form>
            </FadeIn>
          </div>

          {/* ── Right column — portrait image ── */}
          <FadeIn direction="up" delay={200} className="relative aspect-[4/5] md:aspect-auto md:h-full md:min-h-[600px]">
            <Image
              src={contactImg}
              alt="Rift interior detail"
              fill
              placeholder="blur"
              className="object-cover"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
