import type { Field } from 'payload'

export const partnersBlockFields: Field[] = [
  {
    name: 'id',
    type: 'text',
    required: false,
    defaultValue: 'PartnersBlock',
    admin: { description: 'Unique identifier for anchor linking (e.g., #partners)' },
  },
  { name: 'title', type: 'text', required: true },
  {
    name: 'partners',
    type: 'array',
    required: true,
    fields: [{ name: 'logo', type: 'upload', relationTo: 'media', required: true }],
  },
]
