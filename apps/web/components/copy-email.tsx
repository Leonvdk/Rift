"use client"

import { useState } from "react"

const EMAIL = "info@rift-furniture.nl"

export function CopyEmail() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard API unavailable — silently fail
    }
  }

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={handleCopy}
        className="transition-opacity duration-300 hover:opacity-50"
      >
        {EMAIL}
      </button>
      <span
        aria-live="polite"
        className={`pointer-events-none absolute left-0 top-full mt-1 whitespace-nowrap rounded bg-aubergine px-2 py-1 text-xs text-cream transition-opacity duration-300 ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        Email copied
      </span>
    </span>
  )
}
