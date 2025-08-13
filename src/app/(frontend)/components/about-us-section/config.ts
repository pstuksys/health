import type { Field } from 'payload'

export const aboutUsSectionFields: Field[] = [
  { name: 'title', type: 'text', required: true },
  { name: 'content', type: 'richText' },
  { name: 'image', type: 'upload', relationTo: 'media' },
  {
    name: 'ctaButton',
    type: 'group',
    fields: [
      { name: 'label', type: 'text' },
      { name: 'href', type: 'text' },
    ],
  },
]
