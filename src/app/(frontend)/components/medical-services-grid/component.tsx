'use client'

import * as LucideIcons from 'lucide-react'
import type { Page } from '@/payload-types'

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

            return (
              <div
                key={service.id || index}
                className="relative bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                {service.available && (
                  <div className="absolute -top-2 -right-2 bg-ds-accent-yellow text-white text-xs font-medium px-3 py-1 rounded-full">
                    Available for self-pay
                  </div>
                )}

                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <IconComponent className="w-12 h-12 text-blue-500" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-blue-900 uppercase tracking-wide">
                  {service.name}
                </h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
