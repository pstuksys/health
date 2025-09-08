import type React from 'react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { NavWithScroll } from './components/navigation-menu/NavWithScroll'
import { Footer } from './components/footer/component'
import { getHeaderFooter } from '@/lib/cms/globals'
import { Banner } from './components/banner/component'
// import { Banner } from './components/banner/component'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Design System App',
  description: 'Built with custom design system',
  generator: 'v0.app',
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { header, footer } = await getHeaderFooter()

  const items = (header?.navigation ?? []).map((item: any) => {
    if (item.hasMegaMenu && item.megaMenu) {
      const categories = (item.megaMenu.categories ?? []).map((cat: any) => ({
        title: cat.title,
        items: (cat.items ?? []).map((sub: any) => {
          let href = '#'
          if (sub.linkType === 'external') href = sub.href ?? '#'
          else if (sub.page && 'relationTo' in sub.page && sub.page.value) {
            const rel = sub.page.relationTo
            const val = sub.page.value as { slug?: string }
            href = rel === 'blogs' ? `/blogs/${val?.slug ?? ''}` : `/${val?.slug ?? ''}`
          }
          return { label: sub.label, href }
        }),
      }))
      const featured = (item.megaMenu.featured ?? []).map((f: any) => {
        let href = '#'
        if (f.linkType === 'external') href = f.href ?? '#'
        else if (f.page && 'relationTo' in f.page && f.page.value) {
          const rel = f.page.relationTo
          const val = f.page.value as { slug?: string }
          href = rel === 'blogs' ? `/blogs/${val?.slug ?? ''}` : `/${val?.slug ?? ''}`
        }
        return { label: f.label, href }
      })
      return { label: item.label, megaMenu: { categories, featured } }
    }
    let href = '#'
    if (item.linkType === 'external') href = item.href ?? '#'
    else if (item.page && 'relationTo' in item.page && item.page.value) {
      const rel = item.page.relationTo
      const val = item.page.value as { slug?: string }
      href = rel === 'blogs' ? `/blogs/${val?.slug ?? ''}` : `/${val?.slug ?? ''}`
    }
    return { label: item.label, href }
  })

  const footerNavLinks = (footer?.navigationLinks ?? []).map((l: any) => {
    if (l.linkType === 'external') return { label: l.label ?? '', href: l.href ?? '#' }
    const rel = l.page?.relationTo
    const val = l.page?.value as { slug?: string } | undefined
    const href = rel === 'blogs' ? `/blogs/${val?.slug ?? ''}` : `/${val?.slug ?? ''}`
    return { label: l.label ?? '', href }
  })
  const footerLegalLinks = (footer?.legalLinks ?? []).map((l: any) => {
    if (l.linkType === 'external') return { label: l.label ?? '', href: l.href ?? '#' }
    const rel = l.page?.relationTo
    const val = l.page?.value as { slug?: string } | undefined
    const href = rel === 'blogs' ? `/blogs/${val?.slug ?? ''}` : `/${val?.slug ?? ''}`
    return { label: l.label ?? '', href }
  })
  const socialLinks = (footer?.socialLinks ?? []).map((s: any) => ({
    platform: s.platform ?? '',
    href: s.url ?? '#',
  }))

  return (
    <html lang="en" className={`${poppins.variable} antialiased`}>
      {/* TODO: if needed to revert add bg-ds-light-neutral to body */}
      <body className="font-sans bg-white">
        {header?.enableBanter && header?.headerDescription && (
          <Banner text={header.headerDescription} />
        )}
        <NavWithScroll
          items={items}
          ctaButton={
            header?.ctaButton?.label && header?.ctaButton?.href
              ? { label: header.ctaButton.label, href: header.ctaButton.href }
              : undefined
          }
        />
        <main className="min-h-screen">{children}</main>
        <Footer
          about={footer?.about ?? ''}
          socialLinks={socialLinks}
          navLinks={footerNavLinks}
          legalLinks={footerLegalLinks}
          contact={{
            email: footer?.contact?.email ?? undefined,
            phone: footer?.contact?.phone ?? undefined,
            address: footer?.contact?.address ?? undefined,
          }}
        />
      </body>
    </html>
  )
}

// (client wrapper moved to components/navigation-menu/NavWithScroll.tsx)
