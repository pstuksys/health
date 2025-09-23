'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, CheckCircle, Clock, Moon, Users } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { resolveLinkHref } from '@/lib/navigation'
import type { Page } from '@/payload-types'
import { isLexicalEditorState, RichText } from '@/app/(frontend)/components/ui/rich-text'
import { mediaToUrl } from '@/lib/media'

type CBTIBlockProps = Extract<NonNullable<Page['blocks']>[number], { blockType: 'cbtiBlock' }> & {
  className?: string
}

export function CBTIBlock(props: CBTIBlockProps) {
  const {
    className,
    heroTitle,
    heroSubtitle,
    techniques,
    programFeatures,
    whatIsTitle,
    whatIsRichText,
    programTitle,
    programIntroRichText,
    whyTitle,
    whyRichText,
    ctaTitle,
    ctaDescription,
    ctaPrimary,
    ctaSecondary,
    ctaImage,
  } = props as CBTIBlockProps

  const techniqueIconMap = [Brain, Moon, CheckCircle, Clock, Brain, Users] as const

  const features: string[] = Array.isArray(programFeatures)
    ? (programFeatures as unknown[])
        .map((f) => {
          if (typeof f === 'string') return f
          const text = (f as any)?.text
          return typeof text === 'string' ? text : ''
        })
        .filter(Boolean)
    : []

  return (
    <section className={cn('w-full py-16 md:py-20 px-4', className)}>
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-light text-balance leading-tight text-ds-dark-blue">
            {heroTitle || 'Cognitive Behavioural Therapy for Insomnia'}
            <span className="block mt-2 text-ds-accent-yellow">(CBTi)</span>
          </h1>
          {heroSubtitle ? (
            <p className="text-xl max-w-3xl mx-auto text-pretty leading-relaxed text-ds-pastille-green">
              {heroSubtitle}
            </p>
          ) : null}
        </div>

        {/* What is CBTi Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-ds-dark-blue">
              {whatIsTitle || 'What is CBTi?'}
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

        {/* Programme Overview */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-light mb-4 text-ds-dark-blue">
              {programTitle || 'Our CBTi Programme'}
            </h2>
            {programIntroRichText && isLexicalEditorState(programIntroRichText) ? (
              <RichText
                data={programIntroRichText as unknown}
                className="text-ds-pastille-green text-lg max-w-2xl mx-auto"
              />
            ) : null}
          </div>

          <Card className="shadow-md hover:shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-ds-dark-blue">
                {"What's Included in Our CBTi Programme?"}
              </CardTitle>
              <CardDescription className="text-ds-pastille-green">
                Our CBTi pathway combines expert-led therapy with practical strategies you can apply
                immediately
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-ds-accent-yellow mt-0.5 flex-shrink-0" />
                    <p className="leading-relaxed text-ds-pastille-green">{feature}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-sm text-ds-pastille-green">
                Together, these steps create a clear pathway from diagnosis to long-term recovery,
                with a focus on measurable improvements.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Techniques */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-light mb-4 text-ds-dark-blue">
              Core Techniques Used in CBTi
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-ds-pastille-green">
              Our programme incorporates evidence-based methods that retrain both your mind and body
              for better sleep
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(techniques || []).map((t, index) => {
              const Icon = techniqueIconMap[index % techniqueIconMap.length]
              const title = (t as any)?.title as string | undefined
              const description = (t as any)?.description as string | undefined
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

          <p className="text-center text-ds-pastille-green mt-2">
            Each technique is introduced and practised under clinician guidance, ensuring it is
            applied correctly and consistently.
          </p>
        </div>

        {/* Why CBTi Section */}
        <Card className="shadow-md hover:shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-ds-dark-blue">
              {whyTitle || 'Why Should I Do Cognitive Behavioural Therapy for Insomnia (CBTi)?'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {whyRichText && isLexicalEditorState(whyRichText) ? (
              <RichText
                data={whyRichText as unknown}
                className="text-ds-pastille-green leading-relaxed"
              />
            ) : null}
          </CardContent>
        </Card>

        {/* Call to Action - no gray background */}
        <div className="relative overflow-hidden rounded-lg">
          {ctaImage ? (
            <Image
              src={mediaToUrl(ctaImage as any) || '/placeholder.svg'}
              alt={(ctaImage as any)?.alt || 'CBTi'}
              width={800}
              height={400}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-black/60" />
          <Card className="relative bg-transparent border-0 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-balance text-white">{ctaTitle || ''}</CardTitle>
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
                Begin restoring the restful sleep your mind and body need
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
