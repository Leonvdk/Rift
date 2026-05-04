import Image, { type ImageProps } from "next/image"
import {
  getMediaAlt,
  getMediaBlurDataURL,
  getMediaFocalPosition,
  getMediaUrl,
} from "@/lib/media"
import type { Media } from "@/payload-types"

type Props = Omit<ImageProps, "src" | "alt" | "blurDataURL"> & {
  media: number | Media | null | undefined
  /** Falls back to media.alt if not provided. */
  alt?: string
  /** When true, applies `style={{ objectPosition }}` from the media's focal point. */
  applyFocalPosition?: boolean
}

/**
 * Wraps next/image for CMS-driven Media. Pulls URL / alt / blur preview /
 * focal point from the Media doc so callers don't have to repeat the same
 * five helpers everywhere.
 *
 * Renders nothing if the media has no resolvable URL — the caller decides
 * what to show in that case (typically a neutral placeholder div).
 */
export function MediaImage({
  media,
  alt: altOverride,
  applyFocalPosition,
  style,
  ...rest
}: Props) {
  const url = getMediaUrl(media)
  if (!url) return null

  const alt = altOverride ?? getMediaAlt(media)
  const blurDataURL = getMediaBlurDataURL(media)
  const objectPosition = applyFocalPosition
    ? getMediaFocalPosition(media)
    : undefined

  return (
    <Image
      src={url}
      alt={alt}
      {...(blurDataURL ? { placeholder: "blur" as const, blurDataURL } : {})}
      style={objectPosition ? { ...style, objectPosition } : style}
      {...rest}
    />
  )
}
