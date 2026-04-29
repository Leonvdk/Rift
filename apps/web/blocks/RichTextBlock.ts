import type { Block } from "payload"

export const RichTextBlock: Block = {
  slug: "richText",
  labels: { singular: "Rich Text", plural: "Rich Text Sections" },
  fields: [
    {
      name: "enabled",
      type: "checkbox",
      defaultValue: true,
      admin: { description: "Show or hide this section." },
    },
    {
      name: "heading",
      type: "richText",
      localized: true,
    },
    {
      name: "paragraphs",
      type: "array",
      localized: true,
      labels: { singular: "Paragraph", plural: "Paragraphs" },
      fields: [{ name: "text", type: "richText", required: true }],
    },
  ],
}
