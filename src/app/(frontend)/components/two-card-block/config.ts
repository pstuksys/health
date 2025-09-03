import type { Field } from 'payload'

export const twoCardBlockFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: false,
  },
  {
    name: 'subtitle',
    type: 'textarea',
  },
  {
    name: 'items',
    type: 'array',
    required: true,
    minRows: 1,
    maxRows: 2,
    fields: [
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        required: true,
      },
      {
        name: 'title',
        type: 'text',
        required: true,
      },
      {
        name: 'description',
        type: 'textarea',
        required: true,
      },
      {
        name: 'links',
        type: 'array',
        maxRows: 2,
        fields: [
          {
            name: 'text',
            type: 'text',
            required: true,
          },
          {
            name: 'variant',
            type: 'select',
            defaultValue: 'primary',
            options: [
              { label: 'Primary', value: 'primary' },
              { label: 'Secondary', value: 'secondary' },
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
                required: true,
              },
            ],
          },
          {
            name: 'external',
            type: 'group',
            admin: { condition: (_, siblingData) => siblingData?.linkType === 'external' },
            fields: [
              {
                name: 'href',
                type: 'text',
                required: true,
              },
            ],
          },
        ],
      },
    ],
  },
]
