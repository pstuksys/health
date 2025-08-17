import type { Field } from 'payload'

export const testimonialsFields: Field[] = [
  { name: 'title', type: 'text', required: true, defaultValue: 'What our clients say' },
  {
    name: 'testimonials',
    type: 'array',
    required: true,
    fields: [
      { name: 'quote', type: 'textarea', required: true },
      { name: 'author', type: 'text', required: true },
      { name: 'role', type: 'text', required: false },
    ],
  },
  { name: 'autoplayInterval', type: 'number', required: false, defaultValue: 4000, min: 1000 },
]
