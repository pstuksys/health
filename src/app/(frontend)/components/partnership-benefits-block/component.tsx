'use client'

import Image from 'next/image'
import type { Page } from '@/payload-types'
import { mediaToUrl } from '@/lib/media'
import { cn } from '@/lib/utils'

type PartnershipBenefitsBlockProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'partnershipBenefitsBlock' }
> & { className?: string }

export default function PartnershipBenefitsBlock(props: PartnershipBenefitsBlockProps) {
  const { className } = props
  const title = props.title ?? ''
  const benefits = Array.isArray(props.benefits) ? props.benefits : []
  const image = props.image

  return (
    <section className={cn('py-20 bg-ds-light-neutral', className)}>
      <div className="max-w-container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-ds-dark-blue text-balance">
              {title}
            </h2>
            <div>
              {benefits.map((b, index) => (
                <div
                  key={b?.id ?? index}
                  className="p-8 md:p-10 transition-all duration-300 hover:bg-white hover:translate-x-2 cursor-pointer border-b border-gray-200 last:border-b-0"
                >
                  <h3 className="font-semibold text-lg mb-2 text-ds-dark-blue">{b?.title ?? ''}</h3>
                  <p className="text-sm leading-relaxed text-ds-pastille-green">
                    {b?.description ?? ''}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <div className="flex justify-center">
                <div className="w-[448px] h-[448px] rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl">
                  <Image
                    src={mediaToUrl(image) || '/placeholder.svg'}
                    alt={title || 'Benefits image'}
                    width={448}
                    height={448}
                    className="w-[448px] h-[448px] object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
