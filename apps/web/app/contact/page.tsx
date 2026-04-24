"use client"

import Image from "next/image"
import { useState } from "react"
import { FadeIn } from "@/components/fade-in"

import contactImg from "@/public/images/rift-x-janita/Tom Bremer_Rift x Janita_Emmastraat_HR-6.jpg"

type FormStatus = "idle" | "success" | "error"

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle")

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

                {status !== "success" && (
                  <button
                    type="submit"
                    className="group -mt-4 inline-flex cursor-pointer items-center gap-2 self-start text-[clamp(0.938rem,1.1vw,1.125rem)] font-medium leading-relaxed transition-opacity duration-300 hover:opacity-60"
                  >
                    Send message
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </button>
                )}

                <div
                  aria-live="polite"
                  className={`-mt-4 text-[clamp(0.938rem,1.1vw,1.125rem)] leading-relaxed transition-opacity duration-500 ${
                    status === "idle" ? "h-0 opacity-0" : "opacity-100"
                  } ${status === "error" ? "text-[#a64040]" : ""}`}
                >
                  {status === "success" &&
                    "Thank you — your message has been sent."}
                  {status === "error" &&
                    "Something went wrong. Please try again or email us directly."}
                </div>
              </form>
            </FadeIn>

            {/* TEMPORARY — state testing */}
            <div className="mt-10 flex gap-4 border-t border-aubergine/20 pt-6 text-xs uppercase tracking-[0.15em]">
              <span className="opacity-50">Test states:</span>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="cursor-pointer underline-offset-4 hover:underline"
              >
                Idle
              </button>
              <button
                type="button"
                onClick={() => setStatus("success")}
                className="cursor-pointer underline-offset-4 hover:underline"
              >
                Success
              </button>
              <button
                type="button"
                onClick={() => setStatus("error")}
                className="cursor-pointer underline-offset-4 hover:underline"
              >
                Error
              </button>
            </div>
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
