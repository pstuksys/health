import type { Header, Footer } from '@/payload-types'
import { resolveUrl } from './navigation'

// Types for the transformed navigation structure
export interface TransformedNavigationItem {
  label: string
  href?: string
  megaMenu?: {
    categories: Array<{
      title: string
      items: Array<{ label: string; href: string }>
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
    // Handle mega menu items
    if (item.hasMegaMenu && item.megaMenu) {
      const categories = (item.megaMenu.categories ?? []).map((cat) => ({
        title: cat.title,
        items: (cat.items ?? []).map((sub) => ({
          label: sub.label,
          href: resolveUrl(sub),
        })),
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

    // Handle regular navigation items
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
