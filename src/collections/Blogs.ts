import type { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  hooks: {
    afterChange: [
      ({ req: _req, doc }) => {
        void fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/api/revalidate?secret=${process.env.REVALIDATION_SECRET ?? ''}`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ tags: ['blogs', `blog:${(doc as any)?.slug ?? ''}`] }),
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
      return `${base}/blogs/${slug ?? ''}?preview=true`
    },
  },
  versions: {
    drafts: true,
  },
  lockDocuments: { duration: 600 },
  access: {
    read: () => true,
    create: ({ req }) => {
      const role = (req?.user as { role?: string } | undefined)?.role
      return role === 'editor' || role === 'admin'
    },
    update: ({ req }) => {
      const role = (req?.user as { role?: string } | undefined)?.role
      return role === 'editor' || role === 'admin'
    },
    delete: ({ req }) => {
      const role = (req?.user as { role?: string } | undefined)?.role
      return role === 'admin'
    },
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    { name: 'excerpt', type: 'textarea' },
    { name: 'content', type: 'richText', label: 'Content' },
    // SEO fields will be provided by @payloadcms/plugin-seo; avoid duplicate 'meta' field name
    { name: 'publishedAt', type: 'date' },
  ],
}
