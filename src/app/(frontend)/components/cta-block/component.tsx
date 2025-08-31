import Link from 'next/link'
import { Button } from '@/app/(frontend)/components/ui/button'
import { cn } from '@/lib/utils'
import { getAlignmentClasses, type AlignmentType } from '@/lib/design-system'

type CTAButton = {
  label?: string | null | undefined
  href?: string | null | undefined
}

type CTABlockProps = {
  title?: any // Lexical content
  description?: any // Lexical content
  ctaButton?: CTAButton
  align?: AlignmentType | null | undefined
  variant?: 'default' | 'accent' | 'gradient' | null | undefined
  className?: string
}

function lexicalToHtml(value: unknown): string {
  try {
    if (!value || typeof value !== 'object' || !('root' in (value as Record<string, unknown>)))
      return ''
    const root = (value as { root?: unknown }).root as any
    if (!root || typeof root !== 'object' || !Array.isArray(root.children)) return ''

    const serializeNode = (node: any): string => {
      if (!node) return ''
      switch (node.type) {
        case 'paragraph': {
          const children = Array.isArray(node.children)
            ? node.children.map(serializeNode).join('')
            : ''
          return children ? `<p>${children}</p>` : ''
        }
        case 'heading': {
          const level = typeof node.tag === 'string' && /^h[1-6]$/.test(node.tag) ? node.tag : 'h2'
          const children = Array.isArray(node.children)
            ? node.children.map(serializeNode).join('')
            : ''
          return children ? `<${level}>${children}</${level}>` : ''
        }
        case 'text': {
          let text: string = node.text ?? ''
          if (!text.trim()) return ''
          if (node.format) {
            const isBold = (node.format & 1) === 1
            const isItalic = (node.format & 2) === 2
            const isUnderline = (node.format & 4) === 4
            if (isBold) text = `<strong>${text}</strong>`
            if (isItalic) text = `<em>${text}</em>`
            if (isUnderline) text = `<u>${text}</u>`
          }
          return text
        }
        case 'link': {
          const children = Array.isArray(node.children)
            ? node.children.map(serializeNode).join('')
            : ''
          if (!children) return ''
          const href = typeof node.url === 'string' ? node.url : '#'
          const rel = node.rel ? ` rel="${node.rel}"` : ''
          const target = node.target ? ` target="${node.target}"` : ''
          return `<a href="${href}"${rel}${target}>${children}</a>`
        }
        case 'list': {
          const children = Array.isArray(node.children)
            ? node.children.map(serializeNode).join('')
            : ''
          if (!children) return ''
          const tag = node.listType === 'number' || node.listType === 'ordered' ? 'ol' : 'ul'
          return `<${tag}>${children}</${tag}>`
        }
        case 'listitem': {
          const children = Array.isArray(node.children)
            ? node.children.map(serializeNode).join('')
            : ''
          return children ? `<li>${children}</li>` : ''
        }
        case 'linebreak':
          return '<br />'
        default: {
          const children = Array.isArray(node.children)
            ? node.children.map(serializeNode).join('')
            : ''
          return children
        }
      }
    }

    const result = root.children.map(serializeNode).join('').trim()
    return result
  } catch (error) {
    console.warn('Error parsing lexical content:', error)
    return ''
  }
}

export function CTABlock({
  title,
  description,
  ctaButton,
  align = 'center',
  variant = 'default',
  className,
}: CTABlockProps) {
  const alignmentClasses = getAlignmentClasses(align)
  const getBackgroundClasses = () =>
    variant === 'accent'
      ? 'bg-ds-accent-yellow text-ds-dark-blue'
      : variant === 'gradient'
        ? 'bg-gradient-blue-green text-white'
        : 'bg-ds-light-neutral text-ds-dark-blue'
  const getButtonClasses = () =>
    variant === 'accent'
      ? 'bg-ds-dark-blue hover:bg-ds-dark-blue/90 text-white'
      : variant === 'gradient'
        ? 'bg-ds-accent-yellow hover:bg-ds-accent-yellow/90 text-ds-dark-blue'
        : 'bg-ds-accent-yellow hover:bg-ds-accent-yellow/90 text-ds-dark-blue'

  return (
    <section className={cn('py-16 px-4 sm:px-6 lg:px-8', getBackgroundClasses(), className)}>
      <div className="max-w-4xl mx-auto">
        <div className={cn('space-y-6', alignmentClasses)}>
          <h2
            className={cn('text-3xl sm:text-4xl font-light leading-tight', alignmentClasses)}
            dangerouslySetInnerHTML={{ __html: lexicalToHtml(title) }}
          />
          {description && (
            <p
              className={cn(
                'text-lg font-light leading-relaxed max-w-2xl',
                variant === 'gradient' ? 'text-gray-200' : 'opacity-80',
                align === 'center' && 'mx-auto',
                alignmentClasses,
              )}
              dangerouslySetInnerHTML={{ __html: lexicalToHtml(description) }}
            />
          )}
          {ctaButton && (
            <div className={cn('pt-4', alignmentClasses)}>
              <Button
                asChild
                size="lg"
                className={cn('font-semibold px-8 py-3', getButtonClasses())}
              >
                <Link href={ctaButton.href ?? '#'}>{ctaButton.label ?? 'Learn More'}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
