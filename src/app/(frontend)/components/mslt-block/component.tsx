'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Clock, Moon, Activity } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { resolveLinkHref } from '@/lib/navigation'
import type { Page } from '@/payload-types'
import { isLexicalEditorState, RichText } from '@/app/(frontend)/components/ui/rich-text'
import { mediaToUrl } from '@/lib/media'

type MSLTBlockProps = Extract<NonNullable<Page['blocks']>[number], { blockType: 'msltBlock' }> & {
  className?: string
}

export function MSLTBlock(props: MSLTBlockProps) {
  const {
    className,
    heroTitle,
    heroSubtitle,
    whatIsTitle,
    whatIsRichText,
    involveTitle,
    involveIntroRichText,
    testSteps,
    involveDetailRichText,
    whyTitle,
    whyIntroRichText,
    conditions,
    whoTitle,
    symptoms,
    whoConclusionRichText,
    ipdTitle,
    ipdRichText,
    ctaTitle,
    ctaDescription,
    ctaPrimary,
    ctaSecondary,
    ctaImage,
  } = props

  const stepIconMap = [Moon, Activity, Clock, CheckCircle] as const

  const conditionItems = (conditions ?? [])
    .map((condition) => condition?.text ?? '')
    .filter(Boolean)

  const symptomItems = (symptoms ?? []).map((symptom) => symptom?.text ?? '').filter(Boolean)

  const resolveButtonHref = (button?: MSLTBlockProps['ctaPrimary']) =>
    resolveLinkHref({
      linkType: button?.linkType,
      internal: button?.internal,
      external: button?.external,
    })

  return (
    <section className={cn('w-full py-16 md:py-20 px-4', className)}>
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-light text-balance leading-tight text-ds-dark-blue">
            {heroTitle || 'Multiple Sleep Latency Test'}
            <span className="block mt-2 text-ds-accent-yellow">(MSLT)</span>
          </h1>
          {heroSubtitle ? (
            <p className="text-xl max-w-3xl mx-auto text-pretty leading-relaxed text-ds-pastille-green">
              {heroSubtitle}
            </p>
          ) : null}
        </div>

        {/* What is MSLT Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-ds-dark-blue">
              {whatIsTitle || 'What is the MSLT?'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {whatIsRichText && isLexicalEditorState(whatIsRichText) ? (
              <RichText
                data={whatIsRichText}
                className="text-ds-pastille-green text-lg leading-relaxed"
              />
            ) : null}
          </CardContent>
        </Card>

        {/* What Does MSLT Involve */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-light mb-4 text-ds-dark-blue">
              {involveTitle || 'What Does the MSLT Involve?'}
            </h2>
            {involveIntroRichText && isLexicalEditorState(involveIntroRichText) ? (
              <RichText
                data={involveIntroRichText}
                className="text-ds-pastille-green text-lg max-w-2xl mx-auto"
              />
            ) : null}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(testSteps ?? []).map((step, index) => {
              const Icon = stepIconMap[index % stepIconMap.length]
              const title = step?.title ?? ''
              const description = step?.description ?? ''
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

          <Card className="shadow-md hover:shadow-lg border-0">
            <CardContent className="pt-8">
              {involveDetailRichText && isLexicalEditorState(involveDetailRichText) ? (
                <RichText
                  data={involveDetailRichText}
                  className="text-ds-pastille-green leading-relaxed"
                />
              ) : null}
            </CardContent>
          </Card>
        </div>

        {/* Why is MSLT Important */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-light mb-4 text-ds-dark-blue">
              {whyTitle || 'Why Is the MSLT Important?'}
            </h2>
            {whyIntroRichText && isLexicalEditorState(whyIntroRichText) ? (
              <RichText
                data={whyIntroRichText}
                className="text-ds-pastille-green text-lg max-w-2xl mx-auto"
              />
            ) : null}
          </div>

          <Card className="shadow-md hover:shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-ds-dark-blue">
                Conditions Diagnosed with MSLT
              </CardTitle>
              <CardDescription className="text-ds-pastille-green">
                The MSLT is the gold standard for diagnosing these sleep disorders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {conditionItems.map((condition, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-ds-accent-yellow mt-0.5 flex-shrink-0" />
                    <p className="leading-relaxed text-ds-pastille-green">{condition}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-sm text-ds-pastille-green">
                It is often used when patients report unrefreshing sleep, sudden sleep attacks, or
                ongoing daytime fatigue that isn&apos;t explained by other conditions or overnight
                sleep studies alone.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Who Should Be Referred */}
        <Card className="shadow-md hover:shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-ds-dark-blue">
              {whoTitle || 'Who Should Be Referred for a MSLT?'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="leading-relaxed text-ds-pastille-green">
              You may be referred for an MSLT if you experience any of the following symptoms:
            </p>
            <div className="grid gap-4">
              {symptomItems.map((symptom, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-ds-accent-yellow mt-0.5 flex-shrink-0" />
                  <p className="leading-relaxed text-ds-pastille-green">{symptom}</p>
                </div>
              ))}
            </div>
            {whoConclusionRichText && isLexicalEditorState(whoConclusionRichText) ? (
              <RichText
                data={whoConclusionRichText}
                className="leading-relaxed text-ds-pastille-green font-medium"
              />
            ) : null}
          </CardContent>
        </Card>

        {/* IPD Advantage */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-ds-dark-blue">
              {ipdTitle || 'Where and How IPD Performs the MSLT'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ipdRichText && isLexicalEditorState(ipdRichText) ? (
              <RichText
                data={ipdRichText}
                className="text-ds-pastille-green text-lg leading-relaxed"
              />
            ) : null}
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="relative overflow-hidden rounded-lg">
          {ctaImage ? (
            <Image
              src={mediaToUrl(ctaImage) || '/placeholder.svg'}
              alt={(ctaImage as { alt?: string | null })?.alt || 'MSLT'}
              width={800}
              height={400}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-black/60" />
          <Card className="relative bg-transparent border-0 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-balance text-white">
                {ctaTitle || 'Expert Sleep Diagnostics from IPD'}
              </CardTitle>
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
              <p className="text-sm opacity-80 text-white">
                Need to arrange an MSLT or refer a patient? Contact IPD today to discuss your
                diagnostic needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
