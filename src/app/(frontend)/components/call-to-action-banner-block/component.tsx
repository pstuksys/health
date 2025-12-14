'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { isLexicalEditorState, RichText } from '@/app/(frontend)/components/ui/rich-text'
import type { Page } from '@/payload-types'
import { cn } from '@/lib/utils'
import { resolveLinkHref } from '@/lib/navigation'
import { mediaToUrl } from '@/lib/media'

type CallToActionBannerBlockProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'callToActionBannerBlock' }
> & {
  className?: string
}

export function CallToActionBannerBlock(props: CallToActionBannerBlockProps) {
  const {
    className,
    ctaImage,
    ctaTitle,
    ctaDescription,
    ctaPrimary,
    ctaSecondary,
    footerRichText,
    fullWidth,
  } = props

  const isFullWidth = !!fullWidth
  const resolveButtonHref = (button?: CallToActionBannerBlockProps['ctaPrimary']) =>
    resolveLinkHref({
      linkType: button?.linkType,
      internal: button?.internal,
      external: button?.external,
    })

  return (
    <section className={cn('call-to-action-banner-block w-full px-4 py-8', className)}>
      <div
        className={cn(
          'relative overflow-hidden grid place-items-center rounded-lg min-h-[360px]',
          isFullWidth ? 'width-container md:min-h-[450px]' : 'max-w-5xl mx-auto md:aspect-[2/1]',
        )}
      >
        {ctaImage ? (
          <Image
            src={mediaToUrl(ctaImage) || '/placeholder.svg'}
            alt={(ctaImage as { alt?: string | null })?.alt || 'CTA'}
            width={1200}
            height={600}
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
          />
        ) : null}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Card className="relative z-20 bg-transparent border-0 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-balance text-white">{ctaTitle || ' '}</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            {ctaDescription && isLexicalEditorState(ctaDescription) ? (
              <RichText
                data={ctaDescription}
                className="text-lg opacity-90 max-w-2xl mx-auto text-pretty text-white"
              />
            ) : null}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {(() => {
                const href = resolveButtonHref(ctaPrimary)
                return ctaPrimary?.label ? (
                  <a
                    href={href || '#'}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold text-white bg-ds-accent-yellow hover:opacity-90"
                  >
                    {ctaPrimary.label}
                  </a>
                ) : null
              })()}
              {(() => {
                const href = resolveButtonHref(ctaSecondary)
                return ctaSecondary?.label ? (
                  <a
                    href={href || '#'}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold border border-white text-white hover:bg-white hover:text-black"
                  >
                    {ctaSecondary.label}
                  </a>
                ) : null
              })()}
            </div>

            {footerRichText && isLexicalEditorState(footerRichText) ? (
              <RichText
                data={footerRichText}
                className="text-sm opacity-80 text-white max-w-2xl mx-auto"
              />
            ) : null}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
