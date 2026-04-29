import type { GlobalConfig } from "payload"
import { isAdminOrEditor } from "../lib/access.ts"

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: "tagline",
      type: "text",
      localized: true,
      required: true,
      admin: { description: "Short line shown next to the starburst, e.g. 'Get in touch...'" },
    },
    {
      name: "email",
      type: "text",
      admin: { description: "Contact email shown in the footer." },
    },
    {
      name: "links",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true, localized: true },
        { name: "href", type: "text", required: true },
        {
          name: "external",
          type: "checkbox",
          defaultValue: false,
          admin: { description: "Open in a new tab." },
        },
      ],
    },
  ],
}
