import type { Block } from "payload"

export const TwoImagesQuoteBlock: Block = {
  slug: "twoImagesQuote",
  labels: { singular: "Two Images + Quote", plural: "Two Images + Quote Sections" },
  fields: [
    {
      name: "enabled",
      type: "checkbox",
      defaultValue: true,
      admin: { description: "Show or hide this section." },
    },
    {
      name: "leadingText",
      type: "textarea",
      localized: true,
      admin: { description: "Paragraph shown above the quote." },
    },
    {
      name: "quote",
      type: "text",
      localized: true,
      admin: { description: "Short quote, e.g. 'Where ideas take shape in timeless interiors'." },
    },
    {
      name: "attributionLabel",
      type: "text",
      localized: true,
      defaultValue: "RIFT",
      admin: { description: "Label shown before the quote, e.g. 'RIFT'." },
    },
    {
      name: "imageOne",
      type: "upload",
      relationTo: "media",
      admin: { description: "Always shown." },
    },
    {
      name: "imageTwo",
      type: "upload",
      relationTo: "media",
      admin: { description: "Hidden on mobile, shown on tablet+." },
    },
    {
      name: "quotePosition",
      type: "select",
      defaultValue: "right",
      options: [
        { label: "Quote on right (images on left)", value: "right" },
        { label: "Quote on left (images on right)", value: "left" },
      ],
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
      name: "textVerticalAlign",
      type: "select",
      defaultValue: "center",
      options: [
        { label: "Top (aligns with top of images)", value: "top" },
        { label: "Center", value: "center" },
        { label: "Bottom (aligns with bottom of images)", value: "bottom" },
      ],
      admin: {
        description: "How the quote column aligns vertically against the images on desktop.",
      },
    },
  ],
}
