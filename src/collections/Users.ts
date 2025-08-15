import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'viewer',
      options: [
        { label: 'Viewer', value: 'viewer' },
        { label: 'Editor', value: 'editor' },
        { label: 'Admin', value: 'admin' },
      ],
      admin: {
        description: 'Controls access to content and admin features',
        position: 'sidebar',
      },
      access: {
        // Only admins can set or change roles
        create: ({ req }) => (req.user as { role?: string } | undefined)?.role === 'admin',
        update: ({ req }) => (req.user as { role?: string } | undefined)?.role === 'admin',
      },
    },
  ],
}
