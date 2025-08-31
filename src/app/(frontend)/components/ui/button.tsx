import * as React from 'react'
import { cn } from '@/lib/utils'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  size?: 'sm' | 'md' | 'lg' | 'icon'
  variant?: 'default' | 'outline' | 'primary' | 'secondary' | 'green'
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
    const variantClasses = {
      outline: 'border border-border bg-transparent hover:bg-muted',
      primary:
        'bg-ds-accent-yellow text-white border-0 transition-all duration-200 hover:scale-[1.03] hover:brightness-110 active:brightness-95',
      secondary: 'bg-ds-pastille-green text-white border-0 hover:bg-ds-pastille-green/90',
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      green:
        'flex items-center gap-2 bg-ds-pastille-green hover:bg-ds-pastille-green/90 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-110',
    }
    const Comp = asChild ? ('span' as const) : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center rounded',
          sizeClasses,
          variantClasses[variant || 'default'],
          className,
        )}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'
