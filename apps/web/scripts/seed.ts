import { config as loadEnv } from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

loadEnv({ path: path.resolve(dirname, "../.env.local") })

const { getPayload } = await import("payload")
const { default: config } = await import("../payload.config.ts")

type PageSeed = {
  title: string
  slug: string
  layout?: any[]
  meta?: { title?: string; description?: string }
}

type ProjectSeed = {
  title: string
  slug: string
  intro?: string
  layout?: any[]
}

const homeLayout = [
  {
    blockType: "hero",
    enabled: true,
    caption: "Interior, Craft & Design",
    showStarburst: true,
  },
  {
    blockType: "textWithImage",
    enabled: true,
    heading: "We are Rift",
    paragraphs: [
      {
        text: "At Rift, we create interiors where design, craftsmanship and attention to detail come together as one. From the first sketch to final realization, we transform ideas into refined and distinctive spaces where form and function converge.",
      },
      {
        text: "Each interior is defined by a strong design vision, refined materials and meticulous finishing down to the smallest details.",
      },
    ],
    imagePosition: "right",
    ratio: "third",
  },
  {
    blockType: "twoImagesQuote",
    enabled: true,
    leadingText:
      "We believe exceptional interiors begin with listening and understanding. At Rift, we create spaces that are timeless, thoughtful and balanced. Crafted to be lived in and enjoyed, every day.",
    quote: "Where ideas take shape in timeless interiors",
    attributionLabel: "RIFT",
    quotePosition: "right",
  },
]

const aboutLayout = [
  {
    blockType: "textWithImage",
    enabled: true,
    paragraphs: [
      {
        text: "RIFT was founded in 2025. A passion for intentional design & craftsmanship lies at the core of everything we do.",
      },
      {
        text: "We believe true quality is defined by how something is made. Through the careful selection of materials, in the precision of every detail, and the attention given to each step of the process. Our interiors are built to stand the test of time, both in durability and in their visual relevance.",
      },
    ],
    imagePosition: "right",
    ratio: "third",
  },
  {
    blockType: "twoImagesQuote",
    enabled: true,
    leadingText:
      "By combining design and craftsmanship, we maintain control from concept to completion. This allows us to translate ideas into spaces that feel coherent, considered, and deeply connected to the people who use them.",
    quotePosition: "right",
  },
]

const processLayout = [
  {
    blockType: "processStep",
    enabled: true,
    stepNumber: "1.",
    title: "Introduction",
    description:
      "Every project begins with a conversation. We take the time to understand your needs, preferences, and how you use your space. Through an initial call and meeting, you get a first feel for materials, possibilities, and direction. We then follow up with a clear proposal and an initial cost indication.",
    imagePosition: "left",
  },
  {
    blockType: "processStep",
    enabled: true,
    stepNumber: "2.",
    title: "Design",
    description:
      "This is where ideas start to take form. We translate your input into a cohesive design, bringing together layout, materials, and atmosphere. You receive a visual presentation that gives a clear sense of the final result. After alignment, the design is refined into detailed technical drawings.",
    imagePosition: "right",
  },
  {
    blockType: "processStep",
    enabled: true,
    stepNumber: "3.",
    title: "Production",
    description:
      "The design is brought to life. During production, every element is carefully crafted with precision and attention to detail, ensuring quality at every stage.",
    imagePosition: "right",
  },
  {
    blockType: "processStep",
    enabled: true,
    stepNumber: "4.",
    title: "Installation",
    description:
      "On site, everything comes together. The installation is carried out with care and precision, resulting in an interior that feels balanced, personal, and complete.",
    imagePosition: "left",
  },
]

const privacyLayout = [
  {
    blockType: "richText",
    enabled: true,
    heading: "Privacy Policy",
    paragraphs: [
      {
        text: "This is a placeholder privacy policy. Replace with your firm's full text.",
      },
    ],
  },
]

const termsLayout = [
  {
    blockType: "richText",
    enabled: true,
    heading: "Terms & Conditions",
    paragraphs: [
      {
        text: "This is a placeholder terms & conditions document. Replace with your firm's full text.",
      },
    ],
  },
]

