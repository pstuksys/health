import type { Field } from 'payload'

export const expandableTableFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: true,
    defaultValue: 'Expandable Table',
  },
  {
    name: 'subtitle',
    type: 'text',
    required: false,
  },
  {
    name: 'description',
    type: 'textarea',
    required: false,
  },
  {
    name: 'enableSearch',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      description: 'Enable search functionality for the table items',
    },
  },
  {
    name: 'searchPlaceholder',
    type: 'text',
    required: false,
    defaultValue: 'Search items...',
    admin: {
      condition: (data) => data.enableSearch === true,
    },
  },
  {
    name: 'items',
    type: 'array',
    required: true,
    fields: [
      {
        name: 'title',
        type: 'text',
        required: true,
      },
      {
        name: 'content',
        type: 'textarea',
        required: false,
      },
      {
        name: 'details',
        type: 'richText',
        required: false,
        admin: {
          description:
            'Additional details that will be shown when expanded (supports rich text formatting)',
        },
      },
    ],
  },
]
