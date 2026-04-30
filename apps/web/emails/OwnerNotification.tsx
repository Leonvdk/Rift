import * as React from "react"
import { Section, Text, Hr } from "@react-email/components"
import { EmailLayout, Paragraphs } from "./Layout"

type Props = {
  subject: string
  heading: string
  fromEmail: string
  message: string
  locale: "nl" | "en"
}

const META_LABELS = {
  nl: { from: "Van", message: "Bericht", reply: "Antwoord rechtstreeks op deze e-mail om de afzender te bereiken." },
  en: { from: "From", message: "Message", reply: "Reply to this email to respond directly to the sender." },
} as const

export function OwnerNotification({ subject, heading, fromEmail, message, locale }: Props) {
  const labels = META_LABELS[locale]
  return (
    <EmailLayout preview={subject} heading={heading}>
      <Section
        style={{
          fontSize: 14,
          lineHeight: 1.6,
          color: "#2B2C2E",
          marginBottom: 24,
        }}
      >
        <Text style={{ margin: "0 0 8px" }}>
          <strong>{labels.from}:</strong>{" "}
          <a href={`mailto:${fromEmail}`} style={{ color: "#2B2C2E" }}>
            {fromEmail}
          </a>
        </Text>
      </Section>

      <Hr style={{ borderColor: "#e9e3d8", margin: "0 0 24px" }} />

      <Text
        style={{
          fontSize: 13,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "#8a8480",
          margin: "0 0 12px",
        }}
      >
        {labels.message}
      </Text>

      <Paragraphs text={message} />

      <Text
        style={{
          fontSize: 13,
          color: "#8a8480",
          marginTop: 24,
          fontStyle: "italic",
        }}
      >
        {labels.reply}
      </Text>
    </EmailLayout>
  )
}
