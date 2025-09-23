'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import type { Page } from '@/payload-types'

type CPAPBlockProps = Extract<NonNullable<Page['blocks']>[number], { blockType: 'cpapBlock' }>

function CPAPServiceCard({
  title,
  description,
  badge,
  features,
  borderColor,
  className,
}: {
  title: string
  description: string
  badge?: { text: string; variant: 'default' | 'secondary' | 'outline' }
  features: Array<{ icon: React.ComponentType<{ className?: string }>; text: string }>
  borderColor: string
  className?: string
}) {
  return (
    <Card
      className={cn(
        'relative border-2 bg-card hover:shadow-lg transition-shadow',
        borderColor,
        className,
      )}
    >
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-light text-ds-dark-blue pt-6">{title}</CardTitle>
        <CardDescription className="text-ds-pastille-green/80 font-light">
          {description}
        </CardDescription>
        {badge && (
          <Badge
            variant={badge.variant}
            className="w-fit mx-auto mt-2 bg-ds-accent-yellow text-white border-0 hover:bg-ds-accent-yellow/90"
          >
            {badge.text}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {features.map((feature, index) => {
            return (
              <div key={index} className="flex items-center gap-3">
                <div className="border-ds-accent-yellow border-2 p-2 rounded-full flex-shrink-0 mt-0.5">
                  <svg
                    className="h-4 w-4 text-ds-accent-yellow"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm text-ds-pastille-green leading-relaxed font-light">
                  {feature.text}
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export function CPAPBlock({ title, subtitle, className }: CPAPBlockProps & { className?: string }) {
  // Hardcoded configuration with defaults
  const subscriptionFeatures = [
    { icon: Check, text: 'Machine from leading CPAP manufacturer' },
    { icon: Check, text: 'Next working day delivery' },
    {
      icon: Check,
      text: 'Set up remotely, in-person, or in our clinic with Clinical Sleep Physiologist',
    },
    { icon: Check, text: 'Remote follow ups' },
    {
      icon: Check,
      text: 'Access to online CPAP data via remote therapy monitoring portal',
    },
    { icon: Check, text: 'CPAP machine filters, a tube and a humidifier are all included' },
    { icon: Check, text: 'Replacement of machine if it breaks down' },
    { icon: Check, text: 'Annual mask replacement' },
    {
      icon: Check,
      text: 'Annual report to your referring physician on your treatment progress',
    },
  ]

  const purchaseFeatures = [
    { icon: Check, text: 'Machine from leading CPAP manufacturer' },
    { icon: Check, text: 'Next working day delivery' },
    {
      icon: Check,
      text: 'Set up remotely, in-person, or in our clinic with Clinical Sleep Physiologist',
    },
    { icon: Check, text: 'Remote follow ups' },
    {
      icon: Check,
      text: 'Access to online CPAP data via remote therapy monitoring portal',
    },
    { icon: Check, text: 'CPAP machine filters, a tube and a humidifier are all included' },
    { icon: Check, text: 'Replacement mask in your first month' },
  ]

  const trustIndicators = [
    {
      icon: Check,
      text: 'Set up virtually, in our London clinic or in your home by a qualified Clinical Sleep Physiologist',
    },
    {
      icon: Check,
      text: 'Expert Led Clinician Consultations',
    },
    {
      icon: Check,
      text: 'Premium CPAP Devices from Trusted Brand',
    },
    {
      icon: Check,
      text: 'Stress-free supply of Equipment and Consumables',
    },
    {
      icon: Check,
      text: 'Personalised Therapy Support for Successful Outcomes',
    },
    {
      icon: Check,
      text: 'Ongoing Remote Monitoring and Adjustment',
    },
    {
      icon: Check,
      text: 'Help to start your therapy with the right CPAP mask',
    },
    {
      icon: Check,
      text: 'Try your CPAP treatment',
    },
    {
      icon: Check,
      text: 'Option to purchase your machine or enter subscription service',
    },
  ]

  return (
    <>
      <section className={cn('w-full py-8 md:py-16 px-4', className)}>
        <div className="max-w-container mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-ds-dark-blue mb-4 text-balance">
              {title || 'Choose Your CPAP Therapy Option'}
            </h1>
            <p className="text-xl text-ds-pastille-green/80 max-w-2xl mx-auto text-pretty font-light">
              {subtitle ||
                'Professional sleep therapy solutions with comprehensive support from certified Clinical Sleep Physiologists'}
            </p>
          </div>

          {/* Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            <CPAPServiceCard
              title="PAP Subscription Service"
              description="Comprehensive ongoing support with all-inclusive monthly service"
              badge={{ text: 'Most Popular', variant: 'secondary' }}
              features={subscriptionFeatures}
              borderColor="border-ds-dark-blue/20"
            />
            <CPAPServiceCard
              title="CPAP Purchase Service"
              description="One-time purchase with essential setup and initial support"
              badge={{ text: 'One-Time Payment', variant: 'outline' }}
              features={purchaseFeatures}
              borderColor="border-ds-pastille-green/20"
            />
          </div>
        </div>
      </section>

      {/* Trust Indicators - Full Width Background Section */}
      <section className="bg-ds-light-neutral/50 py-16">
        <div className="max-w-container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-light text-ds-dark-blue mb-4">IPD Offering</h3>
            <p className="text-lg text-ds-pastille-green/80 max-w-3xl mx-auto font-light">
              Comprehensive CPAP therapy support designed around your needs and lifestyle
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {trustIndicators.map((indicator, index) => {
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-ds-accent-yellow/20 p-2 rounded-full flex-shrink-0 mt-1">
                    <svg
                      className="h-4 w-4 text-ds-accent-yellow"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-ds-dark-blue leading-relaxed font-light">
                    {indicator.text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