const pages: PageSeed[] = [
  {
    title: "Home",
    slug: "home",
    layout: homeLayout,
    meta: {
      title: "Rift — Interior, Craft & Design",
      description:
        "At Rift, we create interiors where design, craftsmanship and attention to detail come together.",
    },
  },
  {
    title: "About",
    slug: "about",
    layout: aboutLayout,
    meta: { title: "About — Rift" },
  },
  {
    title: "Process",
    slug: "process",
    layout: processLayout,
    meta: { title: "Process — Rift" },
  },
  {
    title: "Contact",
    slug: "contact",
    layout: [],
    meta: { title: "Contact — Rift" },
  },
  {
    title: "Privacy Policy",
    slug: "privacy",
    layout: privacyLayout,
    meta: { title: "Privacy Policy — Rift" },
  },
  {
    title: "Terms & Conditions",
    slug: "terms",
    layout: termsLayout,
    meta: { title: "Terms & Conditions — Rift" },
  },
]

const janitaLayout = [
  {
    blockType: "floatedImagePair",
    enabled: true,
    paragraphs: [
      {
        text: "By carefully considering the available space, a Murphy bed and smart integrated storage solutions were chosen. This provides sufficient space for all necessary materials and equipment, such as gym gear, without compromising the sense of calm or functionality of the space.",
      },
    ],
  },
  {
    blockType: "textWithImage",
    enabled: true,
    paragraphs: [
      {
        text: "The use of warm oak finishes, combined with contrasting stainless steel cabinet fronts, creates a contemporary and well-balanced aesthetic.",
      },
    ],
    imagePosition: "left",
    ratio: "quarter",
  },
]

const projects: ProjectSeed[] = [
  {
    title: "Janita Emmastraat",
    slug: "janita-emmastraat",
    intro:
      "For this guest room in Amsterdam, a multifunctional space was created in the basement, making optimal use of a compact area as both a home gym and guest room.",
    layout: janitaLayout,
  },
  { title: "Villa Bergen", slug: "villa-bergen", layout: [] },
  { title: "Studio Haarlem", slug: "studio-haarlem", layout: [] },
  { title: "Woning Alkmaar", slug: "woning-alkmaar", layout: [] },
  { title: "Atelier Amstel", slug: "atelier-amstel", layout: [] },
  { title: "Loft Jordaan", slug: "loft-jordaan", layout: [] },
]

async function seed() {
  const payload = await getPayload({ config })

  console.log("→ Seeding globals…")

  await payload.updateGlobal({
    slug: "header",
    data: {
      navItems: [
        { label: "Projects", href: "/projects" },
        { label: "About", href: "/about" },
        { label: "Process", href: "/process" },
        { label: "Contact", href: "/contact" },
      ],
    },
  })

  await payload.updateGlobal({
    slug: "footer",
    data: {
      tagline: "Get in touch or make an appointment",
      email: "info@rift-furniture.nl",
      links: [
        {
          label: "Instagram",
          href: "https://www.instagram.com/rift.furniture/",
          external: true,
        },
        { label: "Contact", href: "/contact", external: false },
      ],
    },
  })

  await payload.updateGlobal({
    slug: "integrations",
    data: {
      googleAnalytics: { enabled: false },
      metaPixel: { enabled: false },
      customScripts: [],
    },
  })

  console.log("→ Seeding pages…")
  for (const page of pages) {
    const existing = await payload.find({
      collection: "pages",
      where: { slug: { equals: page.slug } },
      limit: 1,
    })
    const data: any = {
      title: page.title,
      slug: page.slug,
      status: "published" as const,
      layout: page.layout ?? [],
      meta: page.meta,
      _status: "published" as const,
    }
    if (existing.docs.length === 0) {
      await payload.create({ collection: "pages", data })
      console.log(`  ✓ created ${page.slug}`)
    } else {
      await payload.update({
        collection: "pages",
        id: existing.docs[0].id,
        data,
      })
      console.log(`  ↻ updated ${page.slug}`)
    }
  }

  console.log("→ Seeding projects…")
  for (const project of projects) {
    const existing = await payload.find({
      collection: "projects",
      where: { slug: { equals: project.slug } },
      limit: 1,
    })
    const data: any = {
      title: project.title,
      slug: project.slug,
      status: "published" as const,
      intro: project.intro,
      layout: project.layout ?? [],
      _status: "published" as const,
    }
    if (existing.docs.length === 0) {
      await payload.create({ collection: "projects", data })
      console.log(`  ✓ created ${project.slug}`)
    } else {
      await payload.update({
        collection: "projects",
        id: existing.docs[0].id,
        data,
      })
      console.log(`  ↻ updated ${project.slug}`)
    }
  }

  console.log("✓ Seed complete")
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
