import type { Footer, Header } from '@/payload-types'

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
  const linkType = item.linkType ?? (item.page ? 'internal' : item.href ? 'external' : undefined)

  return resolveLinkHref({
    linkType,
    internal: item.page
      ? {
          relation: {
            relationTo: item.page.relationTo,
            value: typeof item.page.value === 'object' ? item.page.value : undefined,
          },
        }
      : undefined,
    external: item.href ? { href: item.href } : undefined,
  })
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

    // If the href is empty, return '#'
    if (!href) {
      return '#'
    }

    // If the href starts with #, it's an anchor link for same-page navigation
    if (href.startsWith('#')) {
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

/**
 * Find a navigation item by its label
 */
export const findNavigationItem = <T extends { label: string }>(
  items: T[],
  label: string,
): T | undefined => {
  return items.find((item) => item.label === label)
}

export interface TransformedNavigationItem {
  label: string
  href?: string
  megaMenu?: {
    categories: Array<{
      title: string
      href: string
    }>
    featured: Array<{ label: string; href: string }>
  }
}

export interface TransformedFooterLink {
  label: string
  href: string
}

/**
 * Transform navigation items from Payload CMS format to a cleaner structure
 */
export function transformNavigationItems(
  navigation: Header['navigation'],
): TransformedNavigationItem[] {
  if (!navigation) return []

  return navigation.map((item) => {
    if (item.hasMegaMenu && item.megaMenu) {
      const categories = (item.megaMenu.categories ?? []).map((cat) => ({
        title: cat.title,
        href: resolveUrl(cat),
      }))

      const featured = (item.megaMenu.featured ?? []).map((f) => ({
        label: f.label,
        href: resolveUrl(f),
      }))

      return {
        label: item.label,
        megaMenu: { categories, featured },
      }
    }

    return {
      label: item.label,
      href: resolveUrl(item),
    }
  })
}

/**
 * Transform footer navigation links
 */
export function transformFooterNavLinks(
  navigationLinks: Footer['navigationLinks'],
): TransformedFooterLink[] {
  if (!navigationLinks) return []

  return navigationLinks.map((link) => ({
    label: link.label ?? '',
    href: resolveUrl(link),
  }))
}

/**
 * Transform footer legal links
 */
export function transformFooterLegalLinks(
  legalLinks: Footer['legalLinks'],
): TransformedFooterLink[] {
  if (!legalLinks) return []

  return legalLinks.map((link) => ({
    label: link.label ?? '',
    href: resolveUrl(link),
  }))
}
