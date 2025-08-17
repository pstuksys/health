import type { Field } from 'payload'

export const teamCardsFields: Field[] = [
  { name: 'title', type: 'text', required: true, defaultValue: 'Our Team' },
  { name: 'subtitle', type: 'text' },
  {
    name: 'enableCarousel',
    type: 'checkbox',
    defaultValue: false,
  },
  {
    name: 'members',
    type: 'array',
    required: true,
    fields: [
      { name: 'image', type: 'upload', relationTo: 'media', required: true },
      { name: 'name', type: 'text', required: true },
      { name: 'description', type: 'textarea', required: true },
      {
        name: 'link',
        type: 'group',
        required: true,
        fields: [
          { name: 'text', type: 'text', required: true },
          { name: 'href', type: 'text', required: true },
        ],
      },
    ],
  },
]
