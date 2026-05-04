import type { CollectionConfig } from "payload"
import sharp from "sharp"
import { isAdmin, isAdminOrEditor } from "../lib/access.ts"

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "alt",
    defaultColumns: ["filename", "alt", "mimeType", "filesize"],
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  upload: {
    mimeTypes: ["image/*", "video/*"],
    focalPoint: true,
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300 },
      { name: "card", width: 768, height: 1024 },
      { name: "hero", width: 1920, height: 1080 },
    ],
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        // Auto-fill alt from filename if blank.
        if (!data.alt && data.filename) {
          const base = String(data.filename).replace(/\.[^.]+$/, "")
          data.alt = base
            .replace(/[-_]+/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())
        }

        // Generate a tiny blur placeholder for new image uploads so
        // <Image placeholder="blur"> can render an instant preview while the
        // full image is loading. Skipped for videos and re-saves (no file).
        const file = req?.file
        const mime: string | undefined = file?.mimetype ?? data.mimeType
        const buffer: Buffer | undefined = file?.data
        if (buffer && mime?.startsWith("image/")) {
          try {
            const blurBuffer = await sharp(buffer)
              .resize(16, 16, { fit: "inside", withoutEnlargement: true })
              .webp({ quality: 40 })
              .toBuffer()
            data.blurDataURL = `data:image/webp;base64,${blurBuffer.toString(
              "base64",
            )}`
          } catch {
            // Sharp can fail on exotic formats — fall back silently; image
            // will just render without a blur preview.
          }
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      localized: true,
      required: true,
      admin: { description: "Descriptive alt text. Auto-filled from filename if blank." },
    },
    {
      name: "caption",
      type: "text",
      localized: true,
      admin: { description: "Optional caption shown beneath the image." },
    },
    {
      name: "blurDataURL",
      type: "text",
      admin: {
        hidden: true,
        readOnly: true,
        description:
          "Auto-generated tiny blurred preview (base64 webp). Used for <Image placeholder='blur'>.",
      },
    },
  ],
}
