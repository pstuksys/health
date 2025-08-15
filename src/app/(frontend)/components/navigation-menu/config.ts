import type { Field } from 'payload'

export const navigationMenuFields: Field[] = [
  {
    name: 'items',
    type: 'array',
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
