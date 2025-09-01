import type { Field } from 'payload'

export const testimonialsFields: Field[] = [
  { name: 'title', type: 'text', required: true, defaultValue: 'What our clients say' },
  {
    name: 'testimonialType',
    type: 'radio',
    defaultValue: 'custom',
    options: [
      { label: 'Custom Testimonials', value: 'custom' },
      { label: 'Doctify Reviews', value: 'doctify' },
    ],
  },
  {
    name: 'testimonials',
    type: 'array',
    admin: { condition: (_, siblingData) => siblingData?.testimonialType === 'custom' },
    fields: [
      { name: 'quote', type: 'textarea', required: true },
      { name: 'author', type: 'text', required: true },
      { name: 'role', type: 'text', required: false },
    ],
  },
  {
    name: 'doctifyConfig',
    type: 'group',
    admin: { condition: (_, siblingData) => siblingData?.testimonialType === 'doctify' },
    fields: [
      { name: 'widgetId', type: 'text', required: true, defaultValue: '0yewt1ji' },
      { name: 'tenant', type: 'text', required: true, defaultValue: 'athena-uk' },
      { name: 'language', type: 'text', required: true, defaultValue: 'en' },
      { name: 'profileType', type: 'text', required: true, defaultValue: 'practice' },
      { name: 'layoutType', type: 'text', required: true, defaultValue: 'layoutA' },
      {
        name: 'slugs',
        type: 'text',
        required: true,
        defaultValue: 'independent-physiological-diagnostics',
      },
      { name: 'background', type: 'text', required: true, defaultValue: 'white' },
      { name: 'itemBackground', type: 'text', required: true, defaultValue: 'ffffff' },
      { name: 'itemFrame', type: 'checkbox', defaultValue: true },
    ],
  },
  { name: 'autoplayInterval', type: 'number', required: false, defaultValue: 4000, min: 1000 },
]
