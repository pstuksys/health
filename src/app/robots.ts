import type { MetadataRoute } from 'next'

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/+$/, '')

// Note: in production Cloudflare's managed robots.txt is served in front of this
// file while that setting is on. The admin path is deliberately not listed here,
// since robots.txt is public and would advertise it.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/preview'] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
