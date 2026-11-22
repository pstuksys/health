import type { Metadata } from 'next'

/**
 * Open Graph fields every page shares. Next replaces the whole `openGraph`
 * object when a page sets its own, so pages spread these back in.
 */
export const openGraphDefaults = {
  type: 'website',
  locale: 'en_GB',
  siteName: 'IPDiagnostics',
} as const

/**
 * Route path for a page's self-referencing canonical and og:url, e.g.
 * `patient/cpap` -> `/patient/cpap`. Relative paths resolve against
 * `metadataBase` (NEXT_PUBLIC_SITE_URL).
 */
export function canonicalPath(path: string): string {
  return '/' + path.replace(/^\/+|\/+$/g, '')
}

export const siteMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'IPDiagnostics',
    template: '%s | IPDiagnostics',
  },
  description:
    'Independent Physiological Diagnostics — specialists in sleep, neurophysiology, and lung function testing across the UK.',
  keywords: [
    'IPDiagnostics',
    'sleep diagnostics',
    'neurophysiology',
    'lung function testing',
    'sleep apnea',
    'EEG',
    'spirometry',
  ],
  authors: [{ name: 'IPDiagnostics' }],
  creator: 'IPDiagnostics',
  publisher: 'IPDiagnostics',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: 'healthcare',
  classification: 'healthcare',
  generator: 'Next.js',
  applicationName: 'IPDiagnostics',
  referrer: 'origin-when-cross-origin',
  verification: {
    // Add these when you have them
    // google: 'your-google-site-verification',
    // yandex: 'your-yandex-verification',
    // yahoo: 'your-yahoo-verification',
    // other: 'your-other-verification',
  },
  // No site-wide canonical: each route sets its own via canonicalPath(), otherwise
  // every page would point search engines at the homepage.
  openGraph: {
    ...openGraphDefaults,
    title: 'IPDiagnostics',
    description:
      'Independent Physiological Diagnostics — specialists in sleep, neurophysiology, and lung function testing across the UK.',
    siteName: 'IPDiagnostics',
    images: [
      {
        url: '/logo.svg', // Update with your actual OG image
        width: 1200,
        height: 630,
        alt: 'IPDiagnostics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IPDiagnostics',
    description:
      'Independent Physiological Diagnostics — specialists in sleep, neurophysiology, and lung function testing across the UK.',
    creator: '@ipdiagnostics', // Update if a different handle is used
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
    icon: [{ url: '/logo.svg', type: 'image/svg+xml' }],
  },
  manifest: '/manifest.json', // Create a web app manifest
}
