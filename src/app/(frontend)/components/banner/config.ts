import type { Field } from 'payload'

export const bannerFields: Field[] = [
  { name: 'text', type: 'text', required: true },
  { name: 'backgroundColor', type: 'text', defaultValue: 'bg-ds-dark-blue' },
  {
    name: 'ctaButton',
    type: 'group',
    fields: [
      { name: 'label', type: 'text' },
      { name: 'href', type: 'text' },
    ],
  },
  { name: 'dismissible', type: 'checkbox', defaultValue: false },
]


