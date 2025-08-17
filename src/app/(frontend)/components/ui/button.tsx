import * as React from 'react'
import { cn } from '@/lib/utils'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  size?: 'sm' | 'md' | 'lg' | 'icon'
  variant?: 'default' | 'outline'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild, size = 'md', variant = 'default', ...props }, ref) => {
    const sizeClasses =
      size === 'lg'
        ? 'px-4 py-3 text-base'
        : size === 'sm'
          ? 'px-2 py-1 text-sm'
          : size === 'icon'
            ? 'h-9 w-9'
            : 'px-3 py-2'
    const variantClasses =
      variant === 'outline'
        ? 'border border-border bg-transparent hover:bg-muted'
        : 'bg-primary text-primary-foreground hover:bg-primary/90'
    const Comp = asChild ? ('span' as any) : 'button'
    return (
      <Comp
        ref={ref}
        className={cn('inline-flex items-center rounded', sizeClasses, variantClasses, className)}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'
