import type { CollectionConfig, Block } from 'payload'
import { contentBlockFields } from '../app/(frontend)/components/content-block/config'
import { cardSectionFields } from '../app/(frontend)/components/card-section/config'
import { mediaBlockFields } from '../app/(frontend)/components/media-block/config'
import { ctaBlockFields } from '../app/(frontend)/components/cta-block/config'
import { aboutUsSectionFields } from '../app/(frontend)/components/about-us-section/config'
import { partnersBlockFields } from '../app/(frontend)/components/partners-block/config'
import { blogPostCardsFields } from '../app/(frontend)/components/blog-post-cards/config'
import { carouselFields } from '../app/(frontend)/components/carousel/config'
import { navigationMenuFields } from '../app/(frontend)/components/navigation-menu/config'
import { heroSectionFields } from '../app/(frontend)/components/hero-section/config'

// Safely extract authenticated user's role without using `any`
const getUserRoleFromReq = (req: unknown): 'viewer' | 'editor' | 'admin' | undefined => {
  if (!req || typeof req !== 'object' || !('user' in req)) return undefined
  const user = (req as Record<string, unknown>).user
  if (!user || typeof user !== 'object') return undefined
  const role = (user as Record<string, unknown>).role
  if (role === 'viewer' || role === 'editor' || role === 'admin') return role
  return undefined
}

const contentBlock: Block = {
  slug: 'contentBlock',
  fields: contentBlockFields,
}

const cardSectionBlock: Block = {
  slug: 'cardSection',
  fields: cardSectionFields,
}

const mediaBlock: Block = {
  slug: 'mediaBlock',
  fields: mediaBlockFields,
}

const ctaBlock: Block = {
  slug: 'ctaBlock',
  fields: ctaBlockFields,
}

const aboutUsSectionBlock: Block = {
  slug: 'aboutUsSection',
  fields: aboutUsSectionFields,
}

const partnersBlock: Block = {
  slug: 'partnersBlock',
  fields: partnersBlockFields,
}

const blogPostCardsBlock: Block = {
  slug: 'blogPostCards',
  fields: blogPostCardsFields,
}

const carouselBlock: Block = {
  slug: 'carousel',
  fields: carouselFields,
}

const navigationMenuBlock: Block = {
  slug: 'navigationMenu',
  fields: navigationMenuFields,
}

const heroSectionBlock: Block = {
  slug: 'heroSection',
  fields: heroSectionFields,
}

// All available page blocks
const pageBlocks: Block[] = [
  heroSectionBlock,
  contentBlock,
  cardSectionBlock,
  mediaBlock,
  ctaBlock,
  aboutUsSectionBlock,
  partnersBlock,
  blogPostCardsBlock,
  carouselBlock,
]

export const Pages: CollectionConfig = {
  slug: 'pages',
  hooks: {
    afterChange: [
      ({ req: _req, doc }) => {
        void fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/api/revalidate?secret=${process.env.REVALIDATION_SECRET ?? ''}`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ tags: ['pages', `page:${(doc as any)?.slug ?? ''}`] }),
          },
        ).catch(() => {})
      },
    ],
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    preview: ({ slug }) => {
      const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
      return `${base}/${slug ?? ''}?preview=true`
    },
    livePreview: {
      url: ({ data }) => {
        const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
        const slug = typeof data?.slug === 'string' ? data.slug : ''
        return `${base}/${slug}`
      },
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1280, height: 800 },
      ],
    },
    description: 'Create pages with flexible content blocks',
  },
  versions: {
    drafts: true,
  },
  lockDocuments: {
    duration: 600,
  },
  access: {
    // Public can read only published; editors/admins can read all
    read: ({ req }) => {
      const role = getUserRoleFromReq(req)
      if (role === 'editor' || role === 'admin') return true
      return {
        _status: { equals: 'published' },
      }
    },
    create: ({ req }) => {
      const role = getUserRoleFromReq(req)
      return role === 'editor' || role === 'admin'
    },
    update: ({ req }) => {
      const role = getUserRoleFromReq(req)
      return role === 'editor' || role === 'admin'
    },
    delete: ({ req }) => {
      const role = getUserRoleFromReq(req)
      return role === 'admin'
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Page title displayed in the browser tab and page header',
              },
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              index: true,
              admin: {
                description: 'URL path for this page. Example: about, blog/my-post',
              },
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Hero Content',
              required: false,
              admin: {
                description: 'Content displayed within the Hero when Show Hero is enabled',
                className: 'hero-content-editor',
              },
            },
            {
              name: 'showHero',
              type: 'checkbox',
              label: 'Show Hero',
              defaultValue: false,
              admin: {
                description: 'If enabled, the hero is rendered using the Hero Content rich text.',
              },
            },
          ],
        },
        {
          label: 'Blocks',
          fields: [
            {
              name: 'blocks',
              type: 'blocks',
              label: 'Content Blocks',
              blocks: pageBlocks,
              admin: {
                description: 'Add flexible content blocks to build your page layout',
              },
            },
          ],
        },
      ],
    },
    // Sidebar controls for layout/visibility
    {
      name: 'hideHeader',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Hide the page header',
        position: 'sidebar',
      },
    },
    {
      name: 'hideFooter',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Hide the page footer',
        position: 'sidebar',
      },
    },
    {
      name: 'fullWidth',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Use full width layout instead of container',
        position: 'sidebar',
      },
    },
  ],
}
