import type { Access, CollectionConfig } from 'payload'

const isAdmin: Access = ({ req }) => (req.user as { role?: string } | undefined)?.role === 'admin'

const isAdminOrSelf: Access = ({ req }) => {
  if (!req.user) return false
  if ((req.user as { role?: string }).role === 'admin') return true
  return { id: { equals: req.user.id } }
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: isAdminOrSelf,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
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
