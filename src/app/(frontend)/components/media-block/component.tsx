import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/app/(frontend)/components/ui/button'
import { cn } from '@/lib/utils'
import { mediaToUrl } from '@/lib/media'
import type { Media } from '@/payload-types'

type CTAButton = {
  label?: string | null | undefined
  href?: string | null | undefined
}

type MediaBlockProps = {
  image?: number | Media | null | undefined
  imagePosition?: 'left' | 'right' | null | undefined
  title: string
  content?: any // Lexical content
  ctaButton?: CTAButton
  backgroundColor?: 'default' | 'light' | 'dark' | null | undefined
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

export function MediaBlock({
  image,
  imagePosition = 'left',
  title,
  content,
  ctaButton,
  backgroundColor = 'default',
  className,
}: MediaBlockProps) {
  const getBackgroundClasses = () =>
    backgroundColor === 'light'
      ? 'bg-ds-light-neutral'
      : backgroundColor === 'dark'
        ? 'bg-ds-dark-blue text-white'
        : 'bg-white'
  const isImageLeft = imagePosition === 'left'

  return (
    <section className={cn('py-16 px-4 sm:px-6 lg:px-8', getBackgroundClasses(), className)}>
      <div className="max-w-container mx-auto">
        <div
          className={cn(
            'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center',
            !isImageLeft && 'lg:grid-flow-col-dense',
          )}
        >
          <div className={cn('relative', !isImageLeft && 'lg:col-start-2')}>
            <Image
              src={mediaToUrl(image)}
              alt={title}
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className={cn('space-y-6', !isImageLeft && 'lg:col-start-1')}>
            <h2 className="text-3xl sm:text-4xl font-light leading-tight">{title}</h2>
            <div
              className={cn(
                'text-lg font-light leading-relaxed',
                backgroundColor === 'dark' ? 'text-gray-200' : 'text-ds-pastille-green',
              )}
              dangerouslySetInnerHTML={{ __html: lexicalToHtml(content) }}
            />
            {ctaButton && (
              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="font-semibold px-8 py-3 bg-ds-accent-yellow hover:bg-ds-accent-yellow/90 text-ds-dark-blue"
                >
                  <Link href={ctaButton.href ?? '#'}>{ctaButton.label ?? 'Learn More'}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
