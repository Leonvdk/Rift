# The Manifesto: A Reusable CMS-First Marketing Site Stack

A blueprint distilled from Blue Orange Tribe. The goal: the next site you build should reach "client can edit everything without touching code" within a day, while still letting you ship custom-designed pages.

---

## 0. Core Philosophy

**Three rules that drive every decision below:**

1. **The pre-built site is the spec.** You design and build the site as static React first with hardcoded copy, then port that hardcoded copy into a seed script. The CMS reflects the design, not the other way around. Never let the CMS dictate layout possibilities — let the design dictate block schemas.
2. **Blocks > Fields.** Every page is a sequence of typed "blocks." Editors compose pages by stacking blocks. Developers add new block types when a new visual section is needed. Never add a new top-level page route just to support content variation.
3. **One database, one runtime, one deploy.** Payload v3 runs *inside* Next.js. No separate API server, no headless-CMS contract to maintain, no CORS, no auth tokens to mint. Frontend imports Payload directly via `getPayload({ config })`.

If you violate these, you'll regret it three months in.

---

## 1. The Stack (and why)

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js 16 App Router (Turbopack) | Server Components → query CMS in the page itself, no client fetch dance |
| CMS | Payload v3 (`payload`, `@payloadcms/next`) | Embedded in Next.js, TypeScript-native, code-defined schemas |
| DB | PostgreSQL on Neon | Serverless Postgres, branchable, free tier, Payload's first-class adapter |
| File storage | Vercel Blob (`@payloadcms/storage-vercel-blob`) with `clientUploads: true` | Bypasses Vercel's 4.5 MB body limit by uploading direct from browser |
| Image processing | Sharp | Required by Payload to generate `imageSizes` |
| Editor | Lexical (`@payloadcms/richtext-lexical`) | Modern, actively maintained, JSON output |
| Auth | Payload's built-in users collection | Sessions, lockouts, roles — free |
| Analytics/scripts | CMS-driven `Integrations` global | Non-developers toggle GA/Pixel/Hotjar without redeploys |
| Hosting | Vercel | Vercel + Payload + Neon is the path of least resistance |
| Package manager | pnpm | Faster, stricter; required by Payload's monorepo expectations |

