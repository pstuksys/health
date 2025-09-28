'use client'

import { Card, CardContent } from '@/components/ui/card'
import { CMSLink } from '@/components/ui/cms-link'
import Image from 'next/image'
import { mediaToUrl } from '@/lib/media'
import type { Page } from '@/payload-types'
import { resolveLinkHref } from '@/lib/navigation'

type TwoCardBlockProps = Extract<NonNullable<Page['blocks']>[number], { blockType: 'twoCardBlock' }>

export function TwoCardBlock({ title, subtitle, items }: TwoCardBlockProps) {
  return (
    <section className="w-full py-8 md:py-16 px-4">
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
              className="border-0 md:border border-ds-pastille-green/20 md:rounded-md bg-white shadow-xl rounded-sm md:shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <CardContent className="!p-0">
                <div className="p-0 md:p-4">
                  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-none md:rounded-lg">
                    <Image
                      src={mediaToUrl(item.image)}
                      alt={item.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </div>

                <div className="px-4 md:px-6 pb-4 md:pb-6 pt-0">
                  <h3 className="text-xl md:text-2xl font-semibold text-ds-dark-blue mb-3">
                    {item.title}
                  </h3>

                  <p className="text-ds-pastille-green/80 font-light mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-col [@media(min-width:420px)]:flex-row gap-3">
                    {(item.links || []).map((link, linkIndex) => {
                      const href = resolveLinkHref(link)
                      const isExternal = link.linkType === 'external'
                      return (
                        <CMSLink
                          key={linkIndex}
                          href={href}
                          variant={link.variant ?? 'primary'}
                          external={isExternal}
                          fullWidth={true}
                          className="w-full [@media(min-width:420px)]:w-auto"
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
