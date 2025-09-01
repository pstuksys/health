import type { Field } from 'payload'

export const fullWidthBannerFields: Field[] = [
  { name: 'title', type: 'text', required: true },
  { name: 'subtitle', type: 'text' },
  { name: 'buttonText', type: 'text', required: true },
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
    name: 'internal',
    type: 'group',
    admin: { condition: (_, siblingData) => siblingData?.linkType === 'internal' },
    fields: [
      {
        name: 'relation',
        type: 'relationship',
        relationTo: ['pages', 'blogs'],
      },
    ],
  },
  {
    name: 'external',
    type: 'group',
    admin: { condition: (_, siblingData) => siblingData?.linkType === 'external' },
    fields: [{ name: 'href', type: 'text' }],
  },
  { name: 'openInNewTab', type: 'checkbox', defaultValue: false },
  { name: 'backgroundImage', type: 'upload', relationTo: 'media', required: true },
]
