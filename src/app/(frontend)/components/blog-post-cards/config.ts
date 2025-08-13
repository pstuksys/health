import type { Field } from 'payload'

export const blogPostCardsFields: Field[] = [
  {
    name: 'posts',
    type: 'array',
    fields: [
      { name: 'image', type: 'upload', relationTo: 'media' },
      { name: 'title', type: 'text', required: true },
      { name: 'excerpt', type: 'textarea' },
      { name: 'href', type: 'text', required: true },
      { name: 'date', type: 'text' },
      { name: 'author', type: 'text' },
    ],
  },
]
