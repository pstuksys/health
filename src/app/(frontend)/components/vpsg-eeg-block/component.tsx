'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Brain, CheckCircle, Clock, Shield, Users, Video, Zap } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { resolveLinkHref } from '@/lib/navigation'
import type { Page } from '@/payload-types'
import { isLexicalEditorState, RichText } from '@/app/(frontend)/components/ui/rich-text'
import { mediaToUrl } from '@/lib/media'

type VPSGEEGBlockProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'vpsgEegBlock' }
> & {
  className?: string
}

export function VPSGEEGBlock(props: VPSGEEGBlockProps) {
  const {
    className,
    heroTitle,
    heroSubtitle,
    heroPrimary,
    heroSecondary,
    importanceTitle,
    importanceRichText,
    whenTitle,
    whenIntroRichText,
    whenReasons,
    measuresTitle,
    measuresIntroRichText,
    measures,
    measuresFootnoteRichText,
    howTitle,
    howSteps,
    reportingTitle,
    reportingText,
    whyChooseTitle,
    whyChoose,
    ctaBgImage,
    ctaRightTopRichText,
    ctaRightBottomRichText,
    ctaPrimary,
    ctaSecondary,
  } = props as VPSGEEGBlockProps

  const measureIconMap = [Brain, Video, Activity] as const

  const reasons: string[] = Array.isArray(whenReasons)
    ? (whenReasons as unknown[])
        .map((r) => (typeof r === 'string' ? r : (r as any)?.text || ''))
        .filter(Boolean)
    : []

  const measureItems: Array<{ category: string; description: string }> = Array.isArray(measures)
    ? (measures as unknown[]).map((m) => ({
        category: (m as any)?.category || '',
        description: (m as any)?.description || '',
      }))
    : []

  const howItems: Array<{ title: string; description: string }> = Array.isArray(howSteps)
    ? (howSteps as unknown[]).map((s) => ({
        title: (s as any)?.title || '',
        description: (s as any)?.description || '',
      }))
    : []

  const whyItems: string[] = Array.isArray(whyChoose)
    ? (whyChoose as unknown[])
        .map((w) => (typeof w === 'string' ? w : (w as any)?.text || ''))
        .filter(Boolean)
    : []

  return (
    <section className={cn('w-full py-16 md:py-20 px-4', className)}>
      <div className="max-w-7xl mx-auto space-y-16 bg-white/0">
        {/* Technical Header with Process Flow */}
        <div className="text-center space-y-6">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-ds-dark-blue bg-white">
              <Brain className="h-5 w-5 text-ds-dark-blue" />
              <span className="text-sm font-semibold text-ds-dark-blue">EEG</span>
            </div>
            <div className="w-8 h-0.5 bg-ds-pastille-green" />
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-ds-pastille-green bg-white">
              <Video className="h-5 w-5 text-ds-pastille-green" />
              <span className="text-sm font-semibold text-ds-pastille-green">vPSG</span>
            </div>
            <div className="w-8 h-0.5 bg-ds-accent-yellow" />
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-ds-accent-yellow bg-white">
              <Zap className="h-5 w-5 text-ds-accent-yellow" />
              <span className="text-sm font-semibold text-ds-accent-yellow">COMBINED</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-light text-balance leading-tight text-ds-dark-blue">
            {heroTitle || 'Combined Video Polysomnography'}
            <span className="block mt-2">PSG with Full EEG</span>
          </h1>

          {heroSubtitle ? (
            <p className="text-xl leading-relaxed text-pretty max-w-4xl mx-auto text-ds-pastille-green">
              {heroSubtitle}
            </p>
          ) : null}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {(() => {
              const btn = heroPrimary as any
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
              const btn = heroSecondary as any
              const href = resolveLinkHref({
                linkType: btn?.linkType,
                internal: btn?.internal,
                external: btn?.external,
              })
              return btn?.label ? (
                <a
                  href={href || '#'}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold border border-ds-dark-blue text-ds-dark-blue hover:bg-ds-dark-blue hover:text-white"
                >
                  {btn.label}
                </a>
              ) : null
            })()}
          </div>
        </div>

        {/* Importance Section - Centered Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-light text-ds-dark-blue">
                {importanceTitle || 'Importance of Combined vPSG with Full EEG'}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              {importanceRichText && isLexicalEditorState(importanceRichText) ? (
                <RichText
                  data={importanceRichText as unknown}
                  className="text-ds-pastille-green text-lg leading-relaxed"
                />
              ) : null}
            </CardContent>
          </Card>
        </div>

        {/* When to Test - Timeline Style */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-light mb-4 text-ds-dark-blue">
              {whenTitle || 'When Should I Take This Test?'}
            </h2>
            {whenIntroRichText && isLexicalEditorState(whenIntroRichText) ? (
              <RichText
                data={whenIntroRichText as unknown}
                className="text-ds-pastille-green text-lg max-w-3xl mx-auto"
              />
            ) : null}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((reason, index) => (
              <div key={index} className="relative">
                <Card className="h-full hover:shadow-md transition-shadow border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 bg-ds-accent-yellow">
                        {index + 1}
                      </div>
                      <p className="leading-relaxed text-ds-pastille-green">{reason}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* What Test Measures - Technical Grid */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-light mb-4 text-ds-dark-blue">
              {measuresTitle || 'What the Test Measures'}
            </h2>
            {measuresIntroRichText && isLexicalEditorState(measuresIntroRichText) ? (
              <RichText
                data={measuresIntroRichText as unknown}
                className="text-ds-pastille-green text-lg max-w-3xl mx-auto"
              />
            ) : null}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {measureItems.map((measure, index) => {
              const Icon = measureIconMap[index % measureIconMap.length]
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md"
                >
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 bg-ds-accent-yellow/10">
                      <Icon className="h-8 w-8 text-ds-accent-yellow" />
                    </div>
                    <CardTitle className="text-xl text-ds-dark-blue">{measure.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-ds-pastille-green">{measure.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {measuresFootnoteRichText && isLexicalEditorState(measuresFootnoteRichText) ? (
            <div className="text-center max-w-4xl mx-auto">
              <RichText
                data={measuresFootnoteRichText as unknown}
                className="text-ds-pastille-green text-lg leading-relaxed"
              />
            </div>
          ) : null}
        </div>

        {/* How Test is Performed - Process Steps */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-light text-ds-dark-blue">
              {howTitle || 'How the Test Is Performed'}
            </h2>

            <div className="space-y-4">
              {howItems.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm',
                      idx === 0
                        ? 'bg-ds-dark-blue'
                        : idx === 1
                          ? 'bg-ds-pastille-green'
                          : 'bg-ds-accent-yellow',
                    )}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1 text-ds-dark-blue">{step.title}</h4>
                    <p className="leading-relaxed text-ds-pastille-green">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="p-8 border-0 shadow-md">
            <div className="text-center space-y-4">
              <Clock className="h-12 w-12 mx-auto text-ds-accent-yellow" />
              <h3 className="text-xl font-semibold text-ds-dark-blue">
                {reportingTitle || 'Comprehensive Reporting'}
              </h3>
              <p className="text-ds-pastille-green">
                {reportingText ||
                  'Detailed, synchronised report covering EEG analysis, video observations, respiratory parameters, and clear diagnostic conclusions.'}
              </p>
            </div>
          </Card>
        </div>

        {/* Why Choose IPD & CTA - Background Image */}
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src={
              mediaToUrl(ctaBgImage as any) ||
              '/professional-medical-testing-room-with-comfortable.jpg'
            }
            alt="Advanced neurophysiology testing facility"
            width={1200}
            height={600}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
          <div className="relative p-12 lg:p-16">
            <div className="max-w-5xl">
              <h2 className="text-3xl lg:text-4xl font-light mb-8 text-white">
                {whyChooseTitle || 'Why Choose IPD for Combined vPSG with Full EEG?'}
              </h2>

              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  {whyItems.map((text, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="text-white/90 mt-1">
                        {index === 0 ? (
                          <Shield className="h-5 w-5" />
                        ) : index === 1 ? (
                          <Users className="h-5 w-5" />
                        ) : index === 2 ? (
                          <Activity className="h-5 w-5" />
                        ) : (
                          <CheckCircle className="h-5 w-5" />
                        )}
                      </div>
                      <p className="text-white/90 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {ctaRightTopRichText && isLexicalEditorState(ctaRightTopRichText) ? (
                    <RichText
                      data={ctaRightTopRichText as unknown}
                      className="text-lg text-white/90 leading-relaxed"
                    />
                  ) : null}
                  {ctaRightBottomRichText && isLexicalEditorState(ctaRightBottomRichText) ? (
                    <RichText
                      data={ctaRightBottomRichText as unknown}
                      className="text-white/80 mb-6"
                    />
                  ) : null}

                  <div className="space-y-3">
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
                          className="w-full block text-center font-semibold px-6 py-3 rounded-md text-white bg-ds-accent-yellow hover:opacity-90"
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
                          className="w-full block text-center font-semibold px-6 py-3 rounded-md border border-white text-white hover:bg-white hover:text-black"
                        >
                          {btn.label}
                        </a>
                      ) : null
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
