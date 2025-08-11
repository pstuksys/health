import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: { read: () => true },
  fields: [
    {
      name: 'links',
      type: 'array',
      label: 'Footer Links',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        { name: 'external', type: 'checkbox', label: 'External', defaultValue: false },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      admin: { description: 'e.g., © 2025 Health Co.' },
    },
  ],
}
