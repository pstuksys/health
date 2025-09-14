'use client'

import * as LucideIcons from 'lucide-react'
import Image from 'next/image'
import type { Page } from '@/payload-types'
import { mediaToUrl } from '@/lib/media'

type MedicalServicesGridProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'medicalServicesGrid' }
>

// Icon mapping for different medical services
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  scan: LucideIcons.Scan,
  activity: LucideIcons.Activity,
  zap: LucideIcons.Zap,
  heart: LucideIcons.Heart,
  stethoscope: LucideIcons.Stethoscope,
  check: LucideIcons.Check,
  calendar: LucideIcons.Calendar,
  settings: LucideIcons.Settings,
  shield: LucideIcons.Shield,
}

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
            {subtitle && <h2 className="text-lg font-medium text-gray-600 mb-2">{subtitle}</h2>}
            {title && (
              <h1 className="text-3xl md:text-4xl font-light text-ds-dark-blue">{title}</h1>
            )}
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {(services || []).map((service, index) => {
            const IconComponent = iconMap[service.icon || 'scan'] || LucideIcons.Scan
            const backgroundImageUrl = mediaToUrl(service.backgroundImage)
            const hasBackgroundImage = backgroundImageUrl !== '/placeholder.svg'

            return (
              <div
                key={service.id || index}
                className={`relative rounded-lg text-center shadow-sm hover:shadow-md transition-shadow min-h-[200px] ${
                  hasBackgroundImage ? '' : 'bg-white'
                }`}
              >
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
                    className={`font-semibold uppercase tracking-wide ${
                      hasBackgroundImage
                        ? 'text-white text-xl md:text-2xl'
                        : 'text-blue-900 text-lg'
                    }`}
                  >
                    {service.name}
                  </h3>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
