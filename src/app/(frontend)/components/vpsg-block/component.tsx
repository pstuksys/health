'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Eye, Heart, Monitor, Stethoscope, Video, Waves, Brain } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { resolveLinkHref } from '@/lib/navigation'
import type { Page } from '@/payload-types'
import { isLexicalEditorState, RichText } from '@/app/(frontend)/components/ui/rich-text'
import { mediaToUrl } from '@/lib/media'

type VPSGBlockProps = Extract<NonNullable<Page['blocks']>[number], { blockType: 'vpsgBlock' }> & {
  className?: string
}

export function VPSGBlock(props: VPSGBlockProps) {
  const {
    className,
    heroTitle,
    heroSubtitle,
    heroPrimary,
    heroSecondary,
    whatIsTitle,
    whatIsRichText,
    monitoringAspects,
    whyTitle,
    whyIntroRichText,
    whyCards,
    conditionsTitle,
    conditions,
    ctaBgImage,
    ctaTitle,
    ctaLeftRichText,
    ctaPrimary,
    ctaSecondary,
  } = props as VPSGBlockProps

  const aspectIcons = [Brain, Eye, Activity, Heart, Waves, Stethoscope, Monitor, Video] as const

  const aspectItems: string[] = Array.isArray(monitoringAspects)
    ? (monitoringAspects as unknown[]).map((a) =>
        typeof a === 'string' ? a : (a as any)?.label || '',
      )
    : []

  const conditionItems: string[] = Array.isArray(conditions)
    ? (conditions as unknown[]).map((c) => (typeof c === 'string' ? c : (c as any)?.text || ''))
    : []

  const whyCardItems: Array<{ title: string; text: string; icon: keyof typeof iconMap }> =
    Array.isArray(whyCards)
      ? (whyCards as unknown[]).map((c, i) => ({
          title: (c as any)?.title || '',
          text: (c as any)?.text || '',
          icon: (['activity', 'video', 'brain'] as const)[i % 3],
        }))
      : []

  const iconMap = {
    activity: Activity,
    video: Video,
    brain: Brain,
  }

  return (
    <section className={cn('w-full py-16 md:py-20 px-4', className)}>
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero Section - Asymmetrical Layout */}
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3 space-y-6">
            <h1 className="text-4xl md:text-6xl font-light text-balance leading-tight text-ds-dark-blue">
              {heroTitle || 'Video Polysomnography'}
              <span className="text-ds-accent-yellow block mt-2">(vPSG)</span>
            </h1>
            {heroSubtitle ? (
              <p className="text-xl leading-relaxed text-pretty text-ds-pastille-green">
                {heroSubtitle}
              </p>
            ) : null}
            <div className="flex flex-col sm:flex-row gap-4">
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
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-ds-accent-yellow/20 to-transparent rounded-2xl rotate-3" />
              <Card className="relative -rotate-1 hover:rotate-0 transition-transform duration-300 shadow-md border-0">
                <CardContent className="p-8 text-center">
                  <Monitor className="h-16 w-16 mx-auto mb-4 text-ds-accent-yellow" />
                  <h3 className="text-xl font-semibold mb-2 text-ds-dark-blue">
                    Comprehensive Monitoring
                  </h3>
                  <p className="text-ds-pastille-green">
                    8+ physiological signals recorded simultaneously with HD video
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* What is vPSG - Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-light mb-6 text-ds-dark-blue">
              {whatIsTitle || 'What Is Video Polysomnography?'}
            </h2>
            {whatIsRichText && isLexicalEditorState(whatIsRichText) ? (
              <RichText
                data={whatIsRichText as unknown}
                className="text-ds-pastille-green text-lg leading-relaxed space-y-4"
              />
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {aspectItems.map((label, index) => {
              const Icon = aspectIcons[index % aspectIcons.length]
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg border hover:shadow-md transition-shadow"
                >
                  <div className="text-ds-accent-yellow flex-shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-ds-pastille-green">{label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Why Gold Standard - Feature Cards */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-light mb-4 text-ds-dark-blue">
              {whyTitle || 'Why Is It the Gold Standard?'}
            </h2>
            {whyIntroRichText && isLexicalEditorState(whyIntroRichText) ? (
              <RichText
                data={whyIntroRichText as unknown}
                className="text-ds-pastille-green text-lg"
              />
            ) : null}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyCardItems.map((c, i) => {
              const Icon = iconMap[c.icon] || Activity
              return (
                <Card
                  key={i}
                  className="text-center hover:shadow-lg transition-shadow border-0 shadow-md"
                >
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto bg-ds-accent-yellow/10 rounded-full flex items-center justify-center mb-4">
                      <Icon className="h-8 w-8 text-ds-accent-yellow" />
                    </div>
                    <CardTitle className="text-ds-dark-blue">{c.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-ds-pastille-green">{c.text}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* When Recommended - List Layout */}
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-light mb-6 text-ds-dark-blue">
              {conditionsTitle || 'When Is vPSG Recommended?'}
            </h2>
            <p className="text-lg leading-relaxed text-ds-pastille-green">
              Recommended when other sleep tests are inconclusive or when detailed, multi-system
              assessment is essential.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-3">
              {conditionItems.map((condition, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-ds-light-neutral/40"
                >
                  <div className="w-2 h-2 bg-ds-accent-yellow rounded-full mt-2 flex-shrink-0" />
                  <p className="text-ds-pastille-green">{condition}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Where Performed & CTA - Background Image */}
        <div className="relative overflow-hidden rounded-2xl">
          {ctaBgImage ? (
            <Image
              src={mediaToUrl(ctaBgImage as any) || '/placeholder.svg'}
              alt={(ctaBgImage as any)?.alt || 'vPSG'}
              width={1200}
              height={600}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          <div className="relative p-12 lg:p-16">
            <div className="max-w-4xl">
              <h2 className="text-3xl lg:text-4xl font-light mb-6 text-white">
                {ctaTitle || 'Expert Care in Clinical Settings or Your Home'}
              </h2>
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div>
                  {ctaLeftRichText && isLexicalEditorState(ctaLeftRichText) ? (
                    <RichText
                      data={ctaLeftRichText as unknown}
                      className="text-lg text-white/90 leading-relaxed mb-4"
                    />
                  ) : null}
                </div>
                <div className="space-y-4">
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
                        className="block w-full px-6 py-3 rounded-md font-semibold text-white bg-ds-accent-yellow hover:opacity-90 text-center"
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
                        className="block w-full px-6 py-3 rounded-md font-semibold border border-white text-white hover:bg-white hover:text-black text-center"
                      >
                        {btn.label}
                      </a>
                    ) : null
                  })()}
                  <p className="text-sm text-white/70 text-center">
                    Discuss whether video polysomnography is the right next step
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
