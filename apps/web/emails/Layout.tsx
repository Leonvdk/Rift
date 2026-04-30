import * as React from "react"
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Tailwind,
} from "@react-email/components"

/**
 * Brand-styled wrapper for transactional emails.
 *
 * Uses the same palette as the website (cream background, aubergine text)
 * and a serif/sans pair that falls back gracefully across email clients.
 * No web fonts — most clients block them.
 */

const colors = {
  cream: "#FFFFF7",
  aubergine: "#2B2C2E",
  warmGray: "#8a8480",
  hairline: "#e9e3d8",
}

const serifStack = "Georgia, 'Times New Roman', Times, serif"
const sansStack = "Helvetica, Arial, sans-serif"

type Props = {
  preview: string
  heading: string
  children: React.ReactNode
  signOff?: string | null
}

export function EmailLayout({ preview, heading, children, signOff }: Props) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind>
        <Body
          style={{
            backgroundColor: colors.cream,
            color: colors.aubergine,
            fontFamily: sansStack,
            margin: 0,
            padding: 0,
          }}
        >
          <Container
            style={{
              backgroundColor: colors.cream,
              maxWidth: 560,
              margin: "0 auto",
              padding: "48px 32px",
            }}
          >
            {/* Wordmark */}
            <Section style={{ paddingBottom: 32 }}>
              <Text
                style={{
                  fontFamily: serifStack,
                  fontSize: 28,
                  letterSpacing: "0.04em",
                  margin: 0,
                  color: colors.aubergine,
                }}
              >
                rift
              </Text>
            </Section>

            <Hr style={{ borderColor: colors.hairline, margin: "0 0 32px" }} />

            {/* Heading */}
            <Section>
              <Text
                style={{
                  fontFamily: serifStack,
                  fontSize: 22,
                  fontWeight: 400,
                  lineHeight: 1.3,
                  margin: "0 0 24px",
                  color: colors.aubergine,
                }}
              >
                {heading}
              </Text>
            </Section>

            {/* Body */}
            <Section
              style={{
                fontSize: 15,
                lineHeight: 1.65,
                color: colors.aubergine,
              }}
            >
              {children}
            </Section>

            {signOff && (
              <Text
                style={{
                  fontFamily: serifStack,
                  fontSize: 15,
                  fontStyle: "italic",
                  marginTop: 32,
                  color: colors.aubergine,
                }}
              >
                {signOff}
              </Text>
            )}

            <Hr style={{ borderColor: colors.hairline, margin: "48px 0 24px" }} />

            <Text
              style={{
                fontSize: 12,
                color: colors.warmGray,
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Rift Furniture · Interior, Craft &amp; Design
              <br />
              info@rift-furniture.nl
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

/** Render a multi-line string as a series of <p> tags, preserving paragraphs. */
export function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n{2,}/).map((para, i) => (
        <Text
          key={i}
          style={{
            fontSize: 15,
            lineHeight: 1.65,
            margin: i === 0 ? "0 0 16px" : "16px 0",
            color: colors.aubergine,
          }}
        >
          {para.split("\n").map((line, j, arr) => (
            <React.Fragment key={j}>
              {line}
              {j < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </Text>
      ))}
    </>
  )
}
