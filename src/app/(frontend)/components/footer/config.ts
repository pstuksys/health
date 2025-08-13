import type { Field } from 'payload'

export const footerFields: Field[] = [
  { name: 'about', type: 'textarea' },
  {
    name: 'socialLinks',
    type: 'array',
    fields: [
      { name: 'icon', type: 'text' },
      { name: 'href', type: 'text' },
    ],
  },
  {
    name: 'footerLinks',
    type: 'array',
    fields: [
      { name: 'label', type: 'text' },
      { name: 'href', type: 'text' },
    ],
  },
]
