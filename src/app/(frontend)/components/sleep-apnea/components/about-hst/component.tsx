'use client'

import { useState, useCallback, memo } from 'react'
import { cn } from '@/lib/utils'
import type { Page } from '@/payload-types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Loader2, AlertCircle } from 'lucide-react'

type ProcessStep = {
  number?: string | null
  text?: string | null
}

type AboutHSTBlock = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'sleepApneaAboutHST' }
>

const BOOKING_URL =
  'https://online-booking.semble.io/?token=f4f229c013b1b2e8ebc306746283cddc4a89a687'

export const SleepApneaAboutHST = memo(function SleepApneaAboutHST({
  className,
  title,
  subtitle,
  steps,
}: AboutHSTBlock & { className?: string }) {
  const processSteps: ProcessStep[] = steps || []
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isIframeLoading, setIsIframeLoading] = useState(true)
  const [hasIframeError, setHasIframeError] = useState(false)

  // Memoized handlers for better performance
  const handleBookingOpenChange = useCallback((open: boolean) => {
    setIsBookingOpen(open)
    if (open) {
      setIsIframeLoading(true)
      setHasIframeError(false)
    }
  }, [])

  const handleIframeLoad = useCallback(() => {
    setIsIframeLoading(false)
    setHasIframeError(false)
  }, [])

  const handleIframeError = useCallback(() => {
    setIsIframeLoading(false)
    setHasIframeError(true)
  }, [])

  return (
    <section className={cn('py-16', className)}>
      <div className="max-w-container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-light text-ds-dark-blue mb-6 text-balance">
            {title}
          </h1>
          <p className="text-lg text-ds-pastille-green max-w-3xl mx-auto text-pretty">{subtitle}</p>
        </div>

        {/* Process Steps - Centered with Max Width */}
        <div className="max-w-4xl mx-auto space-y-8">
          {processSteps.map((step, index) => (
            <div key={`step-${step.number || index}-${index}`} className="flex items-start gap-6">
              <div
                className="bg-ds-dark-blue text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0"
                aria-label={`Step ${step.number || index + 1}`}
              >
                {step.number || index + 1}
              </div>
              <p className="text-ds-dark-blue leading-relaxed">{step.text || ''}</p>
            </div>
          ))}
        </div>

        {/* Booking Button */}
        <div className="flex justify-center mt-16">
          <Dialog open={isBookingOpen} onOpenChange={handleBookingOpenChange}>
            <DialogTrigger asChild>
              <Button
                variant="primary"
                size="lg"
                className="bg-ds-accent-yellow hover:bg-ds-accent-yellow/90 text-white px-8 py-4 text-lg font-medium transition-all duration-200 hover:scale-105"
                aria-label="Open booking system to schedule your appointment"
              >
                Book Your Appointment
              </Button>
            </DialogTrigger>
            <DialogContent
              className="max-w-4xl max-h-[90vh] overflow-hidden"
              onPointerDownOutside={(e) => e.preventDefault()}
              aria-describedby="booking-description"
            >
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-ds-dark-blue">
                  Book Your Appointment
                </DialogTitle>
                <p id="booking-description" className="text-sm text-gray-600 mt-2">
                  Complete your booking using our secure booking system
                </p>
              </DialogHeader>
              <div className="mt-4 relative">
                {/* Loading State */}
                {isIframeLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-md z-10">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin text-ds-accent-yellow mx-auto mb-2" />
                      <p className="text-gray-600">Loading booking system...</p>
                    </div>
                  </div>
                )}

                {/* Error State */}
                {hasIframeError && (
                  <div className="flex items-center justify-center h-[600px] bg-gray-50 rounded-md">
                    <div className="text-center">
                      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Unable to Load Booking System
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Please try again later or contact us directly.
                      </p>
                      <Button
                        onClick={() => {
                          setIsIframeLoading(true)
                          setHasIframeError(false)
                        }}
                        variant="outline"
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                )}

                {/* Iframe */}
                {!hasIframeError && (
                  <iframe
                    src={BOOKING_URL}
                    width="100%"
                    height="600"
                    frameBorder="0"
                    scrolling="auto"
                    allow="payment *"
                    className="rounded-md"
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                    title="Appointment Booking System"
                    aria-label="Secure booking system for scheduling appointments"
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
})
