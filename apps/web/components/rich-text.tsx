import React from "react"

/**
 * Minimal Lexical → React renderer.
 *
 * Payload's richText fields store content as a Lexical AST. We render the
 * subset we use on this site: paragraphs, headings, line breaks, and inline
 * text with bold/italic/underline/strike marks. Anything more exotic
 * (lists, links, tables) can be added as needed.
 *
 * Each top-level Lexical node renders as `tag` (default <p>), with `className`
 * applied to it. So three Lexical paragraphs become three <p class="...">
 * elements stacked.
 */

type LexicalNode = {
  type: string
  text?: string
  format?: number
  tag?: string
  children?: LexicalNode[]
}

export type RichTextValue = {
  root?: { children?: LexicalNode[] }
} | null | undefined

const FORMAT_BOLD = 1
const FORMAT_ITALIC = 2
const FORMAT_STRIKE = 4
const FORMAT_UNDERLINE = 8

function applyMarks(text: string, format: number): React.ReactNode {
  let node: React.ReactNode = text
  if (format & FORMAT_UNDERLINE) node = <u>{node}</u>
  if (format & FORMAT_STRIKE) node = <s>{node}</s>
  if (format & FORMAT_ITALIC) node = <em>{node}</em>
  if (format & FORMAT_BOLD) node = <strong>{node}</strong>
  return node
}

function renderInline(children: LexicalNode[] | undefined, keyPrefix = ""): React.ReactNode {
  if (!children) return null
  return children.map((child, i) => {
    const key = `${keyPrefix}${i}`
    if (child.type === "text") {
      return (
        <React.Fragment key={key}>
          {applyMarks(child.text ?? "", child.format ?? 0)}
        </React.Fragment>
      )
    }
    if (child.type === "linebreak" || child.type === "linebreakNode") {
      return <br key={key} />
    }
    return null
  })
}

type Props = {
  data: RichTextValue
  /** Tag rendered for each top-level paragraph node. Defaults to `p`. */
  tag?: keyof React.JSX.IntrinsicElements
  /** className applied to each top-level rendered element. */
  className?: string
}

export function RichText({ data, tag = "p", className }: Props) {
  const blocks = data?.root?.children
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block, i) => {
        const inline = renderInline(block.children, `${i}-`)

        // Honor heading nodes if the editor produced them; otherwise default to `tag`.
        if (block.type === "heading") {
          const headingTag = block.tag ?? "h2"
          return React.createElement(headingTag, { key: i, className }, inline)
        }
        return React.createElement(tag, { key: i, className }, inline)
      })}
    </>
  )
}

/**
 * Returns true if the rich-text value contains anything renderable.
 * Useful for conditionally rendering a wrapper.
 */
export function isRichTextEmpty(value: RichTextValue): boolean {
  const blocks = value?.root?.children
  if (!blocks?.length) return true
  return !blocks.some((block) =>
    block.children?.some((c) => c.type === "text" && (c.text?.trim().length ?? 0) > 0),
  )
}
