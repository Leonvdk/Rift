import * as React from "react"
import { EmailLayout, Paragraphs } from "./Layout"

type Props = {
  subject: string
  heading: string
  intro: string
  body?: string | null
  signOff: string
}

export function ClientConfirmation({ subject, heading, intro, body, signOff }: Props) {
  return (
    <EmailLayout preview={subject} heading={heading} signOff={signOff}>
      <Paragraphs text={intro} />
      {body && <Paragraphs text={body} />}
    </EmailLayout>
  )
}
