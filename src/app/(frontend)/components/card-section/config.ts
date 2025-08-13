import type { Field } from 'payload'

export const cardSectionFields: Field[] = [
  { name: 'columns', type: 'number', min: 1, max: 4, defaultValue: 3 },
  {
    name: 'cards',
    type: 'array',
    required: true,
    fields: [
      { name: 'image', type: 'upload', relationTo: 'media' },
      { name: 'title', type: 'text', required: true },
      { name: 'text', type: 'textarea' },
      { name: 'href', type: 'text' },
    ],
  },
]
