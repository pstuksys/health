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
    const href = item.href

    // If the href is just '#' or empty, return it as is
    if (!href || href === '#') {
      return href
    }

    // If the href already has a protocol (http://, https://, mailto:, tel:, etc.), return as is
    if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(href)) {
      return href
    }

    // If the href starts with //, it's a protocol-relative URL, return as is
    if (href.startsWith('//')) {
      return href
    }

    // If the href doesn't start with /, assume it's a relative path and make it absolute
    if (!href.startsWith('/')) {
      return `https://${href}`
    }

    // If it starts with /, it's an internal path, but we're treating it as external
    // This might be a misconfiguration, but return as is
    return href
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
    const href = linkData.external?.href ?? '#'

    // If the href is just '#' or empty, return it as is
    if (!href || href === '#') {
      return href
    }

    // If the href already has a protocol (http://, https://, mailto:, tel:, etc.), return as is
    if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(href)) {
      return href
    }

    // If the href starts with //, it's a protocol-relative URL, return as is
    if (href.startsWith('//')) {
      return href
    }

    // If the href doesn't start with /, assume it's a relative path and make it absolute
    if (!href.startsWith('/')) {
      return `https://${href}`
    }

    // If it starts with /, it's an internal path, but we're treating it as external
    // This might be a misconfiguration, but return as is
    return href
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
