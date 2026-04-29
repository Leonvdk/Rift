import type { CollectionConfig } from "payload"
import { isAdmin, isAdminOrEditor, publicReadOrLoggedIn } from "../lib/access.ts"
import { revalidatePageSlug } from "../lib/revalidate.ts"
import {
  HeroBlock,
  TextWithImageBlock,
  TwoImagesQuoteBlock,
  ProcessStepBlock,
  RichTextBlock,
} from "../blocks/index.ts"

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "status", "updatedAt"],
  },
  access: {
    read: publicReadOrLoggedIn,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [
      ({ doc, previousDoc }) => {
        if (doc.slug) revalidatePageSlug(doc.slug)
        // Slug rename — also drop the old path so it's no longer cached.
        if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
          revalidatePageSlug(previousDoc.slug)
        }
      },
    ],
    afterDelete: [
      ({ doc }) => {
        if (doc?.slug) revalidatePageSlug(doc.slug)
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
        description: "URL path. Use 'home' for the homepage. Same across locales.",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "layout",
      type: "blocks",
      blocks: [
        HeroBlock,
        TextWithImageBlock,
        TwoImagesQuoteBlock,
        ProcessStepBlock,
        RichTextBlock,
      ],
      admin: { description: "Compose this page by stacking blocks." },
    },
    {
      name: "meta",
      type: "group",
      fields: [
        { name: "title", type: "text", localized: true, required: true },
        { name: "description", type: "textarea", localized: true, required: true },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
  ],
}
