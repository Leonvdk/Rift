import type { Block } from "payload"

export const FloatedImagePairBlock: Block = {
  slug: "floatedImagePair",
  labels: { singular: "Floated Image Pair", plural: "Floated Image Pair Sections" },
  fields: [
    {
      name: "enabled",
      type: "checkbox",
      defaultValue: true,
      admin: { description: "Show or hide this section." },
    },
    {
      name: "imageOne",
      type: "upload",
      relationTo: "media",
      admin: { description: "Hidden on mobile, shown on tablet+." },
    },
    {
      name: "imageTwo",
      type: "upload",
      relationTo: "media",
      admin: { description: "Always shown." },
    },
    {
      name: "imagesPosition",
      type: "select",
      defaultValue: "right",
      options: [
        { label: "Images on right (text wraps on left)", value: "right" },
        { label: "Images on left (text wraps on right)", value: "left" },
      ],
      admin: {
        description:
          "Which side the images sit on. Text wraps around them on the opposite side on desktop.",
      },
    },
    {
      name: "ratio",
      type: "select",
      defaultValue: "third",
      options: [
        { label: "1/3 text · 2/3 images", value: "third" },
        { label: "1/4 text · 3/4 images", value: "quarter" },
      ],
      admin: { description: "How wide the text column is relative to the images." },
    },
    {
      name: "paragraphs",
      type: "array",
      localized: true,
      labels: { singular: "Paragraph", plural: "Paragraphs" },
      admin: { description: "Body copy that wraps around the images on desktop." },
      fields: [{ name: "text", type: "textarea", required: true }],
    },
  ],
}
