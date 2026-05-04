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

/**
 * Returns the focal point as a CSS `object-position` value (e.g. `50% 30%`).
 * Falls back to `center` when no focal point is set or media isn't populated.
 *
 * Use on any <Image className="object-cover"> so the editor's chosen focal
 * point — not the geometric center — survives cropping into the container.
 */
export function getMediaFocalPosition(media: MediaInput): string {
  if (!media || typeof media === "number") return "center"
  const x = media.focalX
  const y = media.focalY
  if (typeof x !== "number" || typeof y !== "number") return "center"
  return `${x}% ${y}%`
}

/**
 * Returns the auto-generated blur preview (a base64 webp data URL) so
 * `<Image placeholder="blur" blurDataURL={...}>` can render an instant
 * placeholder while the full image streams in. Returns `undefined` when the
 * media doc has no preview yet (older uploads), in which case the caller
 * should skip `placeholder="blur"`.
 */
export function getMediaBlurDataURL(media: MediaInput): string | undefined {
  if (!media || typeof media === "number") return undefined
  return media.blurDataURL ?? undefined
}
