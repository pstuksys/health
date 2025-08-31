/**
 * Utility function to resolve page/blog relationships to URLs
 * Handles both Payload-style items (with linkType) and simple items (with direct href)
 */
export const resolveUrl = (item: {
  linkType?: 'internal' | 'external' | null
  href?: string | null
  page?: {
    relationTo: 'pages' | 'blogs'
    value: { slug?: string | null } | number
  } | null
}): string => {
  // Handle direct href (simpler structure)
  if (item.href && !item.linkType) {
    return item.href
  }

  if (item.linkType === 'external' && item.href) {
    return item.href
  }

  if (item.linkType === 'internal' && item.page) {
    const { relationTo, value } = item.page
    if (relationTo === 'pages') {
      const slug = typeof value === 'object' ? value.slug : ''
      return `/${slug || ''}`
    }
    if (relationTo === 'blogs') {
      const slug = typeof value === 'object' ? value.slug : ''
      return `/blogs/${slug || ''}`
    }
  }

  return '#'
}
