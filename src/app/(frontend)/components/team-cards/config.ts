import type { Field } from 'payload'

export const teamCardsFields: Field[] = [
  { name: 'title', type: 'text', required: true, defaultValue: 'Meet Our Team' },
  { name: 'subtitle', type: 'text', defaultValue: 'The talented people behind our success' },
  {
    name: 'members',
    type: 'array',
    required: true,
    fields: [
      { name: 'image', type: 'upload', relationTo: 'media', required: true },
      { name: 'name', type: 'text', required: true },
      { name: 'description', type: 'textarea', required: true },
      { name: 'linkedin', type: 'text' },
      {
        name: 'imagePosition',
        type: 'select',
        defaultValue: 'left',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Right', value: 'right' },
        ],
      },
    ],
  },
]
