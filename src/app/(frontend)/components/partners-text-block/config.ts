import type { Field } from 'payload'

export const partnersTextBlockFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: true,
    defaultValue: 'Our Partners',
  },
  {
    name: 'partners',
    type: 'array',
    required: true,
    fields: [
      {
        name: 'name',
        type: 'text',
        required: true,
      },
    ],
  },
]
