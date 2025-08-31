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

type AboutUsSectionProps = {
  title: string
  content?: any // Lexical content
  image?: number | Media | null | undefined
  ctaButton?: CTAButton
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

export function AboutUsSection({
  title,
  content,
  image,
  ctaButton,
  className,
}: AboutUsSectionProps) {
  return (
    <section className={cn('py-16 px-4 sm:px-6 lg:px-8 bg-ds-light-neutral', className)}>
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl sm:text-4xl font-light leading-tight text-ds-dark-blue">
              {title}
            </h2>
            <div
              className="text-lg font-light leading-relaxed text-ds-pastille-green prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: lexicalToHtml(content) }}
            />
            {ctaButton && (
              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-ds-accent-yellow hover:bg-ds-accent-yellow/90 text-ds-dark-blue font-semibold px-8 py-3"
                >
                  <Link href={ctaButton.href ?? '#'}>{ctaButton.label ?? 'Learn More'}</Link>
                </Button>
              </div>
            )}
          </div>
          {image && (
            <div className="relative">
              <Image
                src={mediaToUrl(image)}
                alt={title}
                width={600}
                height={400}
                className="w-full h-auto shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
