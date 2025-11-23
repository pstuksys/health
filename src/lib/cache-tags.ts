const DAY_IN_SECONDS = 60 * 60 * 24

export const cacheTags = {
  pages: 'payload:pages',
  page: (slug: string) => `payload:page:${slug || 'home'}`,
  blogs: 'payload:blogs',
  blog: (slug: string) => `payload:blog:${slug}`,
  blogCategory: (category: string) => `payload:blog-category:${category || 'uncategorized'}`,
  header: 'payload:global:header',
  footer: 'payload:global:footer',
}

export const CACHE_REVALIDATE_SECONDS = DAY_IN_SECONDS

export async function revalidateCacheTags(tags: string | string[]) {
  const tagList = Array.isArray(tags) ? tags : [tags]
  if (!tagList.length) return

  try {
    const { revalidateTag } = await import('next/cache')
    tagList.forEach((tag) => revalidateTag(tag))
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Failed to revalidate cache tags', { tags: tagList, error })
    }
  }
}
