import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: { read: () => true },
  fields: [
    {
      name: 'enableBanter',
      type: 'checkbox',
      label: 'Enable Banter Block',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'headerDescription',
      type: 'textarea',
      label: 'Description Above Header',
      admin: {
        description: 'Optional description text shown above the site header',
        condition: (_, siblingData) => Boolean(siblingData?.enableBanter),
        position: 'sidebar',
      },
    },
    {
      name: 'banterText',
      type: 'text',
      label: 'Banter Text',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.enableBanter),
        description: 'Short line of text displayed when Banter Block is enabled',
      },
    },
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
