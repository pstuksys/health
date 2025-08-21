import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export type CMSLinkProps = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
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
    fullWidth && 'w-full',
  )

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-lg',
  }

  const variantClasses = {
    primary:
      'bg-ds-accent-yellow text-white border-0 transition-all duration-200 hover:scale-[1.03] hover:brightness-110 active:brightness-95',
    secondary: 'bg-ds-pastille-green text-white border-0 hover:bg-ds-pastille-green/90',
    outline:
      'bg-transparent border-2 border-ds-accent-yellow text-ds-accent-yellow hover:bg-ds-accent-yellow hover:text-ds-dark-blue',
    ghost:
      'relative bg-transparent p-0 border-0 rounded-none text-inherit hover:bg-transparent after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 hover:after:w-full after:bg-current after:transition-all after:duration-300',
  }

  const classes = cn(
    baseClasses,
    variant === 'ghost' ? 'px-0 py-0' : sizeClasses[size],
    variantClasses[variant],
    className,
  )

  if (external) {
    return (
      <Link href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}
