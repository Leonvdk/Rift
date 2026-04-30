import type { CollectionConfig } from "payload"
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
      ({ data }) => {
        if (!data.alt && data.filename) {
          const base = String(data.filename).replace(/\.[^.]+$/, "")
          data.alt = base.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
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
  ],
}
