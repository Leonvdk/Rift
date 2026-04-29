import type { Block } from "payload"

export const ProcessStepBlock: Block = {
  slug: "processStep",
  labels: { singular: "Process Step", plural: "Process Steps" },
  fields: [
    {
      name: "enabled",
      type: "checkbox",
      defaultValue: true,
      admin: { description: "Show or hide this step." },
    },
    {
      name: "stepNumber",
      type: "text",
      admin: { description: "Optional prefix shown before the title, e.g. '1.'" },
    },
    {
      name: "title",
      type: "text",
      localized: true,
    },
    {
      name: "description",
      type: "richText",
      required: true,
      localized: true,
    },
    {
      name: "imagePosition",
      type: "select",
      defaultValue: "right",
      options: [
        { label: "Image on right (text on left)", value: "right" },
        { label: "Image on left (text on right)", value: "left" },
      ],
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
      admin: {
        description: "Optional second image. When set, the section uses the double-image layout.",
      },
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
        description: "How the text column aligns vertically against the image(s) on desktop.",
      },
    },
  ],
}