The single most important architectural decision: **`payload.config.ts` lives in `src/`, and Next.js wraps the build via `withPayload(nextConfig)`** ([next.config.ts:29](../next.config.ts#L29)). The two route groups `(frontend)` and `(payload)` partition the URL space cleanly: the public site is everything in `(frontend)`, the admin UI and REST/GraphQL APIs sit under `(payload)/admin` and `(payload)/api`.

---

## 2. Database & Environment

**Required env vars** ([.env.local.example](../.env.local.example)):

```
DATABASE_URL=postgresql://...sslmode=require    # Neon connection string
PAYLOAD_SECRET=<openssl rand -base64 32>        # session signing
NEXT_PUBLIC_SERVER_URL=http://localhost:3000    # used in metadata/canonical
BLOB_READ_WRITE_TOKEN=                          # Vercel Blob, prod only
```

**Neon setup, in order:**
1. Create a project in Neon. Use the **pooled** connection string (the one with `-pooler` in the host) — Vercel serverless functions exhaust raw connections fast.
2. Use Neon **branches** for preview deployments. Vercel preview env → Neon dev branch; Vercel prod env → Neon main branch. Test schema changes on a branch before merging.
3. Never run migrations in CI by hand. Payload auto-syncs schema in dev mode (`push: true` is the default for the postgres adapter). For prod, generate a migration: `payload migrate:create`, commit it, then `payload migrate` runs on deploy.

**Payload's postgres adapter config** lives at [payload.config.ts:45-49](../src/payload.config.ts#L45-L49). Keep it minimal — `connectionString` is enough. Don't tune the pool until you have evidence you need to.

---

## 3. The Schema Layer: Collections, Globals, Blocks

This is the part to copy verbatim into the next project. Three primitives:

### 3.1 Collections (many rows)
- **`users`** ([collections/Users.ts](../src/collections/Users.ts)) — auth, with a `role` enum (`admin` / `editor`). Admin can do everything; editor can edit content but not manage users or delete. `auth: { tokenExpiration, maxLoginAttempts, lockTime }` is non-negotiable.
- **`media`** ([collections/Media.ts](../src/collections/Media.ts)) — uploads. Define `imageSizes` here once; Payload regenerates them. Three sizes covers 95% of real-world needs:
  ```ts
  imageSizes: [
    { name: 'thumbnail', width: 400,  height: 300 },
    { name: 'card',      width: 768,  height: 1024 },
    { name: 'hero',      width: 1920, height: 1080 },
  ]
  ```
  Auto-generate `alt` from filename via a `beforeChange` hook so bulk uploads don't ship without alt text.
- **`pages`** ([collections/Pages.ts](../src/collections/Pages.ts)) — the page builder. Fields: `title`, `slug` (unique, sidebar), `status` (draft/published, sidebar), `layout` (the `blocks` field), and a `meta` group for SEO (title, description, og image). Versioned with `versions: { drafts: true }`.
- **Domain content collections** — `case-studies`, `testimonials`, `client-logos`. These are **the parts that change per project**. The pattern stays identical: `title`/`name` + `slug` + `status` + structured fields + `meta` group.

### 3.2 Globals (single row, site-wide config)
- **`header`** ([globals/Header.ts](../src/globals/Header.ts)) — nav items (with optional dropdown children), CTA, WhatsApp number, logo.
- **`footer`** ([globals/Footer.ts](../src/globals/Footer.ts)) — link groups, social links, address, KvK/VAT, legal links.
- **`integrations`** ([globals/Integrations.ts](../src/globals/Integrations.ts)) — the killer feature. `calendly`, `googleAnalytics`, `metaPixel`, `customScripts[]` (with placement: head/body), and a `qrCodeRedirect` field. Editors paste a Hotjar snippet and ship it without a developer. Inject these via a `<ScriptInjector>` client component in the frontend layout ([components/layout/ScriptInjector.tsx](../src/components/layout/ScriptInjector.tsx)).

### 3.3 Blocks (composable page sections)
This is the heart. Each block is a `Block` definition in [src/blocks/](../src/blocks/), exported through a barrel file. Every block follows the same shape:

```ts
export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero Section', plural: 'Hero Sections' },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true,
      admin: { description: 'Show or hide this section' } },
    // ...content fields
  ],
}
```

**Conventions to enforce on every block** (steal these directly):
- Always include an `enabled` checkbox first. The `BlockRenderer` skips disabled blocks. This lets editors A/B-test sections without deleting them.
- Use `admin.description` on every non-obvious field. Editors are not developers; the CMS is the documentation.
- Use `admin.condition` to hide dependent fields (see Hero's `overlayImage`/`overlayVideo` only showing when `showMockup` is on — [blocks/HeroBlock.ts:70](../src/blocks/HeroBlock.ts#L70)).
- For repeating sub-content use `type: 'array'` with required inner fields. Don't reach for relationships unless the data is genuinely shared across pages.
- For shared content (testimonials, logos, case studies referenced from a homepage block) use `type: 'relationship'` with `hasMany: true`. See [blocks/TestimonialsBlock.ts](../src/blocks/TestimonialsBlock.ts) and [blocks/LogoMarqueeBlock.ts](../src/blocks/LogoMarqueeBlock.ts).
- Block `slug` is camelCase (`caseStudiesOverview`, `videoCta`, `twoColumnInfo`) and matches the `blockType` in the rendered switch.

### 3.4 The "blocks: true" wiring
In [collections/Pages.ts:76-93](../src/collections/Pages.ts#L76-L93):

```ts
{
  name: 'layout',
  type: 'blocks',
  blocks: [HeroBlock, LogoMarqueeBlock, /* ...all blocks */],
}
```

Every block the editor can use is listed here. The same set is reused across all pages in this project. If a future project has a "blog post" collection that needs a different (smaller) block palette, define a second `layout` field with a subset of blocks — never duplicate the block definitions themselves.

---

## 4. Access Control Pattern

Two helper closures, defined once per collection and reused:

```ts
const isAdminOrEditor = ({ req: { user } }) => user?.role === 'admin' || user?.role === 'editor'
const isAdmin         = ({ req: { user } }) => user?.role === 'admin'
```

The contract on every content collection:
- **`read`**: public for `published`, full for logged-in users
  ```ts
  read: ({ req: { user } }) => user ? true : { status: { equals: 'published' } }
  ```
- **`create` / `update`**: `isAdminOrEditor`
- **`delete`**: `isAdmin` only

Media is read-public ([collections/Media.ts:18](../src/collections/Media.ts#L18)) because images are served from `<img>` tags. Globals (`header`, `footer`, `integrations`) are read-public; only admins should be able to update them in practice (you can tighten this when you have multiple editors).

The `users` collection inverts: only admins can read/list users. Editors can only update themselves.

**Lift these helpers into `src/lib/access.ts`** in your next project so you don't redefine them in every collection file.

---

## 5. Frontend ↔ CMS Bridge

### 5.1 The `payload` client helper
[src/lib/payload.ts](../src/lib/payload.ts) is the only place that talks to Payload. It exports typed query helpers: `getPageBySlug`, `getCaseStudies`, `getFeaturedCaseStudies`, `getTestimonials`, `getClientLogos`, `getHeader`, `getFooter`, `getIntegrations`. Pages and components import from here, not from `payload` directly. Two reasons: (1) one place to add caching later, (2) the `depth` parameter (how deep to populate relationships) is a tuning knob you want centralized.

**Depth rules**: `depth: 1` is the default for queries that just need one level of population (a media URL on a logo). `depth: 2` for pages, because blocks reference media/relationships and you need both levels populated. Globals: `depth: 0` for `integrations` (no relations), `depth: 1` for `header`/`footer` (logo + nav).

### 5.2 The `BlockRenderer`
[src/components/BlockRenderer.tsx](../src/components/BlockRenderer.tsx) — a server component that:
1. Receives the `layout` array from a page.
2. **Pre-fetches shared data in parallel** that any block on the page might need (case studies, testimonials, logos) — *one* query per type for the whole page, not per block. This is the single biggest perf win.
3. Iterates blocks, switches on `blockType`, renders the corresponding section component, passes typed props.
4. Skips blocks where `enabled === false`.

Each block in the switch maps to a presentational component in [src/components/sections/](../src/components/sections/). The components are pure: they take props and render. They don't query the CMS. This separation is what lets you redesign without touching schemas (and vice versa).

### 5.3 Routing
- `/` → [src/app/(frontend)/page.tsx](../src/app/(frontend)/page.tsx) loads the page with `slug: 'home'`.
- `/anything/at/any/depth` → [src/app/(frontend)/[...slug]/page.tsx](../src/app/(frontend)/[...slug]/page.tsx) catches it, joins with `/`, looks up the page by slug.
- Domain-specific routes (`/case-studies`, `/case-studies/[slug]`) are explicit pages that query their own collection — they're not block-driven because they have list/detail semantics that don't fit the page builder.
- `export const dynamic = 'force-dynamic'` on every page that reads from Payload. (Once content stabilizes, switch to `revalidate: 60` or use Payload's `afterChange` hooks to call `revalidatePath`.)

### 5.4 The frontend layout
[src/app/(frontend)/layout.tsx](../src/app/(frontend)/layout.tsx) fetches `header`, `footer`, `integrations` in parallel, falls back gracefully if globals don't exist yet (fresh DB scenario), and threads the data into `<LayoutShell>` and `<ScriptInjector>`. The Calendly URL is gated behind `integrations.calendly.enabled`.

---

## 6. Pre-built Site → CMS Seed Pipeline

This is the part you specifically asked about. **The seed script is how you migrate from "designed page with hardcoded copy" to "editable page in the CMS." It is also how you bootstrap any new environment (preview, prod, a colleague's laptop).**

### 6.1 The workflow

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. DESIGN & BUILD STATIC                                        │
│    Build sections as React components with hardcoded copy.      │
│    Get the design pixel-perfect. Ignore the CMS entirely.       │
├─────────────────────────────────────────────────────────────────┤
│ 2. EXTRACT BLOCK SCHEMA                                         │
│    For each section component, ask: which strings/images/lists  │
│    should be editable? Define a `Block` in src/blocks/ with     │
│    those exact fields. Add `enabled` first.                     │
├─────────────────────────────────────────────────────────────────┤
│ 3. WIRE BLOCKRENDERER                                           │
│    Add a case to the switch. Component now reads from props     │
│    (CMS) instead of hardcoded constants. Keep the component's   │
│    fallback defaults — they're your safety net for empty CMS.   │
├─────────────────────────────────────────────────────────────────┤
│ 4. WRITE THE SEED                                               │
│    Translate the hardcoded copy from step 1 into a `layout`     │
│    array in src/scripts/seed.ts. The seed becomes the           │
│    canonical "this is what the site looks like out of the box." │
├─────────────────────────────────────────────────────────────────┤
│ 5. RUN `pnpm seed`                                              │
│    The CMS now has the same content the static site had.        │
│    Editors take over from here.                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 The seed script structure
[src/scripts/seed.ts](../src/scripts/seed.ts) is the reference. Replicate this skeleton verbatim:

```ts
import 'dotenv/config'
import { config as dotenvConfig } from 'dotenv'
// ... load .env.local explicitly (Next.js doesn't, when running outside Next)
import { getPayload } from 'payload'
import config from '../payload.config'

async function seed() {
  const payload = await getPayload({ config })

  // 1. Globals — always upsert via updateGlobal (no "exists" check needed)
  await payload.updateGlobal({ slug: 'header',       data: { /* ... */ } })
  await payload.updateGlobal({ slug: 'footer',       data: { /* ... */ } })
  await payload.updateGlobal({ slug: 'integrations', data: { /* ... */ } })

  // 2. Domain collections — guard with find-by-slug-then-create
  for (const cs of caseStudyData) {
    const existing = await payload.find({
      collection: 'case-studies',
      where: { slug: { equals: cs.slug } }, limit: 1,
    })
    if (existing.docs.length === 0) await payload.create({ collection: 'case-studies', data: cs })
  }

  // 3. Pages — same idempotent pattern, with `layout` arrays mirroring the design
  // ...
  process.exit(0)
}
```

**Idempotency is the rule.** Every record check-then-create. Globals are inherently single-row, so `updateGlobal` is safe to re-run. This means `pnpm seed` is safe to run on any environment, any time. You can re-run it after adding a new page without disturbing existing edits.

### 6.3 Two seed surfaces, same data

Notice the project has *two* seed entrypoints with the same content:
- **`pnpm seed`** ([src/scripts/seed.ts](../src/scripts/seed.ts)) — CLI, full output, used locally and during dev.
- **`GET /api/seed`** ([src/app/(frontend)/api/seed/route.ts](../src/app/(frontend)/api/seed/route.ts)) — HTTP endpoint, used to seed a deployed environment without shell access.

For your next project, **extract the shared seed payload into `src/scripts/seed-data.ts`** (it's currently duplicated). Both entrypoints import from there. One source of truth.

### 6.4 What goes into the seed vs. what doesn't

| Goes in seed | Doesn't go in seed |
|---|---|
| Page structure & default copy | Real client testimonials with NDA |
| Default header/footer/integrations | Production analytics IDs (env-specific) |
| Placeholder case studies | Uploaded images (use `media/` folder + manual upload) |
| Lorem ipsum legal pages | API keys, secrets |

Media uploads are intentionally not in the seed — bytes don't belong in source code. Keep a `media/` folder of stock assets at the repo root and upload them via the admin UI on first boot. (If you really need scripted uploads, use `payload.create({ collection: 'media', file: { ... } })` but expect pain on Vercel due to body-size limits.)

### 6.5 Migrating an existing static site to this stack

If the next project starts as a non-CMS Next.js site:

1. Move every section into `src/components/sections/` with prop-based APIs.
2. Catalogue what an editor would want to change. Bucket those into 8-15 block types max — fewer, broader blocks beat dozens of narrow ones.
3. Write block schemas to mirror those props 1:1.
4. Build `BlockRenderer` and the page route(s).
5. Write the seed by copying current hardcoded values into the `layout` array.
6. Run seed. Diff the rendered site against the original. Fix divergence by adjusting block field shape (not by patching components — components stay pure).
7. Delete the old hardcoded data files (this project still has `src/lib/case-studies.ts` as legacy — kill it once the CMS path is verified).

---

## 7. SEO & Meta

Every content collection (`pages`, `case-studies`) has the same `meta` group:

```ts
{
  name: 'meta',
  type: 'group',
  fields: [
    { name: 'title',       type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'image',       type: 'upload', relationTo: 'media' },
  ],
}
```

In the page route, read `page.meta` and feed it into Next's `generateMetadata`. The root layout sets `metadataBase` from `NEXT_PUBLIC_SERVER_URL` so OG images resolve to absolute URLs ([app/layout.tsx:19](../src/app/layout.tsx#L19)).

The current project doesn't yet wire `generateMetadata` per page — that's an obvious next-project upgrade. Pattern:

```ts
export async function generateMetadata({ params }): Promise<Metadata> {
  const page = await getPageBySlug((await params).slug)
  return {
    title:       page?.meta?.title ?? page?.title,
    description: page?.meta?.description,
    openGraph:   { images: page?.meta?.image ? [getMediaUrl(page.meta.image)!] : undefined },
  }
}
```

---

## 8. Performance Optimization

In priority order, things to do (and not do):

1. **`imageSizes` + `next/image`**. Defining the three sizes in the Media collection means Payload generates them on upload. Use `<Image fill />` and `sizes="..."` in components — never load a 4 MB hero on mobile.
2. **AVIF/WebP** in [next.config.ts:6](../next.config.ts#L6) — already on. Don't remove.
3. **`minimumCacheTTL: 30 days`** on Next images — already on. The cache is keyed by URL; uploads get unique URLs so this is safe.
4. **Vercel Blob with `clientUploads: true`** ([payload.config.ts:58](../src/payload.config.ts#L58)). The browser uploads directly to Blob, bypassing Vercel's 4.5 MB function body limit. Without this you cannot upload videos.
5. **`remotePatterns`** for Blob and any CDN you stream from ([next.config.ts:8](../next.config.ts#L8)). Keep this list current.
6. **Parallelize queries** in `BlockRenderer` and layouts with `Promise.all`. Already done. Don't `await` sequentially when you don't have to.
7. **Tune `depth`**. Each level of population is more SQL + more JSON over the wire. Use the smallest number that gives you what you need. `depth: 0` for globals with no relations.
8. **Force-dynamic now, ISR later**. The current `force-dynamic` everywhere is fine for editor experience (changes appear immediately). Once content stabilizes, replace with `revalidate: 60` and a Payload `afterChange` hook that calls `revalidatePath('/')` and the affected slug.
9. **Vercel function config** ([vercel.json](../vercel.json)) — Payload's catch-all route gets 60s/1024MB; GraphQL gets 30s. Increase if you do heavy seeds via the API.
10. **Drafts API**. `versions: { drafts: true }` on Pages and CaseStudies enables previewing unpublished content. Hook this up to a "Preview" button in admin once you have multiple editors.
11. **Don't put `dynamic = 'force-dynamic'` on the QR redirect** unless you actually want the redirect target read fresh each time (this project does — [app/(frontend)/qr-code/page.tsx](../src/app/(frontend)/qr-code/page.tsx)).

---

## 9. The Replication Checklist (for the next project)

Day 1 — Skeleton (4 hours):
- [ ] `pnpm create next-app` (TypeScript, App Router, Tailwind, Turbopack)
- [ ] `pnpm add payload @payloadcms/next @payloadcms/db-postgres @payloadcms/richtext-lexical @payloadcms/storage-vercel-blob graphql sharp`
- [ ] Copy `payload.config.ts`, `next.config.ts`, `vercel.json`, `.env.local.example`
- [ ] Create Neon project, paste `DATABASE_URL`, generate `PAYLOAD_SECRET`
- [ ] Create `src/app/(frontend)/layout.tsx` and `src/app/(payload)/` (Payload generates the latter on first run)
- [ ] Copy `Users`, `Media`, `Pages` collections; copy `Header`, `Footer`, `Integrations` globals; **adapt fields to the new project's domain**
- [ ] Add `src/lib/access.ts` with the two helpers
- [ ] `pnpm dev` → `/admin` → create the first user

Day 2 — Blocks & Frontend (1-2 days):
- [ ] Build static section components in `src/components/sections/`
- [ ] For each, define a `Block` in `src/blocks/`. Always-include the `enabled` checkbox.
- [ ] Wire them all into `Pages.layout`
- [ ] Build `BlockRenderer.tsx` — same skeleton, new switch cases
- [ ] Build `src/lib/payload.ts` query helpers
- [ ] Wire root + `[...slug]` page routes
- [ ] Add `src/lib/media.ts` helpers (`getMediaUrl`, `getMediaAlt`)

Day 3 — Seed & Polish:
- [ ] Write `src/scripts/seed.ts` with all default content + `pnpm seed` script in `package.json`
- [ ] Mirror it to `src/app/(frontend)/api/seed/route.ts` (importing from a shared `seed-data.ts`)
- [ ] Wire `generateMetadata` from `meta` group
- [ ] Wire `ScriptInjector` from the `Integrations` global
- [ ] Set up Vercel: connect repo, paste env vars, add Blob token, deploy
- [ ] First deploy: hit `/api/seed` once, then disable that route or auth-gate it

---

## 10. What to NOT Carry Forward

Things in this project that are accidental, not aspirational:
- **The duplicated seed code** between `scripts/seed.ts` and `api/seed/route.ts`. Extract to one file.
- **`src/lib/case-studies.ts`** — dead, pre-CMS. Don't replicate.
- **Inline access-control helpers** redefined in every collection file. Lift to `src/lib/access.ts`.
- **`force-dynamic` on every route** as a permanent solution. Fine to start; replace with revalidation once stable.
- **Missing `generateMetadata`** — the `meta` group exists but isn't read in routes. Wire it from day one in the next project.

---

## TL;DR

Postgres + Payload v3 + Next.js App Router, single deploy. Code-defined collections and globals. Pages composed of typed blocks rendered through a single `BlockRenderer`. Build the site static first, then port hardcoded copy into an idempotent `seed.ts` that doubles as your "factory reset" script. Editors get a structured admin where every section is on/off-able and every field is documented. Performance is mostly free if you respect `imageSizes`, parallelize queries, and tune `depth`.
