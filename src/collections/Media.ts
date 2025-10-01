import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: ({ req }) => {
      const role = (req?.user as { role?: string } | undefined)?.role
      // Allow uploads for authenticated users; prefer role check
      return Boolean(req?.user) || role === 'editor' || role === 'admin'
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
  admin: {
    useAsTitle: 'alt',
    description: 'Upload images, documents, and other media files',
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        fit: 'inside',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
        fit: 'inside',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
        fit: 'cover',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'application/pdf'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alternative text for accessibility',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional caption for the media',
      },
    },
    {
      name: 'credit',
      type: 'text',
      admin: {
        description: 'Photo credit or attribution',
      },
    },
  ],
}
