'use client'

import { cn } from '@/lib/utils'
import * as LucideIcons from 'lucide-react'

type IconTextBlockProps = {
  icon?: string
  text?: string
  iconPosition?: 'left' | 'right' | 'top' | 'bottom'
  iconSize?: 'sm' | 'md' | 'lg' | 'xl'
  textSize?: 'sm' | 'md' | 'lg' | 'xl'
  textColor?: 'default' | 'primary' | 'secondary' | 'accent'
  iconColor?: 'default' | 'primary' | 'secondary' | 'accent'
  className?: string
}

export function IconTextBlock({
  icon,
  text,
  iconPosition = 'left',
  iconSize = 'md',
  textSize = 'md',
  textColor = 'default',
  iconColor = 'default',
  className,
}: IconTextBlockProps) {
  if (!icon || !text) {
    return null
  }

  // Get the Lucide icon component
  const IconComponent = (LucideIcons as any)[icon] || (LucideIcons as any).HelpCircle

  // Icon size classes
  const getIconSizeClass = () => {
    switch (iconSize) {
      case 'sm':
        return 'w-4 h-4'
      case 'md':
        return 'w-6 h-6'
      case 'lg':
        return 'w-8 h-8'
      case 'xl':
        return 'w-10 h-10'
      default:
        return 'w-6 h-6'
    }
  }

  // Text size classes
  const getTextSizeClass = () => {
    switch (textSize) {
      case 'sm':
        return 'text-sm'
      case 'md':
        return 'text-base'
      case 'lg':
        return 'text-lg'
      case 'xl':
        return 'text-xl'
      default:
        return 'text-base'
    }
  }

  // Text color classes
  const getTextColorClass = () => {
    switch (textColor) {
      case 'primary':
        return 'text-ds-dark-blue'
      case 'secondary':
        return 'text-ds-pastille-green'
      case 'accent':
        return 'text-ds-accent-yellow'
      case 'default':
      default:
        return 'text-gray-900'
    }
  }

  // Icon color classes
  const getIconColorClass = () => {
    switch (iconColor) {
      case 'primary':
        return 'text-ds-dark-blue'
      case 'secondary':
        return 'text-ds-pastille-green'
      case 'accent':
        return 'text-ds-accent-yellow'
      case 'default':
      default:
        return 'text-gray-600'
    }
  }

  // Container direction based on icon position
  const getContainerClass = () => {
    switch (iconPosition) {
      case 'top':
        return 'flex-col items-center text-center'
      case 'bottom':
        return 'flex-col-reverse items-center text-center'
      case 'right':
        return 'flex-row-reverse items-center'
      case 'left':
      default:
        return 'flex-row items-center'
    }
  }

  // Spacing between icon and text
  const getSpacingClass = () => {
    switch (iconPosition) {
      case 'top':
        return 'mb-2'
      case 'bottom':
        return 'mt-2'
      case 'right':
        return 'ml-2'
      case 'left':
      default:
        return 'mr-2'
    }
  }

  return (
    <div className={cn('inline-flex', getContainerClass(), className)}>
      <IconComponent
        className={cn('flex-shrink-0', getIconSizeClass(), getIconColorClass(), getSpacingClass())}
      />
      <span className={cn('flex-1 pr-2', getTextSizeClass(), getTextColorClass())}>{text}</span>
    </div>
  )
}
