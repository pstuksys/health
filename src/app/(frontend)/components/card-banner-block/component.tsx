'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { isLexicalEditorState, RichText } from '@/app/(frontend)/components/ui/rich-text'
import type { Page } from '@/payload-types'
import { cn } from '@/lib/utils'

type CardBannerBlockProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'cardBannerBlock' }
> & {
  className?: string
}

export function CardBannerBlock(props: CardBannerBlockProps) {
  const { className, title, richText } = props as CardBannerBlockProps

  return (
    <section className={cn('w-full py-8 px-4', className)}>
      <div className="max-w-container mx-auto">
        <Card className="border-0 shadow-lg p-4">
          <CardHeader>
            <CardTitle className="text-2xl text-ds-dark-blue">{title || 'IPD Advantage'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {richText && isLexicalEditorState(richText) ? (
              <RichText
                data={richText as unknown}
                className="text-ds-pastille-green text-lg leading-relaxed rich-text-headings-blue"
              />
            ) : null}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
