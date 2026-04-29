import type { Media } from "../payload-types.ts"

type MediaInput = number | Media | null | undefined

export function getMediaUrl(media: MediaInput): string | null {
  if (!media || typeof media === "number") return null
  return media.url ?? null
}

export function getMediaAlt(media: MediaInput, fallback = ""): string {
  if (!media || typeof media === "number") return fallback
  return media.alt ?? fallback
}

export function getMediaDoc(media: MediaInput): Media | null {
  if (!media || typeof media === "number") return null
  return media
}
