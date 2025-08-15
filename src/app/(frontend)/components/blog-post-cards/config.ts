import type { Field } from 'payload'

export const blogPostCardsFields: Field[] = [
  {
    name: 'posts',
    type: 'array',
    fields: [
      { name: 'image', type: 'upload', relationTo: 'media' },
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
      { name: 'date', type: 'text' },
      { name: 'author', type: 'text' },
    ],
  },
]
