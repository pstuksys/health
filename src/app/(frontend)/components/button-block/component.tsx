import React from 'react'
import { CMSLink } from '../ui'
import { resolveLinkHref } from '@/lib/navigation'

type ButtonBlockProps = {
  label: string
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'default'
  size: 'sm' | 'md' | 'lg'
  linkType: 'internal' | 'external'
  internal?: {
    relationTo: 'pages' | 'blogs'
    value: string
  }
  external?: {
    href: string
  }
}

export function ButtonBlock({
  label,
  variant,
  size,
  linkType,
  internal,
  external,
}: ButtonBlockProps) {
  const resolvedHref = resolveLinkHref({
    linkType,
    internal: internal
      ? {
          relation: {
            relationTo: internal.relationTo,
            value: { slug: internal.value },
          },
        }
      : undefined,
    external,
  })

  return (
    <div className="my-4">
      <CMSLink href={resolvedHref} variant={variant} size={size} external={linkType === 'external'}>
        {label}
      </CMSLink>
    </div>
  )
}
