import type { GlobalConfig } from "payload"
import { isAdminOrEditor } from "../lib/access.ts"

/**
 * Email templates for the contact form.
 *
 * Two emails fire on each submission:
 *   1. clientConfirmation → sent to the person who filled out the form.
 *   2. ownerNotification  → sent to the business owner. Reply-To is set to
 *      the client's address so hitting Reply lands directly in their inbox.
 *
 * Subject and body are localized; sender/recipient addresses are not.
 */
export const Emails: GlobalConfig = {
  slug: "emails",
  admin: {
    description: "Templates for transactional emails sent by the contact form.",
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      type: "group",
      name: "addresses",
      label: "Sender & recipient",
      fields: [
        {
          name: "fromName",
          type: "text",
          required: true,
          defaultValue: "Rift Furniture",
          admin: { description: "Display name shown as the sender." },
        },
        {
          name: "fromAddress",
          type: "email",
          required: true,
          admin: {
            description:
              "Verified Resend sender address (must belong to a domain you've verified in Resend).",
          },
        },
        {
          name: "ownerRecipient",
          type: "email",
          required: true,
          admin: {
            description:
              "Where contact form notifications get delivered. Usually the business owner.",
          },
        },
      ],
    },

    {
      type: "group",
      name: "clientConfirmation",
      label: "Client confirmation email",
      admin: {
        description:
          "Sent to the visitor after they submit the form. Reassures them the message arrived.",
      },
      fields: [
        {
          name: "subject",
          type: "text",
          required: true,
          localized: true,
          admin: { description: "Subject line." },
        },
        {
          name: "heading",
          type: "text",
          required: true,
          localized: true,
          admin: { description: "Heading at the top of the email body." },
        },
        {
          name: "intro",
          type: "textarea",
          required: true,
          localized: true,
          admin: { description: "Opening paragraph (e.g. thanking them for reaching out)." },
        },
        {
          name: "body",
          type: "textarea",
          localized: true,
          admin: {
            description:
              "Optional second paragraph (e.g. what to expect / response time).",
          },
        },
        {
          name: "signOff",
          type: "text",
          required: true,
          localized: true,
          defaultValue: "— Rift",
          admin: { description: "Closing line, e.g. '— Rift' or 'With regards, Rift'." },
        },
      ],
    },

    {
      type: "group",
      name: "ownerNotification",
      label: "Owner notification email",
      admin: {
        description: "Sent to you/the business owner. Includes the visitor's message.",
      },
      fields: [
        {
          name: "subject",
          type: "text",
          required: true,
          localized: true,
          defaultValue: "New contact form submission",
          admin: { description: "Subject line." },
        },
        {
          name: "heading",
          type: "text",
          required: true,
          localized: true,
          defaultValue: "New contact form submission",
          admin: { description: "Heading at the top of the email body." },
        },
      ],
    },
  ],
}
