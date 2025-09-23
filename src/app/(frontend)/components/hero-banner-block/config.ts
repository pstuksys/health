import type { Field } from 'payload'

export const heroBannerBlockFields: Field[] = [
  { name: 'title', type: 'text', required: true, defaultValue: 'Headline goes here' },
  {
    name: 'paragraphs',
    type: 'array',
    admin: { description: 'Short supporting paragraphs' },
    fields: [{ name: 'text', type: 'text' }],
    defaultValue: [
      { text: 'Add concise marketing copy that explains the value.' },
      { text: 'Use short sentences. Keep it readable.' },
    ],
  },
  { name: 'image', type: 'upload', relationTo: 'media', required: false },
]
