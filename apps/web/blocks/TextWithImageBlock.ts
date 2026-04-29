import type { Block } from "payload"

export const TextWithImageBlock: Block = {
  slug: "textWithImage",
  labels: { singular: "Text + Image", plural: "Text + Image Sections" },
  fields: [
    {
      name: "enabled",
      type: "checkbox",
      defaultValue: true,
      admin: { description: "Show or hide this section." },
    },
    {
      name: "heading",
      type: "text",
      localized: true,
      admin: { description: "Optional heading shown above the columns." },
    },
    {
      name: "paragraphs",
      type: "array",
      localized: true,
      labels: { singular: "Paragraph", plural: "Paragraphs" },
      admin: { description: "Body copy. Each entry renders as its own paragraph." },
      fields: [{ name: "text", type: "textarea", required: true }],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: { description: "Used unless a video is set below." },
    },
    {
      name: "video",
      type: "upload",
      relationTo: "media",
      filterOptions: { mimeType: { contains: "video" } },
      admin: {
        description:
          "Optional. If set, replaces the image. Auto-plays muted on loop. The image above is used as a poster while the video loads.",
      },
    },
    {
      name: "imagePosition",
      type: "select",
      defaultValue: "right",
      options: [
        { label: "Right (text on left)", value: "right" },
        { label: "Left (text on right)", value: "left" },
      ],
    },
    {
      name: "ratio",
      type: "select",
      defaultValue: "third",
      options: [
        { label: "1/3 text · 2/3 image", value: "third" },
        { label: "1/4 text · 3/4 image", value: "quarter" },
      ],
      admin: { description: "How wide the text column is relative to the image." },
    },
    {
      name: "textVerticalAlign",
      type: "select",
      defaultValue: "center",
      options: [
        { label: "Top (aligns with top of image)", value: "top" },
        { label: "Center", value: "center" },
        { label: "Bottom (aligns with bottom of image)", value: "bottom" },
      ],
      admin: {
        description: "How the text column aligns vertically against the image on desktop.",
      },
    },
  ],
}
