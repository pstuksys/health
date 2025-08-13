import type { Field } from 'payload'

export const mediaBlockFields: Field[] = [
  { name: 'image', type: 'upload', relationTo: 'media', required: true },
  { name: 'imagePosition', type: 'select', options: ['left', 'right'], defaultValue: 'left' },
  { name: 'title', type: 'text', required: true },
  { name: 'content', type: 'richText' },
  {
    name: 'ctaButton',
    type: 'group',
    fields: [
      { name: 'label', type: 'text' },
      { name: 'href', type: 'text' },
    ],
  },
  {
    name: 'backgroundColor',
    type: 'select',
    options: [
      { label: 'Default', value: 'default' },
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
    ],
    defaultValue: 'default',
  },
]
