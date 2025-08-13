import type { Field } from 'payload'

export const navigationMenuFields: Field[] = [
  {
    name: 'items',
    type: 'array',
    fields: [
      { name: 'label', type: 'text', required: true },
      { name: 'href', type: 'text', required: true },
    ],
  },
  { name: 'logo', type: 'upload', relationTo: 'media' },
  {
    name: 'ctaButton',
    type: 'group',
    fields: [
      { name: 'label', type: 'text' },
      { name: 'href', type: 'text' },
    ],
  },
  { name: 'sticky', type: 'checkbox', defaultValue: false },
]
