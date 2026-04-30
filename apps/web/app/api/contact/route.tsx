import { NextResponse } from "next/server"
import { Resend } from "resend"
import { render } from "@react-email/render"
import { getEmails } from "@/lib/payload"
import { isLocale, DEFAULT_LOCALE } from "@/lib/i18n"
import { ClientConfirmation } from "@/emails/ClientConfirmation"
import { OwnerNotification } from "@/emails/OwnerNotification"

export const runtime = "nodejs"

type Body = {
  email?: string
  message?: string
  locale?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  let body: Body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  const email = body.email?.trim()
  const message = body.message?.trim()
  const locale = isLocale(body.locale) ? body.locale : DEFAULT_LOCALE

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 })
  }
  if (!message || message.length < 2) {
    return NextResponse.json({ error: "Message is too short." }, { status: 400 })
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set")
    return NextResponse.json({ error: "Email service not configured." }, { status: 500 })
  }

  const cms = await getEmails(locale)
  if (!cms?.addresses?.fromAddress || !cms.addresses.ownerRecipient) {
    console.error("[contact] Email global is missing fromAddress or ownerRecipient")
    return NextResponse.json({ error: "Email templates not configured." }, { status: 500 })
  }

  const fromName = cms.addresses.fromName ?? "Rift"
  const from = `${fromName} <${cms.addresses.fromAddress}>`

  const clientHtml = await render(
    <ClientConfirmation
      subject={cms.clientConfirmation.subject}
      heading={cms.clientConfirmation.heading}
      intro={cms.clientConfirmation.intro}
      body={cms.clientConfirmation.body}
      signOff={cms.clientConfirmation.signOff}
    />,
  )

  const ownerHtml = await render(
    <OwnerNotification
      subject={cms.ownerNotification.subject}
      heading={cms.ownerNotification.heading}
      fromEmail={email}
      message={message}
      locale={locale}
    />,
  )

  const resend = new Resend(apiKey)

  const [confirmation, notification] = await Promise.allSettled([
    resend.emails.send({
      from,
      to: email,
      subject: cms.clientConfirmation.subject,
      html: clientHtml,
    }),
    resend.emails.send({
      from,
      to: cms.addresses.ownerRecipient,
      replyTo: email,
      subject: cms.ownerNotification.subject,
      html: ownerHtml,
    }),
  ])

  // The owner notification is the load-bearing one — fail loudly if that didn't go.
  if (notification.status === "rejected" || notification.value?.error) {
    console.error("[contact] owner notification failed:", notification)
    return NextResponse.json({ error: "Could not deliver the message." }, { status: 502 })
  }

  // If the client confirmation fails (typo'd address, etc.), log it but still treat
  // the submission as a success — the owner notification went through.
  if (confirmation.status === "rejected" || confirmation.value?.error) {
    console.warn("[contact] client confirmation failed:", confirmation)
  }

  return NextResponse.json({ ok: true })
}
