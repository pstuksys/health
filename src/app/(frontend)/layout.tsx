import type React from 'react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Footer } from './components/footer/component'
import { getHeader, getFooter } from '@/lib/cms/payload-client'
import { NavWithScroll } from './components/navigation-menu/components/NavWithScroll'
import { siteMetadata } from '@/lib/metadata'
import { resolveUrl } from '@/lib/navigation'
import { BookingModal } from './components/booking-modal/component'
import { NavigationProgress } from './components/navigation-progress/component'
import { Suspense } from 'react'
import Script from 'next/script'
import { DraftModeBanner } from './components/draft-mode-banner/component'

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
  const bookingModal = header?.bookingModal
  const cookieYesId = process.env.NEXT_PUBLIC_COOKIEYES_ID
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID

  return (
    <html lang="en" className={`${poppins.variable} antialiased`} data-scroll-behavior="smooth">
      <body className="font-sans bg-white">
        {/* Cookie consent banner. beforeInteractive puts it in <head> ahead of the app (and of Google Tag Manager
            once added), so nothing sets cookies before consent. A plain <script> here breaks hydration and loops reloads. */}
        {cookieYesId && (
          <Script
            id="cookieyes"
            src={`https://cdn-cookieyes.com/client_data/${cookieYesId}/script.js`}
            strategy="beforeInteractive"
          />
        )}
        {/* Google Tag Manager (GA4 etc. are managed inside GTM by the SEO agency). beforeInteractive scripts run in
            order, so this always runs after CookieYes and its Consent Mode defaults. */}
        {gtmId && (
          <>
            <Script id="gtm" strategy="beforeInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(gtmId)});`}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(gtmId)}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
          </>
        )}
        {/* Suspense only wraps the bar (useSearchParams); pages stay unstreamed so 404s keep their status */}
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        <NavWithScroll
          items={items}
          ctaButton={
            header?.ctaButton?.label && header?.ctaButton?.href
              ? { label: header.ctaButton.label, href: header.ctaButton.href }
              : undefined
          }
        />
        <main className="min-h-screen">{children}</main>
        <BookingModal
          title={bookingModal?.title || 'Book a Video Consultation'}
          description={bookingModal?.description ?? undefined}
          options={(bookingModal?.options ?? []).map((option) => ({
            icon: option.icon ?? 'Wallet',
            title: option.title,
            description: option.description ?? undefined,
            href: resolveUrl(option),
            embed: Boolean(option.embed),
          }))}
          help={
            bookingModal?.help?.label
              ? {
                  label: bookingModal.help.label,
                  text: bookingModal.help.text ?? undefined,
                  href: resolveUrl(bookingModal.help),
                }
              : undefined
          }
        />
        <DraftModeBanner />
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
