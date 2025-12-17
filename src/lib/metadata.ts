import type { Metadata } from 'next'

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
