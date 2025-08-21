'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

type CTAButton = { label: string; href: string }

type BannerProps = {
  text: string
  backgroundColor?: string
  ctaButton?: CTAButton
  dismissible?: boolean
  className?: string
}

export function Banner({
  text,
  backgroundColor = 'bg-ds-dark-blue',
  ctaButton,
  dismissible = false,
  className,
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  if (!isVisible) return null
  return (
    <div className={cn('w-full py-3 px-4 text-center relative', backgroundColor, className)}>
      <div className="max-w-container mx-auto flex items-center justify-center gap-4">
        <p className="text-white text-sm font-light flex-1">{text}</p>
        {ctaButton && (
          <Button
            asChild
            size="sm"
            className="bg-ds-accent-yellow hover:bg-ds-accent-yellow/90 text-ds-dark-blue font-semibold"
          >
            <Link href={ctaButton.href}>{ctaButton.label}</Link>
          </Button>
        )}
        {dismissible && (
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-gray-200 p-1"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
