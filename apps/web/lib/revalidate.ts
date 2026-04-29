import { LOCALES } from "./i18n.ts"

/**
 * Wrapper around next/cache's revalidatePath that:
 *  - dynamically imports next/cache (it only exists when running inside the
 *    Next.js runtime; Payload CLI tools, seed scripts, and tests run outside it).
 *  - swallows errors so a Payload save never fails just because the cache hint
 *    couldn't be sent.
 */
async function revalidate(path: string, type?: "page" | "layout") {
  try {
    const { revalidatePath } = await import("next/cache")
    revalidatePath(path, type)
  } catch {
    // next/cache unavailable (CLI / outside Next runtime) — ignore.
  }
}

/** Revalidate a CMS page at every locale. */
export async function revalidatePageSlug(slug: string) {
  await Promise.all(
    LOCALES.map((locale) => {
      const path = slug === "home" ? `/${locale}` : `/${locale}/${slug}`
      return revalidate(path, "page")
    }),
  )
}

/** Revalidate a project detail + the projects index, for every locale. */
export async function revalidateProjectSlug(slug: string) {
  await Promise.all([
    ...LOCALES.map((locale) => revalidate(`/${locale}/projects/${slug}`, "page")),
    ...LOCALES.map((locale) => revalidate(`/${locale}/projects`, "page")),
  ])
}

/** Revalidate everything served by the locale layout (header/footer changes). */
export async function revalidateLayout() {
  await Promise.all(LOCALES.map((locale) => revalidate(`/${locale}`, "layout")))
}
