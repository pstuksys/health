'use client'

import { Calendar, Settings, Shield } from 'lucide-react'
import type { Page } from '@/payload-types'
import { mediaToUrl } from '@/lib/media'
import { CMSLink } from '../ui'
import { resolveLinkHref } from '@/lib/navigation'

type ServicesBannerBlockProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'servicesBannerBlock' }
>

// Icon mapping for different service types
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  calendar: Calendar,
  settings: Settings,
  shield: Shield,
}

export function ServicesBannerBlock({
  title,
  subtitle,
  backgroundImage,
  backgroundColor,
  textColor,
  options,
}: ServicesBannerBlockProps) {
  const bgColor = backgroundColor || 'slate-800'
  const textColorClass = textColor || 'white'

  return (
    <section className={`relative min-h-[600px] bg-${bgColor} overflow-hidden`}>
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: `url('${mediaToUrl(backgroundImage)}')`,
          }}
        />
      )}

      {/* Content Overlay */}
      <div className="relative z-10 px-6 py-16 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            {subtitle && <h1 className={`text-blue-400 text-lg font-medium mb-2`}>{subtitle}</h1>}
            {title && (
              <h2
                className={`text-${textColorClass} text-3xl md:text-4xl lg:text-5xl font-light leading-tight`}
              >
                {title}
              </h2>
            )}
          </div>

          {/* Services Grid */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
            {(options || []).map((option, index) => {
              const IconComponent = iconMap[option.icon || 'calendar'] || Calendar
              const resolvedHref = option.link ? resolveLinkHref(option.link) : '#'

              return (
                <div
                  key={index}
                  className={`flex-1 flex flex-col ${
                    index < (options?.length || 0) - 1 ? 'lg:border-r lg:border-white lg:pr-12' : ''
                  } ${index > 0 ? 'lg:pl-12' : ''}`}
                >
                  <div className="w-16 h-16 flex items-center justify-center mb-6">
                    <IconComponent className={`w-12 h-12 text-${textColorClass} stroke-1`} />
                  </div>

                  <div className="flex-grow">
                    <h3 className={`text-${textColorClass} text-xl font-medium mb-4`}>
                      {option.title}
                    </h3>
                    <p className={`text-gray-300 text-sm leading-relaxed mb-8`}>
                      {option.description}
                    </p>
                  </div>

                  {option.link && (
                    <CMSLink href={resolvedHref} variant="primary" className="self-start">
                      {option.buttonText || 'LEARN MORE'}
                    </CMSLink>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
