'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { ArrowLeft, ChevronRight, Loader2, X } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/app/(frontend)/components/ui/dialog'
import { iconMap, type IconKey } from '@/lib/icons/icon-map'
import { BOOKING_MODAL_HASH } from '@/lib/booking-modal'
import { cn } from '@/lib/utils'

type BookingOption = {
  icon: IconKey
  title: string
  description?: string
  href: string
  embed: boolean
}

export type BookingModalProps = {
  title: string
  description?: string
  options: BookingOption[]
  help?: { label: string; text?: string; href: string }
}

const iconCircle =
  'flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-ds-pastille-green/10 sm:h-20 sm:w-20'
const optionCard =
  'group flex w-full items-center gap-4 rounded-xl border border-ds-light-neutral bg-white p-4 text-left shadow-md transition-shadow hover:shadow-lg sm:gap-6 sm:p-6'

export function BookingModal({ title, description, options, help }: BookingModalProps) {
  const [open, setOpen] = useState(false)
  const [embedded, setEmbedded] = useState<BookingOption | null>(null)
  const [isIframeLoading, setIsIframeLoading] = useState(true)
  const HeaderIcon = iconMap.Video
  const HelpIcon = iconMap.CircleHelp

  useEffect(() => {
    // Capture phase so the click is handled before Next's <Link> navigates
    function handleClick(event: MouseEvent) {
      const anchor = event.target instanceof Element ? event.target.closest('a') : null
      if (!anchor || anchor.hash !== BOOKING_MODAL_HASH) return
      event.preventDefault()
      setOpen(true)
    }

    window.addEventListener('click', handleClick, true)
    return () => window.removeEventListener('click', handleClick, true)
  }, [])

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) setEmbedded(null)
  }

  function showEmbedded(option: BookingOption) {
    setIsIframeLoading(true)
    setEmbedded(option)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-ds-dark-blue/60 backdrop-blur-sm" />
        <DialogPrimitive.Content
          // A stray click outside shouldn't throw away a half-completed booking
          onPointerDownOutside={(event) => embedded && event.preventDefault()}
          className={cn(
            'fixed left-1/2 top-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:p-10',
            embedded ? 'max-w-4xl' : 'max-w-2xl',
          )}
        >
          <DialogClose className="absolute right-4 top-4 rounded-full p-2 text-ds-dark-blue transition-colors hover:bg-ds-light-neutral focus:outline-none focus-visible:ring-2 focus-visible:ring-ds-dark-blue sm:right-6 sm:top-6">
            <X className="h-6 w-6" aria-hidden />
            <span className="sr-only">Close</span>
          </DialogClose>

          {embedded ? (
            <>
              <div className="flex items-center gap-3 pr-10">
                <button
                  type="button"
                  onClick={() => setEmbedded(null)}
                  className="rounded-full p-2 text-ds-dark-blue transition-colors hover:bg-ds-light-neutral focus:outline-none focus-visible:ring-2 focus-visible:ring-ds-dark-blue"
                >
                  <ArrowLeft className="h-6 w-6" aria-hidden />
                  <span className="sr-only">Back to booking options</span>
                </button>
                <div>
                  <DialogTitle className="text-2xl font-light text-ds-dark-blue">{title}</DialogTitle>
                  <DialogDescription className="font-light text-ds-pastille-green">
                    {embedded.title}
                  </DialogDescription>
                </div>
              </div>

              <div className="relative mt-6">
                {isIframeLoading && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-ds-light-neutral">
                    <div className="text-center">
                      <Loader2 className="mx-auto mb-2 h-8 w-8 animate-spin text-ds-accent-yellow" />
                      <p className="font-light text-ds-dark-blue">Loading booking system...</p>
                    </div>
                  </div>
                )}
                <iframe
                  src={embedded.href}
                  title="Appointment booking system"
                  allow="payment *"
                  onLoad={() => setIsIframeLoading(false)}
                  className="h-[600px] max-h-[calc(100dvh-12rem)] w-full rounded-xl border-0"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-4 pr-10 sm:gap-6">
                <div className={iconCircle}>
                  <HeaderIcon
                    className="h-7 w-7 text-ds-pastille-green sm:h-9 sm:w-9"
                    aria-hidden
                  />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-light text-ds-dark-blue sm:text-3xl">
                    {title}
                  </DialogTitle>
                  {description ? (
                    <DialogDescription className="mt-1 font-light text-ds-pastille-green">
                      {description}
                    </DialogDescription>
                  ) : null}
                </div>
              </div>

              {options.length > 0 && (
                <ul className="mt-8 space-y-4">
                  {options.map((option) => {
                    const Icon = iconMap[option.icon]
                    const content = (
                      <>
                        <div className={iconCircle}>
                          <Icon
                            className="h-7 w-7 text-ds-pastille-green sm:h-9 sm:w-9"
                            aria-hidden
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-lg font-normal text-ds-dark-blue sm:text-xl">
                            {option.title}
                          </p>
                          {option.description ? (
                            <p className="mt-1 text-sm font-light leading-relaxed text-ds-pastille-green sm:text-base">
                              {option.description}
                            </p>
                          ) : null}
                        </div>
                        <ChevronRight
                          className="h-6 w-6 flex-shrink-0 text-ds-dark-blue transition-transform group-hover:translate-x-1"
                          aria-hidden
                        />
                      </>
                    )
                    return (
                      <li key={option.title}>
                        {option.embed ? (
                          <button
                            type="button"
                            onClick={() => showEmbedded(option)}
                            className={optionCard}
                          >
                            {content}
                          </button>
                        ) : (
                          <Link
                            href={option.href}
                            onClick={() => setOpen(false)}
                            className={optionCard}
                          >
                            {content}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              )}

              {help?.label ? (
                <div className="mt-8 flex items-center justify-center gap-3 border-t border-ds-light-neutral pt-6">
                  <HelpIcon className="h-7 w-7 flex-shrink-0 text-ds-pastille-green" aria-hidden />
                  <div>
                    <Link
                      href={help.href}
                      onClick={() => setOpen(false)}
                      className="text-ds-dark-blue underline underline-offset-4 hover:text-ds-accent-yellow"
                    >
                      {help.label}
                    </Link>
                    {help.text ? (
                      <p className="text-sm font-light text-ds-pastille-green">{help.text}</p>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
