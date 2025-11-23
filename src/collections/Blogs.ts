import type { CollectionConfig } from 'payload'
import type { Blog } from '@/payload-types'
import { cacheTags, revalidateCacheTags } from '@/lib/cache-tags'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  hooks: {
    afterChange: [
      async ({ doc }) => {
        const blog = doc as Blog | undefined
        if (blog?._status && blog._status !== 'published') return
        const tags = [cacheTags.blogs, cacheTags.blog(blog?.slug ?? '')]
        if (blog?.category) tags.push(cacheTags.blogCategory(blog.category))
        await revalidateCacheTags(tags)
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        const blog = doc as Blog | undefined
        const tags = [cacheTags.blogs, cacheTags.blog(blog?.slug ?? '')]
        if (blog?.category) tags.push(cacheTags.blogCategory(blog.category))
        await revalidateCacheTags(tags)
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
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
    },
    { name: 'content', type: 'richText', label: 'Content' },
    { name: 'author', type: 'text', label: 'Author' },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      required: true,
      options: [
        { label: 'Sleep Disorders', value: 'sleep-disorders' },
        { label: 'Diagnostics & Testing', value: 'diagnostics-testing' },
        { label: 'Therapies & Treatments', value: 'therapies-treatments' },
        { label: 'Lifestyle & Tips', value: 'lifestyle-tips' },
        { label: 'Featured In', value: 'featured in' },
      ],
      admin: {
        description: 'Select the category that best fits this blog post',
      },
    },
    { name: 'readTime', type: 'text', label: 'Read Time (e.g., "5 min")' },
    // SEO fields will be provided by @payloadcms/plugin-seo; avoid duplicate 'meta' field name
    { name: 'publishedAt', type: 'date' },
  ],
}
