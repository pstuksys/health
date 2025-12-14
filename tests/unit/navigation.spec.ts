import { describe, expect, it } from 'vitest'
import {
  resolveLinkHref,
  resolveUrl,
  transformFooterLegalLinks,
  transformFooterNavLinks,
  transformNavigationItems,
} from '@/lib/navigation'

describe('navigation helpers', () => {
  it('resolves external links with protocol normalization and anchors', () => {
    expect(
      resolveLinkHref({ linkType: 'external', external: { href: 'example.com' } }),
    ).toEqual('https://example.com')
    expect(resolveLinkHref({ linkType: 'external', external: { href: '#section' } })).toEqual(
      '#section',
    )
    expect(resolveLinkHref({ linkType: 'external', external: { href: 'https://acme.com' } })).toEqual(
      'https://acme.com',
    )
  })

  it('resolves internal links for pages and blogs', () => {
    expect(
      resolveLinkHref({
        linkType: 'internal',
        internal: { relation: { relationTo: 'pages', value: { slug: 'about' } } },
      }),
    ).toEqual('/about')

    expect(
      resolveLinkHref({
        linkType: 'internal',
        internal: { relation: { relationTo: 'blogs', value: { slug: 'post' } } },
      }),
    ).toEqual('/blogs/post')
  })

  it('resolveUrl delegates to resolveLinkHref and falls back to external when only href is present', () => {
    expect(resolveUrl({ href: 'example.com' })).toEqual('https://example.com')
    expect(
      resolveUrl({
        page: { relationTo: 'pages', value: { slug: 'home' } },
      }),
    ).toEqual('/home')
  })

  it('transforms navigation items with mega menu', () => {
    const items = [
      {
        label: 'Services',
        hasMegaMenu: true,
        megaMenu: {
          categories: [
            { title: 'Sleep', linkType: 'internal', page: { relationTo: 'pages', value: { slug: 'sleep' } } },
          ],
          featured: [{ label: 'Blog', linkType: 'internal', page: { relationTo: 'blogs', value: { slug: 'news' } } }],
        },
      },
      {
        label: 'Contact',
        linkType: 'external',
        href: 'https://example.com/contact',
      },
    ]

    const transformed = transformNavigationItems(items as any)
    expect(transformed[0]?.megaMenu?.categories[0]?.href).toEqual('/sleep')
    expect(transformed[0]?.megaMenu?.featured[0]?.href).toEqual('/blogs/news')
    expect(transformed[1]?.href).toEqual('https://example.com/contact')
  })

  it('transforms footer links via resolveUrl', () => {
    const navigationLinks = [
      { label: 'Home', linkType: 'internal', page: { relationTo: 'pages', value: { slug: '' } } },
    ]
    const legalLinks = [
      { label: 'Privacy', href: '/privacy' },
    ]

    expect(transformFooterNavLinks(navigationLinks as any)[0]?.href).toEqual('/')
    expect(transformFooterLegalLinks(legalLinks as any)[0]?.href).toEqual('/privacy')
  })
})


