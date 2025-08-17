import type { Field } from 'payload'

export const carouselFields: Field[] = [
  {
    name: 'title',
    type: 'text',
  },
  {
    name: 'subtitle',
    type: 'textarea',
  },
  {
    name: 'items',
    type: 'array',
    fields: [
      { name: 'image', type: 'upload', relationTo: 'media', required: true },
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea' },
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
    ],
  },
  { name: 'slidesToShow', type: 'number', defaultValue: 1, min: 1, max: 6 },
  { name: 'autoplay', type: 'checkbox', defaultValue: false },
  { name: 'autoplayInterval', type: 'number', defaultValue: 5000 },
  { name: 'showArrows', type: 'checkbox', defaultValue: true },
  { name: 'showDots', type: 'checkbox', defaultValue: true },
]
