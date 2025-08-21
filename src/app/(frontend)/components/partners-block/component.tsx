import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Partner = { logo: string; href?: string; name: string }

type PartnersBlockProps = { partners: Partner[]; layout?: 'grid' | 'carousel'; className?: string }

export function PartnersBlock({ partners, layout = 'grid', className }: PartnersBlockProps) {
  if (layout === 'carousel') {
    return (
      <section className={cn('py-16 px-4 sm:px-6 lg:px-8', className)}>
        <div className="max-w-container mx-auto">
          <div className="overflow-hidden">
            <div className="flex animate-scroll space-x-12">
              {[...partners, ...partners].map((partner, index) => (
                <div key={index} className="flex-shrink-0">
                  {partner.href ? (
                    <Link
                      href={partner.href}
                      className="block opacity-60 hover:opacity-100 transition-opacity duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={partner.logo || '/placeholder.svg'}
                        alt={partner.name}
                        width={120}
                        height={60}
                        className="h-12 w-auto object-contain"
                      />
                    </Link>
                  ) : (
                    <Image
                      src={partner.logo || '/placeholder.svg'}
                      alt={partner.name}
                      width={120}
                      height={60}
                      className="h-12 w-auto object-contain opacity-60"
                    />
                  )}
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div key={index} className="flex justify-center">
              {partner.href ? (
                <Link
                  href={partner.href}
                  className="block opacity-60 hover:opacity-100 transition-opacity duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={partner.logo || '/placeholder.svg'}
                    alt={partner.name}
                    width={120}
                    height={60}
                    className="h-12 w-auto object-contain"
                  />
                </Link>
              ) : (
                <Image
                  src={partner.logo || '/placeholder.svg'}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain opacity-60"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
