'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Activity,
  CheckCircle,
  Clock,
  Heart,
  Home,
  Moon,
  Shield,
  Stethoscope,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { resolveLinkHref } from '@/lib/navigation'
import type { Page } from '@/payload-types'

type RPBlockProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'respiratoryPolygrophyBlock' }
> & {
  className?: string
}

export function RespiratoryPolygrophyBlock(props: RPBlockProps) {
  const {
    className,
    heroTitle,
    heroSubtitle,
    heroPrimary,
    heroSecondary,
    whatIsTitle,
    whatIsParagraph1,
    whatIsParagraph2,
    measuresTitle,
    testMeasures,
    whyTitle,
    whyParagraph1,
    whyParagraph2,
    whoTitle,
    whoIntro,
    symptoms,
    howTitle,
    howParagraph1,
    howParagraph2,
    benefits,
    ctaTitle,
    ctaParagraph1,
    ctaParagraph2,
    ctaPrimary,
    ctaSecondary,
  } = props as RPBlockProps

  const measures = Array.isArray(testMeasures) ? (testMeasures as any[]) : []
  const symptomItems = Array.isArray(symptoms) ? (symptoms as any[]) : []
  const benefitItems = Array.isArray(benefits) ? (benefits as any[]) : []

  return (
    <section className={cn('w-full py-16 md:py-20 px-4', className)}>
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Friendly Hero Section */}
        <div className="text-center space-y-8">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-ds-dark-blue text-white">
              <Home className="h-6 w-6" />
              <span className="font-semibold">Home-Based Sleep Testing</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-light text-balance leading-tight text-ds-dark-blue">
            {heroTitle || 'Respiratory Polygraphy'}
            <span className="block mt-2 text-3xl md:text-4xl text-ds-pastille-green">
              Sleep Apnoea Testing at Home
            </span>
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

        {/* What is RP - Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-light text-ds-dark-blue">
              {whatIsTitle || 'What Does Respiratory Polygraphy Involve?'}
            </h2>
            {whatIsParagraph1 ? (
              <p className="text-lg leading-relaxed text-ds-pastille-green">{whatIsParagraph1}</p>
            ) : null}
            {whatIsParagraph2 ? (
              <p className="leading-relaxed text-ds-pastille-green">{whatIsParagraph2}</p>
            ) : null}
          </div>

          <Card className="p-8 border-0 shadow-md">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 bg-ds-accent-yellow">
                <Moon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-ds-dark-blue">Sleep in Your Own Bed</h3>
              <p className="text-ds-pastille-green">
                Unlike laboratory studies, respiratory polygraphy allows you to sleep comfortably in
                your familiar home environment for more natural results.
              </p>
            </div>
          </Card>
        </div>

        {/* What Test Measures - Friendly Grid */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-light mb-4 text-ds-dark-blue">
              {measuresTitle || 'What We Monitor During Your Sleep'}
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-ds-pastille-green">
              The device records key breathing and heart signals throughout the night
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {measures.map((m, index) => {
              const iconName = String((m as any)?.icon || '').toLowerCase()
              const Icon =
                iconName === 'stethoscope'
                  ? Stethoscope
                  : iconName === 'heart'
                    ? Heart
                    : iconName === 'moon'
                      ? Moon
                      : iconName === 'home'
                        ? Home
                        : Activity
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-md transition-shadow p-6 border-0 shadow-sm"
                >
                  <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 bg-ds-accent-yellow text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2 text-ds-dark-blue">{(m as any)?.title}</h3>
                  <p className="text-sm text-ds-pastille-green">{(m as any)?.description}</p>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Why Use RP - Conversational Style */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 border-0 shadow-md">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-light text-ds-dark-blue">
                {whyTitle || 'Why Is Respiratory Polygraphy Used?'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {whyParagraph1 ? (
                <p className="text-lg leading-relaxed text-center text-ds-pastille-green">
                  {whyParagraph1}
                </p>
              ) : null}
              {whyParagraph2 ? (
                <p className="leading-relaxed text-center text-ds-pastille-green">
                  {whyParagraph2}
                </p>
              ) : null}
            </CardContent>
          </Card>
        </div>

        {/* Who Should Test - Symptom Checklist */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-light mb-4 text-ds-dark-blue">
              {whoTitle || 'Who Should Have a Respiratory Polygraphy Test?'}
            </h2>
            {whoIntro ? (
              <p className="text-lg max-w-3xl mx-auto text-ds-pastille-green">{whoIntro}</p>
            ) : null}
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {symptomItems.map((s, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg bg-white border border-gray-100"
              >
                <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-ds-accent-yellow" />
                <span className="text-ds-pastille-green">
                  {typeof s === 'string' ? s : (s as any)?.text}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg text-ds-pastille-green">
              Taking a respiratory polygraphy test helps to identify sleep-disordered breathing if
              you are displaying these symptoms and support the right diagnosis and treatment for
              you.
            </p>
          </div>
        </div>

        {/* How Test is Performed - Simple Steps */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Card className="p-8 border-0 shadow-md">
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 bg-ds-dark-blue">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-ds-dark-blue">
                  Professional Setup & Support
                </h3>
              </div>
              <p className="text-center leading-relaxed text-ds-pastille-green">
                A trained IPD physiologist will set up your respiratory polygraphy test, either by
                fitting the equipment in person or guiding you remotely.
              </p>
            </div>
          </Card>

          <div className="space-y-6">
            <h2 className="text-3xl font-light text-ds-dark-blue">
              {howTitle || 'How Is the Test Performed?'}
            </h2>

            <div className="space-y-4">
              {howParagraph1 ? (
                <p className="text-lg leading-relaxed text-ds-pastille-green">{howParagraph1}</p>
              ) : null}
              {howParagraph2 ? (
                <p className="leading-relaxed text-ds-pastille-green">{howParagraph2}</p>
              ) : null}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {benefitItems.map((b, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="text-ds-accent-yellow">
                    {index === 0 ? (
                      <Home className="h-5 w-5" />
                    ) : index === 1 ? (
                      <Clock className="h-5 w-5" />
                    ) : index === 2 ? (
                      <Shield className="h-5 w-5" />
                    ) : (
                      <Users className="h-5 w-5" />
                    )}
                  </div>
                  <span className="text-sm text-ds-pastille-green">
                    {typeof b === 'string' ? b : (b as any)?.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section - Warm & Inviting */}
        <div className="relative overflow-hidden rounded-2xl bg-ds-dark-blue">
          <div className="p-12 lg:p-16 text-center">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-3xl lg:text-4xl font-light text-white">
                {ctaTitle || 'Expert Sleep Assessment, Delivered to You'}
              </h2>

              {ctaParagraph1 ? (
                <p className="text-xl text-white/90 leading-relaxed">{ctaParagraph1}</p>
              ) : null}

              {ctaParagraph2 ? <p className="text-lg text-white/80">{ctaParagraph2}</p> : null}

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
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
                      className="inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold bg-ds-accent-yellow text-white hover:opacity-90"
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
                      className="inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold bg-transparent border border-white text-white hover:bg-white hover:text-black"
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
    </section>
  )
}
