import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  hooks: {
    afterChange: [
      ({ req:_req, doc }) => {
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
      label: 'Content',
      required: false,
    },
    {
      name: 'metadata',
      type: 'group',
      label: 'SEO Metadata',
      fields: [
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'keywords',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
