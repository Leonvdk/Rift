/**
 * Backfill `blurDataURL` on existing Media docs.
 *
 * Iterates every image in the media collection, downloads the source via
 * `media.url`, runs sharp to generate a 16-pixel-wide WebP, base64-encodes it,
 * and saves it to the doc. Idempotent — skips docs that already have a
 * blurDataURL set, so re-running is cheap.
 *
 * Run from apps/web:
 *   pnpm tsx scripts/backfill-blur.ts
 */
import { fileURLToPath } from "url"
import path from "path"
import sharp from "sharp"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
process.env.PAYLOAD_CONFIG_PATH = path.resolve(dirname, "../payload.config.ts")

const { getPayload } = await import("payload")
const { default: config } = await import("../payload.config.ts")

async function main() {
  const payload = await getPayload({ config })

  console.log("→ Fetching media…")
  const { docs, totalDocs } = await payload.find({
    collection: "media",
    limit: 1000,
    depth: 0,
  })
  console.log(`  Found ${totalDocs} media items`)

  let updated = 0
  let skipped = 0
  let failed = 0

  for (const doc of docs) {
    const id = doc.id
    const url = doc.url
    const mime = doc.mimeType

    if (!mime?.startsWith("image/")) {
      skipped++
      continue
    }
    if (doc.blurDataURL) {
      skipped++
      continue
    }
    if (!url) {
      console.warn(`  ! ${id} has no url, skipping`)
      skipped++
      continue
    }

    const fullUrl = url.startsWith("http")
      ? url
      : `${process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000"}${url}`

    try {
      const res = await fetch(fullUrl)
      if (!res.ok) throw new Error(`fetch ${fullUrl} → ${res.status}`)
      const buffer = Buffer.from(await res.arrayBuffer())
      const blurBuffer = await sharp(buffer)
        .resize(16, 16, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: 40 })
        .toBuffer()
      const blurDataURL = `data:image/webp;base64,${blurBuffer.toString("base64")}`

      await payload.update({
        collection: "media",
        id,
        data: { blurDataURL } as never,
      })
      console.log(`  ✓ #${id} ${doc.filename ?? ""} (${blurBuffer.length} bytes)`)
      updated++
    } catch (e) {
      console.error(`  ✗ #${id} ${doc.filename ?? ""}: ${(e as Error).message}`)
      failed++
    }
  }

  console.log(
    `\n✓ Done. updated=${updated} skipped=${skipped} failed=${failed}`,
  )
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
