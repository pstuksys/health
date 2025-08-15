import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import type { Header, Footer } from '@/payload-types'

type HeaderFooter = { header: Header | null; footer: Footer | null }

async function fetchHeaderFooter(): Promise<HeaderFooter> {
  const payload = await getPayload({ config: (await import('@/payload.config')).default })
  const header = (await payload.findGlobal({ slug: 'header', depth: 2 })) as Header
  const footer = (await payload.findGlobal({ slug: 'footer', depth: 2 })) as Footer
  // Strip any circular refs coming from the local API internals
  const safe = JSON.parse(JSON.stringify({ header, footer })) as HeaderFooter
  return { header: safe.header ?? null, footer: safe.footer ?? null }
}

export const getHeaderFooter = unstable_cache(fetchHeaderFooter, ['globals:header-footer'], {
  tags: ['global:header', 'global:footer'],
})
