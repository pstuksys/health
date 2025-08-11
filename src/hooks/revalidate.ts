import type { Payload } from 'payload'

async function notifyRevalidate(tags: string[]): Promise<void> {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/api/revalidate?secret=${process.env.REVALIDATION_SECRET ?? ''}`
  await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ tags }),
  }).catch(() => {})
}

export const revalidateOnChange =
  (_payload: Payload) =>
  ({ doc, collection }: { doc: unknown; collection: { slug: string } }) => {
    const tags = [collection.slug]
    if (collection.slug === 'pages') {
      tags.push('pages', 'page:' + ((doc as any)?.slug ?? ''))
    }
    if (collection.slug === 'blogs') {
      tags.push('blogs', 'blog:' + ((doc as any)?.slug ?? ''))
    }
    void notifyRevalidate(tags)
  }
