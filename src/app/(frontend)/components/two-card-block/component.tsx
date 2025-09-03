'use client'

import { Card, CardContent } from '@/components/ui/card'
import { CMSLink } from '@/components/ui/cms-link'
import Image from 'next/image'
import { mediaToUrl } from '@/lib/media'
import type { Media } from '@/payload-types'

type RawTwoCardBlockProps = {
  title: string
  subtitle?: string | null | undefined
  items?:
    | Array<{
        image?: number | Media | null | undefined
        title: string
        description: string
        links?:
          | Array<{
              text: string
              variant?: 'primary' | 'secondary' | null | undefined
              linkType?: 'internal' | 'external' | null | undefined
              internal?: { relation?: any }
              external?: { href?: string | null | undefined }
            }>
          | null
          | undefined
      }>
    | null
    | undefined
}

function resolveLink(link: any): { href: string; external: boolean } {
  if (link.linkType === 'external') {
    return { href: link.external?.href ?? '#', external: true }
  }

  // Internal link - resolve to proper URL
  if (link.internal?.relation) {
    const rel = link.internal.relation
    const doc = rel?.value ?? rel
    const slug = doc?.slug ?? ''
    const collection = doc?.collection ?? rel?.relationTo
    let href = '#'

    if (collection === 'blogs') href = `/blogs/${slug}`
    else if (collection === 'pages') href = `/${slug}`

    return { href, external: false }
  }

  return { href: '#', external: false }
}

export function TwoCardBlock({ title, subtitle, items }: RawTwoCardBlockProps) {
  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-container mx-auto">
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl md:text-4xl font-light text-ds-dark-blue mb-4">{title}</h2>
          )}
          {subtitle && (
            <p className="text-lg text-ds-pastille-green/80 font-light max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {(items || []).map((item, index) => (
            <Card
              key={index}
              className="border border-ds-pastille-green/20 rounded-md bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="relative w-full h-48 md:h-56 overflow-hidden rounded-lg">
                    <Image
                      src={mediaToUrl(item.image)}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <h3 className="text-xl md:text-2xl font-semibold text-ds-dark-blue mb-3">
                    {item.title}
                  </h3>

                  <p className="text-ds-pastille-green/80 font-light mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {(item.links || []).map((link, linkIndex) => {
                      const resolvedLink = resolveLink(link)
                      return (
                        <CMSLink
                          key={linkIndex}
                          href={resolvedLink.href}
                          variant={link.variant ?? 'primary'}
                          external={resolvedLink.external}
                        >
                          {link.text}
                        </CMSLink>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
