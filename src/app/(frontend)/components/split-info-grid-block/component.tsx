'use client'

import { isLexicalEditorState, RichText } from '@/app/(frontend)/components/ui/rich-text'
import type { Page } from '@/payload-types'
import { cn } from '@/lib/utils'
import { iconMap, type IconKey } from '@/lib/icons/icon-map'

type SplitInfoGridBlockProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'splitInfoGridBlock' }
> & {
  className?: string
}

export function SplitInfoGridBlock(props: SplitInfoGridBlockProps) {
  const { className, leftTitle, leftRichText, rightItems } = props as SplitInfoGridBlockProps

  const items = (Array.isArray(rightItems) ? rightItems : []).map(
    (raw): { label: string; icon?: IconKey } => {
      if (typeof raw === 'string') return { label: raw }
      const rec = (raw as Record<string, unknown>) ?? {}
      const label = typeof rec.label === 'string' ? rec.label : ''
      const icon =
        typeof rec.icon === 'string' && rec.icon in iconMap ? (rec.icon as IconKey) : undefined
      return { label, icon }
    },
  )

  return (
    <section className={cn('w-full py-16 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-light mb-6 text-ds-dark-blue">{leftTitle || ''}</h2>
            {leftRichText && isLexicalEditorState(leftRichText) ? (
              <RichText
                data={leftRichText as unknown}
                className="text-ds-pastille-green text-lg leading-relaxed space-y-4"
              />
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {items.map((item, index) => {
              const Icon = item.icon ? iconMap[item.icon] : iconMap.Activity
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 md:p-4 rounded-lg border border-ds-dark-blue transform-gpu transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="text-ds-accent-yellow flex-shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-ds-dark-blue overflow-hidden text-wrap">
                    {item.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
