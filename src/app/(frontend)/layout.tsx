import type React from 'react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { NavWithScroll } from './components/navigation-menu/NavWithScroll'
import { Footer } from './components/footer/component'
import { getHeaderFooter } from '@/lib/cms/globals'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Health & Wellness Platform',
    template: '%s | Health & Wellness Platform',
  },
  description:
    'Your comprehensive health and wellness platform for sleep disorders, diagnostics, treatments, and lifestyle tips.',
  keywords: [
    'health',
    'wellness',
    'sleep disorders',
    'medical diagnostics',
    'treatments',
    'healthcare',
  ],
  authors: [{ name: 'Health & Wellness Team' }],
  creator: 'Health & Wellness Platform',
  publisher: 'Health & Wellness Platform',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: 'healthcare',
  classification: 'healthcare',
  generator: 'Next.js',
  applicationName: 'Health & Wellness Platform',
  referrer: 'origin-when-cross-origin',
  verification: {
    // Add these when you have them
    // google: 'your-google-site-verification',
    // yandex: 'your-yandex-verification',
    // yahoo: 'your-yahoo-verification',
    // other: 'your-other-verification',
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      en: '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Health & Wellness Platform',
    description:
      'Your comprehensive health and wellness platform for sleep disorders, diagnostics, treatments, and lifestyle tips.',
    siteName: 'Health & Wellness Platform',
    images: [
      {
        url: '/logo.svg', // Update with your actual OG image
        width: 1200,
        height: 630,
        alt: 'Health & Wellness Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health & Wellness Platform',
    description:
      'Your comprehensive health and wellness platform for sleep disorders, diagnostics, treatments, and lifestyle tips.',
    creator: '@yourtwitterhandle', // Update with your Twitter handle
    images: ['/logo.svg'], // Update with your actual Twitter image
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
      { url: '/apple-icon-180.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json', // Create a web app manifest
}

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
