import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export type CMSLinkProps = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  external?: boolean
  fullWidth?: boolean
}

export function CMSLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  external = false,
  fullWidth = false,
}: CMSLinkProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center font-semibold transition-all duration-200',
    'hover:scale-[1.03] hover:brightness-110 active:brightness-95',
    fullWidth && 'w-full'
  )

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-lg',
  }

  const variantClasses = {
    primary: 'bg-ds-accent-yellow text-ds-dark-blue border-0',
    secondary: 'bg-ds-pastille-green text-white border-0 hover:bg-ds-pastille-green/90',
    outline: 'bg-transparent border-2 border-ds-accent-yellow text-ds-accent-yellow hover:bg-ds-accent-yellow hover:text-ds-dark-blue',
  }

  const classes = cn(baseClasses, sizeClasses[size], variantClasses[variant], className)

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
