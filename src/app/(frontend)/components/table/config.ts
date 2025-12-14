import type { Field } from 'payload'

export const tableFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    label: 'Table Title',
    required: false,
    admin: {
      description: 'Optional title for the table section',
    },
  },
  {
    name: 'columns',
    type: 'array',
    label: 'Table Columns',
    required: true,
    minRows: 1,
    fields: [
      {
        name: 'header',
        type: 'text',
        label: 'Column Header',
        required: true,
        admin: {
          description: 'Display text for the column header',
        },
      },
    ],
  },
  {
    name: 'data',
    type: 'array',
    label: 'Table Data',
    required: true,
    minRows: 1,
    fields: [
      {
        name: 'cells',
        type: 'array',
        label: 'Cell Contents',
        required: true,
        minRows: 1,
        admin: {
          description:
            'Rich text content for each cell in this row (should match the number of columns)',
        },
        fields: [
          {
            name: 'content',
            type: 'richText',
            label: 'Cell Content',
            required: true,
            admin: {
              description: 'Rich text content for this table cell',
            },
          },
        ],
      },
    ],
  },
]
