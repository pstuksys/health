import Image from 'next/image'
import { cn } from '@/lib/utils'
import { mediaToUrl } from '@/lib/media'
import type { Page } from '@/payload-types'

// Extract the partnersBlock type from Page blocks
type PartnersBlockType = NonNullable<Page['blocks']>[number] & { blockType: 'partnersBlock' }

type PartnersBlockProps = Omit<PartnersBlockType, 'blockType' | 'blockName'> & {
  className?: string
}

// Helper function to check if a media item is an SVG
const isSvg = (logo: any): boolean => {
  if (typeof logo === 'object' && logo?.filename) {
    return logo.filename.toLowerCase().endsWith('.svg')
  }
  return false
}

export function PartnersBlock({
  id,
  title,
  partners,
  layout = 'grid',
  className,
}: PartnersBlockProps) {
  if (layout === 'carousel') {
    return (
      <section id={id || 'PartnersBlock'} className={cn('py-6 px-4 sm:px-4 lg:px-4', className)}>
        <div className="max-w-container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-light leading-tight text-ds-dark-blue text-center mb-12">
            {title}
          </h2>
          <div className="overflow-hidden">
            <div className="flex animate-scroll space-x-8">
              {[...partners, ...partners].map((partner, index) => {
                const isSvgLogo = isSvg(partner.logo)
                return (
                  <div key={index} className="flex-shrink-0 flex items-center justify-center">
                    <div
                      className={`${isSvgLogo ? 'h-20 w-40' : 'h-24 w-48'} flex items-center justify-center p-2`}
                    >
                      <Image
                        src={mediaToUrl(partner.logo) || '/placeholder.svg'}
                        alt={
                          (typeof partner.logo === 'object' && partner.logo?.alt) || 'Partner logo'
                        }
                        width={isSvgLogo ? 160 : 192}
                        height={isSvgLogo ? 80 : 96}
                        className={`${isSvgLogo ? 'max-h-full max-w-full' : 'h-full w-full'} object-contain opacity-60 hover:opacity-100 transition-opacity duration-200`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id={id || 'PartnersBlock'} className={cn('py-6 px-4 sm:px-4 lg:px-4', className)}>
      <div className="max-w-container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light leading-tight text-ds-dark-blue text-center mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => {
            const isSvgLogo = isSvg(partner.logo)
            return (
              <div key={index} className="flex justify-center items-center">
                <div
                  className={`${isSvgLogo ? 'h-20 w-40' : 'h-24 w-48'} flex items-center justify-center p-2`}
                >
                  <Image
                    src={mediaToUrl(partner.logo) || '/placeholder.svg'}
                    alt={(typeof partner.logo === 'object' && partner.logo?.alt) || 'Partner logo'}
                    width={isSvgLogo ? 160 : 192}
                    height={isSvgLogo ? 80 : 96}
                    className={`${isSvgLogo ? 'max-h-full max-w-full' : 'h-full w-full'} object-contain opacity-60 hover:opacity-100 transition-opacity duration-200`}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
