'use client'

import { isLexicalEditorState, RichText } from '@/app/(frontend)/components/ui/rich-text'
import type { Page } from '@/payload-types'
import { cn } from '@/lib/utils'

type SplitInfoListBlockProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'splitInfoListBlock' }
> & {
  className?: string
}

export function SplitInfoListBlock(props: SplitInfoListBlockProps) {
  const { className, leftTitle, leftRichText, listItems } = props

  const items = (listItems ?? []).map((item) => item?.text ?? '').filter(Boolean)

  return (
    <section className={cn('w-full py-16 px-4', className)}>
      <div className="max-w-container mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-light mb-6 text-ds-dark-blue">
              {leftTitle || 'When Is This Recommended?'}
            </h2>
            {leftRichText && isLexicalEditorState(leftRichText) ? (
              <RichText
                data={leftRichText}
                className="text-lg leading-relaxed text-ds-pastille-green rich-text-headings-blue"
              />
            ) : null}
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-3">
              {items.map((text, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-ds-light-neutral/40"
                >
                  <div className="w-2 h-2 bg-ds-accent-yellow rounded-full mt-2 flex-shrink-0" />
                  <p className="text-ds-pastille-green">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
