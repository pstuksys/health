import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import type { Page as BlogDoc } from '@/payload-types'

export default async function BlogPage(props: any) {
  const slug = props?.params?.slug as string
  const isDraft = draftMode().isEnabled
  const payload = await getPayload({ config: (await import('@/payload.config')).default })
  const { docs } = await payload.find({
    collection: 'blogs',
    where: { slug: { equals: slug } },
    draft: isDraft,
    limit: 1,
  })
  const blog = docs[0] as unknown as BlogDoc | undefined
  if (!blog) return notFound()
  return (
    <main className="container mx-auto max-w-3xl py-8">
      <h1 className="text-3xl font-semibold mb-6">{(blog as any).title}</h1>
      <p className="text-muted-foreground mb-6">{(blog as any).excerpt}</p>
      <pre className="whitespace-pre-wrap break-words text-sm bg-gray-100 p-4 rounded">
        {JSON.stringify((blog as any).content, null, 2)}
      </pre>
    </main>
  )
}
