import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export type CMSLinkProps = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  external?: boolean
}

export function CMSLink({
  href,
  children,
  variant = 'primary',
  className,
  external = false,
}: CMSLinkProps) {
  const baseClasses =
    'inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105'

  const variantClasses = {
    primary:
      'bg-ds-accent-yellow hover:bg-ds-accent-yellow/90 text-ds-dark-blue hover:text-ds-dark-blue border-0',
    secondary: 'border border-ds-pastille-green text-ds-pastille-green hover:text-efefee',
  }

  const classes = cn(baseClasses, variantClasses[variant], className)

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}
