import type { GlobalConfig } from "payload"
import { isAdminOrEditor } from "../lib/access.ts"

export const Integrations: GlobalConfig = {
  slug: "integrations",
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: "googleAnalytics",
      type: "group",
      fields: [
        { name: "enabled", type: "checkbox", defaultValue: false },
        {
          name: "measurementId",
          type: "text",
          admin: {
            description: "GA4 ID (e.g. G-XXXXXXX)",
            condition: (data) => data?.googleAnalytics?.enabled,
          },
        },
      ],
    },
    {
      name: "metaPixel",
      type: "group",
      fields: [
        { name: "enabled", type: "checkbox", defaultValue: false },
        {
          name: "pixelId",
          type: "text",
          admin: { condition: (data) => data?.metaPixel?.enabled },
        },
      ],
    },
    {
      name: "customScripts",
      type: "array",
      admin: {
        description: "Paste arbitrary script snippets (e.g. Hotjar). Use sparingly.",
      },
      fields: [
        { name: "label", type: "text", admin: { description: "Internal label for editors." } },
        {
          name: "placement",
          type: "select",
          defaultValue: "head",
          options: [
            { label: "Head", value: "head" },
            { label: "Body", value: "body" },
          ],
        },
        { name: "script", type: "textarea", required: true },
      ],
    },
  ],
}
