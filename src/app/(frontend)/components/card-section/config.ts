import type { Field } from 'payload'

export const cardSectionFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    label: 'Section Title',
    required: false,
    admin: {
      description: 'Optional title for the card section',
    },
  },
  {
    name: 'subtitle',
    type: 'textarea',
    label: 'Section Subtitle',
    required: false,
    admin: {
      description: 'Optional subtitle/description for the card section',
    },
  },
  { name: 'columns', type: 'number', min: 1, max: 4, defaultValue: 4 },
  {
    name: 'cards',
    type: 'array',
    required: true,
    fields: [
      { name: 'image', type: 'upload', relationTo: 'media' },
      { name: 'title', type: 'text', required: true },
      { name: 'text', type: 'textarea' },
      {
        name: 'linkType',
        type: 'select',
        label: 'Link Type',
        options: [
          { label: 'Internal', value: 'internal' },
          { label: 'External', value: 'external' },
        ],
        defaultValue: 'internal',
        admin: { description: 'Choose between internal page/blog or external URL' },
      },
      {
        name: 'internal',
        type: 'group',
        label: 'Internal Link',
        admin: {
          description: 'Link to an internal page or blog post',
          condition: (data, siblingData) => siblingData?.linkType === 'internal',
        },
        fields: [
          {
            name: 'relation',
            type: 'relationship',
            label: 'Select Page or Blog',
            relationTo: ['pages', 'blogs'],
            required: false,
            admin: { description: 'Choose the page or blog to link to' },
          },
        ],
      },
      {
        name: 'external',
        type: 'group',
        label: 'External Link',
        admin: {
          description: 'Link to an external website',
          condition: (data, siblingData) => siblingData?.linkType === 'external',
        },
        fields: [
          {
            name: 'href',
            type: 'text',
            required: false,
            admin: { description: 'External URL (e.g., https://example.com)' },
          },
        ],
      },
      { name: 'buttonText', type: 'text', label: 'Button Text', defaultValue: 'Learn More' },
    ],
  },
]
