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
    defaultColumns: ['title', 'linkType', 'category', '_status', 'updatedAt'],
    preview: ({ slug, linkType, externalUrl }) => {
      if (linkType === 'external') return (externalUrl as string) || null
      const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
      return `${base}/education-hub/${slug ?? ''}?preview=true`
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
      name: 'articleType',
      type: 'select',
      defaultValue: 'standard',
      options: [
        { label: 'Standard Article', value: 'standard' },
        { label: 'Specialist Insight', value: 'specialist-insight' },
      ],
      admin: {
        description:
          'Specialist Insights are written/reviewed by a clinical partner and show a specialist profile.',
        condition: (data) => data?.linkType !== 'external',
      },
    },
    {
      name: 'linkType',
      type: 'select',
      defaultValue: 'internal',
      options: [
        { label: 'Internal Blog Post', value: 'internal' },
        { label: 'External Link', value: 'external' },
      ],
      admin: {
        description: 'Choose whether this is a full blog post or a link to an external article',
      },
    },
    {
      name: 'externalUrl',
      type: 'text',
      label: 'External URL',
      required: true,
      admin: {
        description: 'Full URL to the external article (opens in new tab)',
        condition: (data) => data?.linkType === 'external',
      },
      validate: (value: string | null | undefined, { data }: { data: Partial<Blog> }) => {
        if (data?.linkType !== 'external') return true
        if (!value) return 'External URL is required for external links'
        try {
          new URL(value)
          return true
        } catch {
          return 'Please enter a valid URL (e.g., https://example.com/article)'
        }
      },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        condition: (data) => data?.linkType !== 'external',
      },
      validate: (value: string | null | undefined, { data }: { data: Partial<Blog> }) => {
        if (data?.linkType === 'external') return true
        if (!value) return 'Slug is required for internal blog posts'
        return true
      },
    },
    { name: 'excerpt', type: 'textarea' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      required: true,
      options: [
        { label: 'Sleep Disorders', value: 'sleep-disorders' },
        { label: 'Diagnostics & Testing', value: 'diagnostics-testing' },
        { label: 'Therapies & Treatments', value: 'therapies-treatments' },
        { label: 'Specialist Insights', value: 'specialists-insights' },
        { label: 'Lifestyle & Tips', value: 'lifestyle-tips' },
        { label: 'Featured In', value: 'featured in' },
      ],
      admin: {
        description: 'Select the category that best fits this blog post',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      admin: {
        condition: (data) => data?.linkType !== 'external',
      },
    },
    {
      name: 'author',
      type: 'text',
      label: 'Author',
      admin: {
        condition: (data) => data?.linkType !== 'external',
      },
    },
    {
      name: 'readTime',
      type: 'text',
      label: 'Read Time (e.g., "5 min")',
      admin: {
        condition: (data) => data?.linkType !== 'external',
      },
    },
    {
      name: 'keyTakeaways',
      type: 'array',
      label: 'Key Takeaways',
      labels: { singular: 'Takeaway', plural: 'Takeaways' },
      admin: {
        description: 'Optional summary points shown in a highlighted box near the top of the article.',
        condition: (data) => data?.linkType !== 'external',
      },
      fields: [{ name: 'point', type: 'text', required: true }],
    },
    {
      name: 'showSpecialistProfile',
      type: 'checkbox',
      label: 'Show specialist profile',
      defaultValue: false,
      admin: {
        description: 'Display a "Reviewed by Sleep Specialist" profile card on this article.',
        condition: (data) => data?.linkType !== 'external',
      },
    },
    {
      name: 'specialist',
      type: 'group',
      label: 'Specialist Profile',
      admin: {
        condition: (data) =>
          data?.linkType !== 'external' && Boolean(data?.showSpecialistProfile),
      },
      fields: [
        { name: 'photo', type: 'upload', relationTo: 'media', label: 'Photo' },
        { name: 'name', type: 'text' },
        { name: 'title', type: 'text', label: 'Role / Title' },
        { name: 'bio', type: 'textarea' },
        {
          name: 'professionalDetails',
          type: 'array',
          label: 'Professional Details',
          labels: { singular: 'Detail', plural: 'Details' },
          admin: {
            description: 'e.g. "GMC Number: 1234567", "NHS Consultant since 2012".',
          },
          fields: [{ name: 'detail', type: 'text', required: true }],
        },
        {
          name: 'contact',
          type: 'group',
          label: 'Contact & Practice Details',
          fields: [
            { name: 'location', type: 'text' },
            { name: 'website', type: 'text', label: 'Website URL' },
            { name: 'email', type: 'text' },
            { name: 'phone', type: 'text' },
          ],
        },
        {
          name: 'cta',
          type: 'group',
          label: 'Consultation CTA',
          fields: [
            { name: 'label', type: 'text', defaultValue: 'Book a Consultation' },
            {
              name: 'linkType',
              type: 'select',
              defaultValue: 'internal',
              options: [
                { label: 'Internal', value: 'internal' },
                { label: 'External', value: 'external' },
              ],
            },
            {
              name: 'internal',
              type: 'group',
              admin: { condition: (_, siblingData) => siblingData?.linkType === 'internal' },
              fields: [{ name: 'relation', type: 'relationship', relationTo: ['pages', 'blogs'] }],
            },
            {
              name: 'external',
              type: 'group',
              admin: { condition: (_, siblingData) => siblingData?.linkType === 'external' },
              fields: [{ name: 'href', type: 'text', label: 'External URL' }],
            },
          ],
        },
      ],
    },
    {
      name: 'clinicalReviewNote',
      type: 'text',
      label: 'Clinical review note',
      defaultValue:
        'This article has been clinically reviewed to ensure accuracy and reflect current best practice.',
      admin: {
        description: 'Shown below the specialist profile card.',
        condition: (data) =>
          data?.linkType !== 'external' && Boolean(data?.showSpecialistProfile),
      },
    },
    // SEO fields will be provided by @payloadcms/plugin-seo; avoid duplicate 'meta' field name
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        condition: (data) => data?.linkType !== 'external',
      },
    },
  ],
}
