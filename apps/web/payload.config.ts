import path from "path"
import { fileURLToPath } from "url"
import { buildConfig } from "payload"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob"
import sharp from "sharp"

import { Users } from "./collections/Users.ts"
import { Media } from "./collections/Media.ts"
import { Pages } from "./collections/Pages.ts"
import { Projects } from "./collections/Projects.ts"
import { Header } from "./globals/Header.ts"
import { Footer } from "./globals/Footer.ts"
import { Integrations } from "./globals/Integrations.ts"
import { Emails } from "./globals/Emails.ts"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Projects],
  globals: [Header, Footer, Integrations, Emails],
  localization: {
    locales: [
      { label: "Nederlands", code: "nl" },
      { label: "English", code: "en" },
    ],
    defaultLocale: "nl",
    fallback: false,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
    // Disable auto schema push — destructive when adding `localized: true` to fields with data.
    // Use `pnpm payload migrate:create` + a data-preserving migration instead. See README.
    push: false,
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.rift_BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.rift_BLOB_READ_WRITE_TOKEN || "",
      clientUploads: true,
    }),
  ],
})
