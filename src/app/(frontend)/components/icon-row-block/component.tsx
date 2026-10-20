import { ArrowRight } from 'lucide-react'
import type { Page } from '@/payload-types'
import { cn } from '@/lib/utils'
import { iconMap } from '@/lib/icons/icon-map'

type IconRowBlockProps = Extract<NonNullable<Page['blocks']>[number], { blockType: 'iconRowBlock' }>

export function IconRowBlock({ title, description, showSteps, items }: IconRowBlockProps) {
  const rowItems = items ?? []

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-container mx-auto grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:items-start">
        <div>
          {title && <h2 className="text-3xl font-light text-ds-dark-blue mb-4">{title}</h2>}
          {description && (
            <p className="text-ds-pastille-green font-light leading-relaxed">{description}</p>
          )}
        </div>

        <ol
          className={cn(
            'grid gap-6',
            showSteps
              ? 'sm:grid-cols-2 lg:flex lg:items-start'
              : 'grid-cols-2 sm:grid-cols-3 lg:flex lg:items-start lg:justify-between',
          )}
        >
          {rowItems.map((item, index) => {
            const Icon = iconMap[item.icon ?? 'Activity']
            const isLast = index === rowItems.length - 1

            return (
              <li
                key={item.id ?? index}
                className={cn('flex lg:flex-1', showSteps ? 'items-start gap-4' : 'justify-center')}
              >
                <div
                  className={cn(
                    'flex flex-col',
                    showSteps ? 'items-start text-left' : 'items-center text-center',
                  )}
                >
                  <div className="relative mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ds-light-neutral text-ds-pastille-green">
                      <Icon className="h-7 w-7" aria-hidden />
                    </div>
                    {showSteps && (
                      <span className="absolute -left-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-ds-accent-yellow text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <h3
                    className={cn(
                      'text-ds-dark-blue',
                      showSteps ? 'text-lg font-normal mb-2' : 'text-sm font-light',
                    )}
                  >
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-ds-pastille-green font-light leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
                {showSteps && !isLast && (
                  <ArrowRight
                    className="hidden lg:block mt-5 h-5 w-5 flex-shrink-0 text-ds-accent-yellow"
                    aria-hidden
                  />
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
