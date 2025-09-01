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

/**
 * Generic utility function to resolve internal/external links with the modern structure
 * Used by components like carousel, full-width banner, etc.
 */
export const resolveLinkHref = (linkData: {
  linkType?: 'internal' | 'external' | null
  internal?: {
    relation?: {
      relationTo?: 'pages' | 'blogs'
      value?: { slug?: string | null } | number
    } | null
  } | null
  external?: {
    href?: string | null
  } | null
}): string => {
  if (linkData.linkType === 'external') {
    return linkData.external?.href ?? '#'
  }

  if (linkData.linkType === 'internal' && linkData.internal?.relation) {
    const rel = linkData.internal.relation
    const doc = rel?.value ?? rel
    if (typeof doc === 'object' && doc !== null && 'slug' in doc) {
      const slug = doc.slug ?? ''
      const collection = rel?.relationTo
      if (collection === 'blogs') return `/blogs/${slug}`
      else if (collection === 'pages') return `/${slug}`
    }
  }

  return '#'
}
