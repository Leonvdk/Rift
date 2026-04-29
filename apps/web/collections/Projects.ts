import type { CollectionConfig } from "payload"
import { isAdmin, isAdminOrEditor, publicReadOrLoggedIn } from "../lib/access.ts"
import { revalidateProjectSlug } from "../lib/revalidate.ts"
import {
  TextWithImageBlock,
  FloatedImagePairBlock,
  RichTextBlock,
} from "../blocks/index.ts"

export const Projects: CollectionConfig = {
  slug: "projects",
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
        if (doc.slug) revalidateProjectSlug(doc.slug)
        if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
          revalidateProjectSlug(previousDoc.slug)
        }
      },
    ],
    afterDelete: [
      ({ doc }) => {
        if (doc?.slug) revalidateProjectSlug(doc.slug)
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
        description: "URL path under /projects/. Same across locales.",
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
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      admin: { description: "Full-bleed hero image at the top of the project page. Upload via admin." },
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Image shown on the projects overview grid. Falls back to heroImage if empty.",
      },
    },
    {
      name: "intro",
      type: "richText",
      localized: true,
      required: true,
      admin: { description: "Short paragraph below the hero." },
    },
    {
      name: "layout",
      type: "blocks",
      blocks: [TextWithImageBlock, FloatedImagePairBlock, RichTextBlock],
      admin: { description: "Body of the project page, composed of blocks." },
    },
    {
      name: "meta",
      type: "group",
      fields: [
        { name: "title", type: "text", localized: true },
        { name: "description", type: "textarea", localized: true, required: true },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
  ],
}
