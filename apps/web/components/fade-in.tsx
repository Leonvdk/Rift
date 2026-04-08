"use client"

import { useEffect, useRef, useState } from "react"

type Direction = "up" | "side" | "fade"

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  direction?: Direction
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const animationClass =
    direction === "up"
      ? "animate-fade-up"
      : direction === "side"
        ? "animate-fade-side"
        : "animate-fade-in"

  return (
    <div
      ref={ref}
      className={`${visible ? animationClass : "opacity-0"} ${className}`}
      style={{ animationDelay: visible ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  )
}
