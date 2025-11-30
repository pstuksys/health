import { CMSLink } from '../ui'
import { resolveLinkHref } from '@/lib/navigation'
import { cn } from '@/lib/utils'

export type ButtonBlockProps = {
  label: string
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'default'
  size: 'sm' | 'md' | 'lg' | 'xl'
  position: 'left' | 'center' | 'right'
  spacing: 'sm' | 'md' | 'lg' | 'xl'
  linkType: 'internal' | 'external'
  internal?: {
    relation?: {
      relationTo?: 'pages' | 'blogs'
      value?: { slug?: string | null } | number
    } | null
  } | null
  external?: {
    href?: string
  } | null
}

const spacingMap: Record<ButtonBlockProps['spacing'], string> = {
  sm: 'py-6',
  md: 'py-12',
  lg: 'py-16',
  xl: 'py-32',
}

const positionMap: Record<ButtonBlockProps['position'], string> = {
  left: 'justify-start text-left',
  center: 'justify-center text-center',
  right: 'justify-end text-right',
}

const extraLargeClasses = 'px-8 py-3.5 text-xl rounded-[14px]'

export function Button(block: ButtonBlockProps) {
  const { label, variant, size, position, spacing, linkType, internal, external } = block

  const resolvedHref = resolveLinkHref({
    linkType,
    internal: internal ?? undefined,
    external,
  })

  const buttonSize: 'sm' | 'md' | 'lg' = size === 'xl' ? 'lg' : size

  return (
    <section className={cn('w-full', spacingMap[spacing])}>
      <div className={cn('flex w-full', positionMap[position])}>
        <CMSLink
          href={resolvedHref}
          variant={variant}
          size={buttonSize}
          external={linkType === 'external'}
          className={cn(size === 'xl' && extraLargeClasses)}
        >
          {label}
        </CMSLink>
      </div>
    </section>
  )
}
