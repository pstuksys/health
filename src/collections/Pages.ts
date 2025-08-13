import type { CollectionConfig, Block } from 'payload'
import { heroSectionFields } from '../app/(frontend)/components/hero-section/config'
import { bannerFields } from '../app/(frontend)/components/banner/config'
import { contentBlockFields } from '../app/(frontend)/components/content-block/config'
import { cardSectionFields } from '../app/(frontend)/components/card-section/config'
import { mediaBlockFields } from '../app/(frontend)/components/media-block/config'
import { ctaBlockFields } from '../app/(frontend)/components/cta-block/config'
import { aboutUsSectionFields } from '../app/(frontend)/components/about-us-section/config'
import { partnersBlockFields } from '../app/(frontend)/components/partners-block/config'
import { blogPostCardsFields } from '../app/(frontend)/components/blog-post-cards/config'
import { carouselFields } from '../app/(frontend)/components/carousel/config'
import { navigationMenuFields } from '../app/(frontend)/components/navigation-menu/config'
import { modalSearchFields } from '../app/(frontend)/components/modal-search/config'

// Convert component fields to blocks format
const heroSectionBlock: Block = {
  slug: 'heroSection',
  fields: heroSectionFields,
}

const bannerBlock: Block = {
  slug: 'banner',
  fields: bannerFields,
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

const modalSearchBlock: Block = {
  slug: 'modalSearch',
  fields: modalSearchFields,
}

// All available page blocks
const pageBlocks: Block[] = [
  heroSectionBlock,
  bannerBlock,
  contentBlock,
  cardSectionBlock,
  mediaBlock,
  ctaBlock,
  aboutUsSectionBlock,
  partnersBlock,
  blogPostCardsBlock,
  carouselBlock,
  modalSearchBlock,
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
    description: 'Create pages with flexible content blocks',
  },
  versions: {
    drafts: true,
  },
  lockDocuments: {
    duration: 600,
  },
  access: {
    read: () => true,
  },
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
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: {
        description: 'Page publication status',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Main Content',
      required: false,
      admin: {
        description: 'Main page content using rich text editor',
      },
    },
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Content Blocks',
      blocks: pageBlocks,
      admin: {
        description: 'Add flexible content blocks to build your page layout',
      },
    },
    {
      name: 'metadata',
      type: 'group',
      label: 'SEO Metadata',
      fields: [
        {
          name: 'description',
          type: 'text',
          admin: {
            description: 'Meta description for search engines (recommended: 150-160 characters)',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          admin: {
            description: 'Comma-separated keywords for SEO',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Open Graph and Twitter card image',
          },
        },
        {
          name: 'noIndex',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Prevent search engines from indexing this page',
          },
        },
      ],
    },
    {
      name: 'settings',
      type: 'group',
      label: 'Page Settings',
      fields: [
        {
          name: 'hideHeader',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Hide the page header',
          },
        },
        {
          name: 'hideFooter',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Hide the page footer',
          },
        },
        {
          name: 'fullWidth',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Use full width layout instead of container',
          },
        },
      ],
    },
  ],
}
