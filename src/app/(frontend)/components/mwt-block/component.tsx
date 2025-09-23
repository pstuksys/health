'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Clock, Brain, Activity } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { resolveLinkHref } from '@/lib/navigation'
import type { Page } from '@/payload-types'
import { isLexicalEditorState, RichText } from '@/app/(frontend)/components/ui/rich-text'
import { mediaToUrl } from '@/lib/media'

type MWTBlockProps = Extract<NonNullable<Page['blocks']>[number], { blockType: 'mwtBlock' }> & {
  className?: string
}

export function MWTBlock(props: MWTBlockProps) {
  const {
    className,
    heroTitle,
    heroSubtitle,
    whatIsTitle,
    whatIsRichText,
    importanceTitle,
    importanceIntroRichText,
    testBenefits,
    whyCardTitle,
    whyCardDescription,
    whoTitle,
    whoRichText,
    happensTitle,
    happensIntroRichText,
    testSteps,
    happensDetailRichText,
    ipdTitle,
    ipdRichText,
    ctaTitle,
    ctaDescription,
    ctaPrimary,
    ctaSecondary,
    ctaImage,
  } = props as MWTBlockProps

  const stepIconMap = [Clock, Activity, Brain] as const

  const benefitItems: string[] = Array.isArray(testBenefits)
    ? (testBenefits as unknown[])
        .map((b) => (typeof b === 'string' ? b : (b as any)?.text || ''))
        .filter(Boolean)
    : []

  return (
    <section className={cn('w-full py-16 md:py-20 px-4', className)}>
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-light text-balance leading-tight text-ds-dark-blue">
            {heroTitle || 'Maintenance of Wakefulness Test'}
            <span className="block mt-2 text-ds-accent-yellow">(MWT)</span>
          </h1>
          {heroSubtitle ? (
            <p className="text-xl max-w-3xl mx-auto text-pretty leading-relaxed text-ds-pastille-green">
              {heroSubtitle}
            </p>
          ) : null}
        </div>

        {/* What is MWT Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-ds-dark-blue">
              {whatIsTitle || 'What is a Maintenance of Wakefulness Test (MWT)?'}
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

        {/* Importance Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-light mb-4 text-ds-dark-blue">
              {importanceTitle || 'The Importance of Maintenance of Wakefulness Test'}
            </h2>
            {importanceIntroRichText && isLexicalEditorState(importanceIntroRichText) ? (
              <RichText
                data={importanceIntroRichText as unknown}
                className="text-ds-pastille-green text-lg max-w-2xl mx-auto"
              />
            ) : null}
          </div>

          <Card className="shadow-md hover:shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-ds-dark-blue">
                {whyCardTitle || 'Why is MWT Important?'}
              </CardTitle>
              <CardDescription className="text-ds-pastille-green">
                {whyCardDescription ||
                  'Results can inform critical decisions about your daily life and safety'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {benefitItems.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-ds-accent-yellow mt-0.5 flex-shrink-0" />
                    <p className="leading-relaxed text-ds-pastille-green">{benefit}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-sm text-ds-pastille-green">
                These results help you and your clinician make confident, evidence-based decisions
                about your care and daily activities.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What Happens During Test */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-light mb-4 text-ds-dark-blue">
              {happensTitle || 'What Happens During a Maintenance of Wakefulness Test?'}
            </h2>
            {happensIntroRichText && isLexicalEditorState(happensIntroRichText) ? (
              <RichText
                data={happensIntroRichText as unknown}
                className="text-ds-pastille-green text-lg max-w-2xl mx-auto"
              />
            ) : null}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(testSteps || []).map((step, index) => {
              const Icon = stepIconMap[index % stepIconMap.length]
              const title = (step as any)?.title as string | undefined
              const description = (step as any)?.description as string | undefined
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

          {happensDetailRichText && isLexicalEditorState(happensDetailRichText) ? (
            <p className="text-center text-ds-pastille-green">
              <RichText data={happensDetailRichText as unknown} className="max-w-3xl mx-auto" />
            </p>
          ) : null}
        </div>

        {/* Who Needs MWT */}
        <Card className="shadow-md hover:shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-ds-dark-blue">
              {whoTitle || 'Do I need a Maintenance of Wakefulness Test?'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {whoRichText && isLexicalEditorState(whoRichText) ? (
              <RichText
                data={whoRichText as unknown}
                className="text-ds-pastille-green leading-relaxed"
              />
            ) : null}
          </CardContent>
        </Card>

        {/* How IPD Performs Test */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-ds-dark-blue">
              {ipdTitle || 'How and where IPD performs the Maintenance of Wakefulness Test?'}
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
              alt={(ctaImage as any)?.alt || 'MWT'}
              width={800}
              height={400}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-black/60" />
          <Card className="relative bg-transparent border-0 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-balance text-white">
                {ctaTitle || 'Expert sleep testing with IPD'}
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
                Get objective answers about your daytime alertness
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
