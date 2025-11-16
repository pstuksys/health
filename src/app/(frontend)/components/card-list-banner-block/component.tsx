'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { isLexicalEditorState, RichText } from '@/app/(frontend)/components/ui/rich-text'
import type { Page } from '@/payload-types'
import { cn } from '@/lib/utils'
import { CheckCircle } from 'lucide-react'

type CardListBannerBlockProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'cardListBannerBlock' }
> & {
  className?: string
}

export function CardListBannerBlock(props: CardListBannerBlockProps) {
  const { className, title, introRichText, conclusionRichText, items } =
    props as CardListBannerBlockProps

  const listItems = (Array.isArray(items) ? items : []).map((raw): { text: string } => {
    if (typeof raw === 'string') return { text: raw }
    const rec = (raw as Record<string, unknown>) ?? {}
    const text = typeof rec.text === 'string' ? rec.text : ''
    return { text }
  })

  return (
    <section className={cn('w-full py-8 px-4', className)}>
      <div className=" mx-auto">
        <Card className="shadow-md hover:shadow-lg border-0 p-4">
          <CardHeader>
            <CardTitle className="text-2xl text-ds-dark-blue">
              {title || 'Who Should Be Referred?'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {introRichText && isLexicalEditorState(introRichText) ? (
              <RichText
                data={introRichText as unknown}
                className="leading-relaxed text-ds-pastille-green rich-text-headings-blue"
              />
            ) : null}

            <div className="grid gap-4">
              {listItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-ds-accent-yellow mt-0.5 flex-shrink-0" />
                  <p className="leading-relaxed text-ds-pastille-green">{item.text}</p>
                </div>
              ))}
            </div>

            {conclusionRichText && isLexicalEditorState(conclusionRichText) ? (
              <RichText
                data={conclusionRichText as unknown}
                className="leading-relaxed text-ds-pastille-green font-medium rich-text-headings-blue"
              />
            ) : null}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
