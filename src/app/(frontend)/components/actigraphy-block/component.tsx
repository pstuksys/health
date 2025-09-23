'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Moon, Clock, Activity, Users } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { resolveLinkHref } from '@/lib/navigation'
import type { Page } from '@/payload-types'
import { isLexicalEditorState, RichText } from '@/app/(frontend)/components/ui/rich-text'
import { mediaToUrl } from '@/lib/media'

type ActigraphyBlockProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'actigraphyBlock' }
> & {
  className?: string
}

export function ActigraphyBlock(props: ActigraphyBlockProps) {
  const {
    className,
    heroTitle,
    heroSubtitle,
    whatIsTitle,
    whatIsRichText,
    whyTitle,
    whyIntroRichText,
    reasons,
    features,
    ipdTitle,
    ipdRichText,
    ctaTitle,
    ctaDescription,
    ctaPrimary,
    ctaSecondary,
    ctaImage,
  } = props as ActigraphyBlockProps

  const reasonIconMap = [Moon, Clock, Activity, Users, CheckCircle] as const

  const featureItems: string[] = Array.isArray(features)
    ? (features as unknown[])
        .map((f) => (typeof f === 'string' ? f : (f as any)?.text || ''))
        .filter(Boolean)
    : []

  return (
    <section className={cn('w-full py-16 md:py-20 px-4', className)}>
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-light text-balance leading-tight text-ds-dark-blue">
            {heroTitle || 'Actigraphy Sleep Testing'}
            <span className="block mt-2 text-ds-accent-yellow">Real-World Sleep Monitoring</span>
          </h1>
          {heroSubtitle ? (
            <p className="text-xl max-w-3xl mx-auto text-pretty leading-relaxed text-ds-pastille-green">
              {heroSubtitle}
            </p>
          ) : null}
        </div>

        {/* What is Actigraphy Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-ds-dark-blue">
              {whatIsTitle || 'What is Actigraphy?'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {whatIsRichText && isLexicalEditorState(whatIsRichText) ? (
              <RichText
                data={whatIsRichText as unknown}
                className="text-ds-pastille-green text-lg leading-relaxed"
              />
            ) : null}
          </CardContent>
        </Card>

        {/* Why Choose Actigraphy */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-light mb-4 text-ds-dark-blue">
              {whyTitle || 'Why Choose Actigraphy?'}
            </h2>
            {whyIntroRichText && isLexicalEditorState(whyIntroRichText) ? (
              <RichText
                data={whyIntroRichText as unknown}
                className="text-ds-pastille-green text-lg max-w-2xl mx-auto"
              />
            ) : null}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(reasons || []).map((r, index) => {
              const Icon = reasonIconMap[index % reasonIconMap.length]
              const title = (r as any)?.title as string | undefined
              const description = (r as any)?.description as string | undefined
              return (
                <Card key={index} className="h-full shadow-md hover:shadow-lg border-0">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-ds-accent-yellow/10 rounded-lg text-ds-accent-yellow">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg text-ds-dark-blue">{title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-ds-pastille-green">{description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <p className="text-center text-ds-pastille-green">
            Actigraphy is particularly useful when standard overnight tests do not reveal clear
            issues, or when long-term monitoring is needed to understand sleep variability.
          </p>
        </div>

        {/* How the Test is Performed */}
        <Card className="shadow-md hover:shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-ds-dark-blue">How Is the Test Performed?</CardTitle>
            <CardDescription className="text-ds-pastille-green">
              Simple, convenient monitoring that fits into your daily life
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {featureItems.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-ds-accent-yellow mt-0.5 flex-shrink-0" />
                  <p className="leading-relaxed text-ds-pastille-green">{feature}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* IPD Service Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-ds-dark-blue">
              {ipdTitle || 'Clinically Led, Conveniently Delivered'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ipdRichText && isLexicalEditorState(ipdRichText) ? (
              <RichText
                data={ipdRichText as unknown}
                className="text-ds-pastille-green leading-relaxed"
              />
            ) : null}
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="relative overflow-hidden rounded-lg">
          {ctaImage ? (
            <Image
              src={mediaToUrl(ctaImage as any) || '/placeholder.svg'}
              alt={(ctaImage as any)?.alt || 'Actigraphy'}
              width={800}
              height={400}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-black/60" />
          <Card className="relative bg-transparent border-0 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-balance text-white">
                {ctaTitle || 'Start Your Actigraphy Assessment Today'}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              {ctaDescription && isLexicalEditorState(ctaDescription) ? (
                <RichText
                  data={ctaDescription as unknown}
                  className="text-lg opacity-90 max-w-2xl mx-auto text-pretty text-white"
                />
              ) : null}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {(() => {
                  const btn = ctaPrimary as any
                  const href = resolveLinkHref({
                    linkType: btn?.linkType,
                    internal: btn?.internal,
                    external: btn?.external,
                  })
                  return btn?.label ? (
                    <a
                      href={href || '#'}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold text-white bg-ds-accent-yellow hover:opacity-90"
                    >
                      {btn.label}
                    </a>
                  ) : null
                })()}
                {(() => {
                  const btn = ctaSecondary as any
                  const href = resolveLinkHref({
                    linkType: btn?.linkType,
                    internal: btn?.internal,
                    external: btn?.external,
                  })
                  return btn?.label ? (
                    <a
                      href={href || '#'}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold border border-white text-white hover:bg-white hover:text-black"
                    >
                      {btn.label}
                    </a>
                  ) : null
                })()}
              </div>
              <p className="text-sm opacity-80 text-white">
                To learn more about actigraphy or to refer a patient, contact our team to discuss
                whether this assessment is right for you or your patient's needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
