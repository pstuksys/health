import type { Field } from 'payload'

export const heroSectionFields: Field[] = [
  { name: 'title', type: 'richText', required: true },
  { name: 'subtitle', type: 'richText' },
  {
    name: 'align',
    type: 'select',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ],
    defaultValue: 'center',
  },
  { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
  {
    name: 'ctaButton',
    type: 'group',
    fields: [
      { name: 'label', type: 'text' },
      { name: 'href', type: 'text' },
      {
        name: 'variant',
        type: 'select',
        options: [
          { label: 'Primary', value: 'primary' },
          { label: 'Secondary', value: 'secondary' },
        ],
      },
    ],
  },
  {
    name: 'secondaryCTA',
    type: 'group',
    fields: [
      { name: 'label', type: 'text' },
      { name: 'href', type: 'text' },
    ],
  },
  { name: 'gradientOverlay', type: 'checkbox', defaultValue: false },
]
