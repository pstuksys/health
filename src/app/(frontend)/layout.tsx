import type React from 'react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Footer } from './components/footer/component'
import { getHeader, getFooter } from '@/lib/cms/payload-client'
import { NavWithScroll } from './components/navigation-menu/components/NavWithScroll'
import { siteMetadata } from '@/lib/metadata'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = siteMetadata

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  colorScheme: 'light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3d426a' }, // ds-dark-blue
    { media: '(prefers-color-scheme: dark)', color: '#3d426a' },
  ],
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Fetch data directly from Payload
  const [header, footer] = await Promise.all([getHeader(), getFooter()])

  // Transform navigation data
  const { transformNavigationItems } = await import('@/lib/navigation-transformers')
  const items = header?.navigation ? transformNavigationItems(header.navigation) : []

  // Transform footer data
  const { transformFooterNavLinks, transformFooterLegalLinks } = await import(
    '@/lib/navigation-transformers'
  )

  const footerNavLinks = footer?.navigationLinks
    ? transformFooterNavLinks(footer.navigationLinks)
    : []
  const footerLegalLinks = footer?.legalLinks ? transformFooterLegalLinks(footer.legalLinks) : []

  return (
    <html lang="en" className={`${poppins.variable} antialiased`}>
      <body className="font-sans bg-white">
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
          socialLinks={footer?.socialLinks ?? []}
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
