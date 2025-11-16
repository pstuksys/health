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
      { name: 'buttonText', type: 'text', defaultValue: 'Learn More' },
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
  { name: 'autoplay', type: 'checkbox', defaultValue: false },
  {
    name: 'autoplayInterval',
    type: 'select',
    defaultValue: '5000',
    required: true,
    options: [
      { label: '3 seconds', value: '3000' },
      { label: '5 seconds', value: '5000' },
      { label: '8 seconds', value: '8000' },
      { label: '10 seconds', value: '10000' },
      { label: '15 seconds', value: '15000' },
    ],
    admin: {
      condition: (_, siblingData) => Boolean(siblingData?.autoplay),
    },
  },
  { name: 'showArrows', type: 'checkbox', defaultValue: true },
  { name: 'showDots', type: 'checkbox', defaultValue: true },
]
