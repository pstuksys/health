import type { Field } from 'payload'

export const scrollPostCardsFields: Field[] = [
  { name: 'title', type: 'text' },
  { name: 'subtitle', type: 'text' },
  {
    name: 'disableObserver',
    type: 'checkbox',
    defaultValue: false,
    admin: { description: 'Disable scroll observer for instant visibility' },
  },
  {
    name: 'clickableCard',
    type: 'checkbox',
    defaultValue: false,
    admin: { description: 'Make entire card clickable instead of just the link' },
  },
  {
    name: 'posts',
    type: 'array',
    fields: [
      { name: 'image', type: 'upload', relationTo: 'media' },
      { name: 'category', type: 'text' },
      { name: 'author', type: 'text' },
      { name: 'date', type: 'text' },
      { name: 'readTime', type: 'text' },
      { name: 'title', type: 'text', required: true },
      { name: 'excerpt', type: 'textarea' },
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
        name: 'href',
        type: 'text',
        admin: { condition: (_, siblingData) => siblingData?.linkType === 'external' },
      },
      {
        name: 'post',
        type: 'relationship',
        relationTo: ['blogs'],
        admin: { condition: (_, siblingData) => siblingData?.linkType === 'internal' },
      },
    ],
  },
]
