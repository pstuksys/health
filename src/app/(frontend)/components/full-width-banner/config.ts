import type { Field } from 'payload'

export const fullWidthBannerFields: Field[] = [
  { name: 'enableCarousel', type: 'checkbox', defaultValue: false, label: 'Enable Carousel' },
  { name: 'enableQuotes', type: 'checkbox', defaultValue: false, label: 'Enable Quotes for Title' },
  {
    name: 'carouselItems',
    type: 'array',
    admin: { condition: (_, siblingData) => siblingData?.enableCarousel === true },
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'subtitle', type: 'text' },
      { name: 'buttonText', type: 'text' },
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
      { name: 'openInNewTab', type: 'checkbox', defaultValue: false },
    ],
  },
  // Single item fields (when carousel is disabled)
  {
    name: 'title',
    type: 'text',
    required: true,
    admin: { condition: (_, siblingData) => siblingData?.enableCarousel !== true },
  },
  {
    name: 'subtitle',
    type: 'text',
    admin: { condition: (_, siblingData) => siblingData?.enableCarousel !== true },
  },
  {
    name: 'buttonText',
    type: 'text',
    admin: { condition: (_, siblingData) => siblingData?.enableCarousel !== true },
  },
  {
    name: 'linkType',
    type: 'radio',
    defaultValue: 'internal',
    admin: { condition: (_, siblingData) => siblingData?.enableCarousel !== true },
    options: [
      { label: 'Internal', value: 'internal' },
      { label: 'External', value: 'external' },
    ],
  },
  {
    name: 'internal',
    type: 'group',
    admin: {
      condition: (_, siblingData) =>
        siblingData?.linkType === 'internal' && siblingData?.enableCarousel !== true,
    },
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
    admin: {
      condition: (_, siblingData) =>
        siblingData?.linkType === 'external' && siblingData?.enableCarousel !== true,
    },
    fields: [{ name: 'href', type: 'text' }],
  },
  {
    name: 'openInNewTab',
    type: 'checkbox',
    defaultValue: false,
    admin: { condition: (_, siblingData) => siblingData?.enableCarousel !== true },
  },
  { name: 'backgroundImage', type: 'upload', relationTo: 'media', required: true },
]
