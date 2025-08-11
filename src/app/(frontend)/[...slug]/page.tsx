import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import type { Page } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export default async function DynamicPage(props: any) {
  const maybeParams = props?.params
  const params = typeof maybeParams?.then === 'function' ? await maybeParams : maybeParams
  const slug = params?.slug?.join('/') ?? ''
  const { isEnabled } = await draftMode()
  const draft = isEnabled
  const payload = await getPayload({ config: (await import('@/payload.config')).default })

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    draft,
    limit: 1,
  })

  const page = docs[0] as Page | undefined
  if (!page) return notFound()

  return (
    <main className="container mx-auto max-w-3xl py-8">
      <h1 className="text-3xl font-semibold mb-6">{(page as any).title}</h1>
      {/* Render lexical rich text JSON in your preferred renderer. Placeholder below. */}
      <pre className="whitespace-pre-wrap break-words text-sm bg-gray-100 p-4 rounded">
        {JSON.stringify(
          ((page as any).content ?? null) as unknown as SerializedEditorState,
          null,
          2,
        )}
      </pre>
    </main>
  )
}
