export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <section className="px-8 py-16 md:px-12">
      <h1 className="font-serif text-4xl capitalize">{slug.replace(/-/g, " ")}</h1>
    </section>
  )
}
