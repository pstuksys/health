import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Page } from '@/payload-types'

// Extract the partnersBlock type from Page blocks
type PartnersBlockType = NonNullable<Page['blocks']>[number] & { blockType: 'partnersBlock' }

type PartnersBlockProps = Omit<PartnersBlockType, 'blockType' | 'blockName' | 'id'> & {
  className?: string
}

export function PartnersBlock({ title, partners, layout = 'grid', className }: PartnersBlockProps) {
  if (layout === 'carousel') {
    return (
      <section className={cn('py-16 px-4 sm:px-6 lg:px-8', className)}>
        <div className="max-w-container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-light leading-tight text-ds-dark-blue text-center mb-12">
            {title}
          </h2>
          <div className="overflow-hidden">
            <div className="flex animate-scroll space-x-8">
              {[...partners, ...partners].map((partner, index) => (
                <div key={index} className="flex-shrink-0">
                  <Image
                    src={
                      (typeof partner.logo === 'object' && partner.logo?.url) || '/placeholder.svg'
                    }
                    alt={(typeof partner.logo === 'object' && partner.logo?.alt) || 'Partner logo'}
                    width={120}
                    height={60}
                    className="h-24 w-44 object-cover opacity-60 hover:opacity-100 transition-opacity duration-200"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={cn('py-16 px-4 sm:px-6 lg:px-8', className)}>
      <div className="max-w-container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light leading-tight text-ds-dark-blue text-center mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div key={index} className="flex justify-center">
              <Image
                src={(typeof partner.logo === 'object' && partner.logo?.url) || '/placeholder.svg'}
                alt={(typeof partner.logo === 'object' && partner.logo?.alt) || 'Partner logo'}
                width={120}
                height={60}
                className="w-full h-24 md:h-24 md:w-44 object-cover opacity-60 hover:opacity-100 transition-opacity duration-200"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
