import type { Field } from 'payload'

export const ctaBlockFields: Field[] = [
  {
    name: 'title',
    type: 'richText',
    required: true,
  },
  {
    name: 'description',
    type: 'richText',
  },
  {
    name: 'ctaButton',
    type: 'group',
    fields: [
      { name: 'label', type: 'text', required: true },
      { name: 'href', type: 'text', required: true },
    ],
  },
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
  {
    name: 'variant',
    type: 'select',
    options: [
      { label: 'Default', value: 'default' },
      { label: 'Accent', value: 'accent' },
      { label: 'Gradient', value: 'gradient' },
    ],
    defaultValue: 'default',
  },
]
