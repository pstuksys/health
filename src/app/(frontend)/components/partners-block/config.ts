import type { Field } from 'payload'

export const partnersBlockFields: Field[] = [
  { name: 'layout', type: 'select', options: ['grid', 'carousel'], defaultValue: 'grid' },
  {
    name: 'partners',
    type: 'array',
    required: true,
    fields: [
      { name: 'logo', type: 'upload', relationTo: 'media', required: true },
      { name: 'name', type: 'text', required: true },
      { name: 'href', type: 'text' },
    ],
  },
]
