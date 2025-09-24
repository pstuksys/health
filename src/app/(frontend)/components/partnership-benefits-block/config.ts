import type { Field } from 'payload'

export const partnershipBenefitsBlockFields: Field[] = [
  { name: 'title', type: 'text', required: true, defaultValue: 'Why partner with us' },
  {
    name: 'benefits',
    type: 'array',
    minRows: 1,
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea' },
    ],
    defaultValue: [
      {
        title: 'Fast onboarding',
        description: 'Get started quickly with our streamlined process.',
      },
      { title: 'Dedicated support', description: 'We provide hands-on support for your team.' },
      {
        title: 'Scalable solutions',
        description: 'Grow with confidence using our scalable platform.',
      },
    ],
  },
  { name: 'image', type: 'upload', relationTo: 'media' },
]
