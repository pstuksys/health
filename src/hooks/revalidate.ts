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

// New hook specifically for blogs with proper typing and unstable cache support
export const revalidateBlogsOnChange = async ({ doc, collection, operation }: any) => {
  // Only revalidate for blogs collection
  if (collection.slug !== 'blogs') return

  const blogDoc = doc as { slug?: string; _status?: 'draft' | 'published' }
  const tags: string[] = ['blogs', 'blog-list', 'blog-posts']

  // Add specific blog tag if slug exists
  if (blogDoc.slug) {
    tags.push(`blog:${blogDoc.slug}`)
  }

  // Add operation-specific tags for better cache invalidation
  if (operation === 'create') {
    tags.push('blog-created')
  } else if (operation === 'update') {
    tags.push('blog-updated')
  }

  // Revalidate the blog list page and individual blog page
  tags.push('blogs-page', 'blog-detail')

  // Notify revalidation
  await notifyRevalidate(tags)
}
