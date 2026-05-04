import type { Block } from "payload"

export const HeroBlock: Block = {
  slug: "hero",
  labels: { singular: "Hero", plural: "Hero Sections" },
  fields: [
    {
      name: "enabled",
      type: "checkbox",
      defaultValue: true,
      admin: { description: "Show or hide this section." },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: { description: "Full-bleed background image. Falls back to a default if empty." },
    },
    {
      name: "caption",
      type: "text",
      localized: true,
      admin: { description: "Tagline shown over the image, e.g. 'Interior, Craft & Design'." },
    },
    {
      name: "animateLogo",
      label: "Logo animation",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description:
          "Animate the Rift logo on load. When unchecked, the logo still shows but appears instantly without the staggered reveal.",
      },
    },
  ],
}
