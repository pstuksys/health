import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: { read: () => true },
  fields: [
    {
      name: 'navigation',
      type: 'array',
      label: 'Navigation Items',
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'linkType',
          type: 'radio',
          defaultValue: 'internal',
          options: [
            { label: 'Internal', value: 'internal' },
            { label: 'External', value: 'external' },
          ],
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: ['pages', 'blogs'],
          admin: { condition: (_, siblingData) => siblingData?.linkType === 'internal' },
        },
        {
          name: 'href',
          type: 'text',
          admin: { condition: (_, siblingData) => siblingData?.linkType === 'external' },
        },
        {
          name: 'external',
          type: 'checkbox',
          label: 'Open in new tab (external link)',
          defaultValue: false,
        },
      ],
    },
  ],
}
