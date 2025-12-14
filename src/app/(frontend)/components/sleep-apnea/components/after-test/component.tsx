'use client'

import { Card, CardContent } from '@/components/ui/card'
import { isLexicalEditorState, RichText } from '@/app/(frontend)/components/ui/rich-text'
import { cn } from '@/lib/utils'
import type { Page } from '@/payload-types'

type AfterTestBlock = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'sleepApneaAfterTest' }
>

export function SleepApneaAfterTest({
  className,
  title,
  subtitle,
  sections,
}: AfterTestBlock & { className?: string }) {
  const heading = title || ''
  const sub = subtitle || ''

  const content = sections || []
  const left = content[0]
  const right = content[1]

  return (
    <section className={cn('py-16', className)}>
      <div className="max-w-container mx-auto px-4">
        <div className="text-center mb-12">
          {heading ? (
            <h1 className="text-3xl md:text-4xl font-light text-ds-dark-blue mb-6 text-balance">
              {heading}
            </h1>
          ) : null}
          {sub ? (
            <p className="text-lg text-ds-pastille-green max-w-4xl mx-auto text-pretty">{sub}</p>
          ) : null}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Treatment Options */}
          <Card className="bg-white shadow-md hover:shadow-lg border-0 p-8">
            <CardContent className="p-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-ds-accent-yellow rounded-lg p-2">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-ds-dark-blue">
                  {left?.title || 'Treatment options'}
                </h2>
              </div>

              <div className="space-y-6">
                {left?.richText && isLexicalEditorState(left.richText) ? (
                  <RichText
                    data={left.richText}
                    className="text-ds-pastille-green text-sm leading-relaxed rich-text-headings-blue"
                  />
                ) : null}
              </div>
            </CardContent>
          </Card>

          {/* Care Pathway */}
          <Card className="bg-white shadow-md hover:shadow-lg border-0 p-8">
            <CardContent className="p-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-ds-accent-yellow rounded-lg p-2">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-ds-dark-blue">
                  {right?.title || 'Your personalised care pathway'}
                </h2>
              </div>

              <div className="space-y-6">
                {right?.richText && isLexicalEditorState(right.richText) ? (
                  <RichText
                    data={right.richText}
                    className="text-ds-pastille-green text-sm leading-relaxed rich-text-headings-blue"
                  />
                ) : null}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
