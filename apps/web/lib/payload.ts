import { cache } from "react"
import { getPayload as getPayloadCore } from "payload"
import config from "../payload.config.ts"
import type { Page, Project, Header, Footer, Integration } from "../payload-types.ts"
import type { Locale } from "./i18n.ts"
import { DEFAULT_LOCALE } from "./i18n.ts"

export async function getPayloadInstance() {
  return getPayloadCore({ config })
}

export const getPageBySlug = cache(
  async (slug: string, locale: Locale = DEFAULT_LOCALE): Promise<Page | null> => {
    const payload = await getPayloadInstance()
    const result = await payload.find({
      collection: "pages",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
      locale,
    })
    return (result.docs[0] as Page) ?? null
  },
)

export const getProjectBySlug = cache(
  async (slug: string, locale: Locale = DEFAULT_LOCALE): Promise<Project | null> => {
    const payload = await getPayloadInstance()
    const result = await payload.find({
      collection: "projects",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
      locale,
    })
    return (result.docs[0] as Project) ?? null
  },
)

export const getProjects = cache(
  async (
    opts?: { limit?: number; page?: number; locale?: Locale },
  ): Promise<{
    docs: Project[]
    totalPages: number
    totalDocs: number
    page: number
  }> => {
    const payload = await getPayloadInstance()
    const result = await payload.find({
      collection: "projects",
      where: { status: { equals: "published" } },
      limit: opts?.limit ?? 6,
      page: opts?.page ?? 1,
      depth: 1,
      sort: "-createdAt",
      locale: opts?.locale ?? DEFAULT_LOCALE,
    })
    return {
      docs: result.docs as Project[],
      totalPages: result.totalPages,
      totalDocs: result.totalDocs,
      page: result.page ?? 1,
    }
  },
)

export const getHeader = cache(
  async (locale: Locale = DEFAULT_LOCALE): Promise<Header | null> => {
    const payload = await getPayloadInstance()
    try {
      return (await payload.findGlobal({
        slug: "header",
        depth: 1,
        locale,
      })) as Header
    } catch {
      return null
    }
  },
)

export const getFooter = cache(
  async (locale: Locale = DEFAULT_LOCALE): Promise<Footer | null> => {
    const payload = await getPayloadInstance()
    try {
      return (await payload.findGlobal({
        slug: "footer",
        depth: 1,
        locale,
      })) as Footer
    } catch {
      return null
    }
  },
)

export const getIntegrations = cache(async (): Promise<Integration | null> => {
  const payload = await getPayloadInstance()
  try {
    return (await payload.findGlobal({ slug: "integrations", depth: 0 })) as Integration
  } catch {
    return null
  }
})
