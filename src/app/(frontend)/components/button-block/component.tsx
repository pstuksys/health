import React from 'react'
import { CMSLink } from '../ui'
import { resolveLinkHref } from '@/lib/navigation'

const DOWNLOAD_LINKS = {
  'ipd-referral-form': '/api/downloads/ipd-referral-form',
} as const

type LinkType = 'internal' | 'external' | keyof typeof DOWNLOAD_LINKS

type ButtonBlockProps = {
  label: string
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'default'
  size: 'sm' | 'md' | 'lg'
  linkType: LinkType
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

export function ButtonBlock({
  label,
  variant,
  size,
  linkType,
  internal,
  external,
}: ButtonBlockProps) {
  const resolvedHref =
    linkType === 'ipd-referral-form'
      ? DOWNLOAD_LINKS[linkType]
      : resolveLinkHref({
          linkType,
          internal: internal ?? undefined,
          external: external ?? undefined,
        })

  return (
    <div className="my-4">
      <CMSLink href={resolvedHref} variant={variant} size={size} external={linkType === 'external'}>
        {label}
      </CMSLink>
    </div>
  )
}
