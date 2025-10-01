import type { Metadata } from 'next'

export const siteMetadata: Metadata = {
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
    icon: [{ url: '/logo.svg', type: 'image/svg+xml' }],
  },
  manifest: '/manifest.json', // Create a web app manifest
}
