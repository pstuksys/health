'use client'

import { iconMap, type IconKey } from '@/lib/icons/icon-map'
import Image from 'next/image'
import type { Page } from '@/payload-types'
import { mediaToUrl } from '@/lib/media'
import { resolveLinkHref } from '@/lib/navigation'
import Link from 'next/link'

type MedicalServicesGridProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'medicalServicesGrid' }
>

export function MedicalServicesGrid({
  title,
  subtitle,
  backgroundColor,
  services,
}: MedicalServicesGridProps) {
  const bgColor = backgroundColor || 'gray-50'

  return (
    <section className={`py-16 px-4 bg-${bgColor}`}>
      <div className="max-w-container mx-auto">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h1 className="text-3xl md:text-4xl font-light text-ds-dark-blue">{title}</h1>
            )}
            {subtitle && <h2 className="text-lg font-medium text-ds-dark-blue mb-2">{subtitle}</h2>}
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {(services || []).map((service, index) => {
            const rawIcon = (service as any)?.icon
            let iconKey: IconKey = 'Scan'
            if (typeof rawIcon === 'string') {
              const pascal = (rawIcon.slice(0, 1).toUpperCase() + rawIcon.slice(1)) as IconKey
              if (pascal in iconMap) iconKey = pascal
              else if (rawIcon in iconMap) iconKey = rawIcon as IconKey
            }
            const IconComponent = iconMap[iconKey] || iconMap.Scan
            const backgroundImageUrl = mediaToUrl(service.backgroundImage)
            const hasBackgroundImage = backgroundImageUrl !== '/placeholder.svg'

            // Handle link configuration
            const linkHref = service.link
              ? resolveLinkHref({
                  linkType: service.link.linkType,
                  internal: service.link.internal,
                  external: service.link.external,
                })
              : null
            const shouldOpenInNewTab = service.link?.openInNewTab || false
            const hasLink = linkHref && linkHref !== '#'

            const CardContent = () => (
              <>
                {/* Background Image using Next.js Image */}
                {hasBackgroundImage && (
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <Image
                      src={backgroundImageUrl}
                      alt={service.name || 'Medical service'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 25vw, 20vw"
                    />
                  </div>
                )}

                {/* Overlay for better text readability when background image is present */}
                {hasBackgroundImage && (
                  <div className="absolute inset-0 bg-black/30 rounded-lg z-10" />
                )}

                {/* Content Container */}
                <div className="relative z-20 p-8 flex flex-col justify-center min-h-[200px]">
                  {service.available && (
                    <div className="absolute -top-2 -right-2 bg-ds-accent-yellow text-white text-xs font-medium px-3 py-1 rounded-full">
                      Available for self-pay
                    </div>
                  )}

                  {/* Icon - only show when no background image */}
                  {!hasBackgroundImage && (
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 flex items-center justify-center">
                        <IconComponent className="w-12 h-12 text-blue-500" />
                      </div>
                    </div>
                  )}

                  <h3
                    className={`font-semibold uppercase tracking-wide break-words hyphens-auto text-pretty ${
                      hasBackgroundImage
                        ? 'text-white text-xl md:text-2xl'
                        : 'text-blue-900 text-lg'
                    }`}
                  >
                    {service.name}
                  </h3>
                </div>
              </>
            )

            return (
              <div key={service.id || index}>
                {hasLink ? (
                  shouldOpenInNewTab ? (
                    <a
                      href={linkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative rounded-lg text-center shadow-sm hover:shadow-md transition-shadow min-h-[200px] block ${
                        hasBackgroundImage ? '' : 'bg-white'
                      } ${hasLink ? 'cursor-pointer' : ''}`}
                    >
                      <CardContent />
                    </a>
                  ) : (
                    <Link
                      href={linkHref}
                      className={`relative rounded-lg text-center shadow-sm hover:shadow-md transition-shadow min-h-[200px] block ${
                        hasBackgroundImage ? '' : 'bg-white'
                      } ${hasLink ? 'cursor-pointer' : ''}`}
                    >
                      <CardContent />
                    </Link>
                  )
                ) : (
                  <div
                    className={`relative rounded-lg text-center shadow-sm hover:shadow-md transition-shadow min-h-[200px] ${
                      hasBackgroundImage ? '' : 'bg-white'
                    }`}
                  >
                    <CardContent />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
