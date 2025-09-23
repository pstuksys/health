import type { Field } from 'payload'

export const highlightSectionBlockFields: Field[] = [
  { name: 'title', type: 'text', required: true, defaultValue: 'Section Title' },
  { name: 'description', type: 'textarea', defaultValue: 'Short, supportive description text.' },
  {
    name: 'cta',
    type: 'group',
    label: 'CTA Button',
    fields: [
      { name: 'label', type: 'text', required: false },
      {
        name: 'linkType',
        type: 'select',
        options: [
          { label: 'Internal', value: 'internal' },
          { label: 'External', value: 'external' },
        ],
        defaultValue: 'internal',
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
  { name: 'image', type: 'upload', relationTo: 'media' },
  {
    name: 'overlayText',
    type: 'group',
    admin: { description: 'Optional overlay text displayed on the image' },
    fields: [
      { name: 'main', type: 'text' },
      { name: 'subtitle', type: 'text' },
    ],
  },
]
