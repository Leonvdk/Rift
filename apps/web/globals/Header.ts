import type { GlobalConfig } from "payload"
import { isAdminOrEditor } from "../lib/access.ts"

export const Header: GlobalConfig = {
  slug: "header",
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: "navItems",
      type: "array",
      admin: { description: "Top-level navigation links." },
      fields: [
        { name: "label", type: "text", required: true, localized: true },
        {
          name: "href",
          type: "text",
          required: true,
          admin: {
            description:
              "Path without locale prefix, e.g. /projects. The current locale is added automatically.",
          },
        },
      ],
    },
  ],
}
