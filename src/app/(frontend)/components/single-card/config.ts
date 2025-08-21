import type { Field } from 'payload'

export const singleCardFields: Field[] = [
  { name: 'title', type: 'text', required: true },
  { name: 'subtitle', type: 'textarea' },
  { name: 'image', type: 'upload', relationTo: 'media', required: true },
  { name: 'enableBackground', type: 'checkbox', defaultValue: false },
  {
    name: 'imagePosition',
    type: 'radio',
    defaultValue: 'left',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Right', value: 'right' },
    ],
  },
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
  {
    name: 'cta',
    type: 'group',
    fields: [
      { name: 'text', type: 'text' },
      {
        name: 'variant',
        type: 'select',
        options: [
          { label: 'Primary', value: 'primary' },
          { label: 'Secondary', value: 'secondary' },
          { label: 'Outline', value: 'outline' },
          { label: 'Ghost', value: 'ghost' },
        ],
      },
    ],
  },
]
