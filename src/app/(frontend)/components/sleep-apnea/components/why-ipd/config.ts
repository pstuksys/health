import type { Field } from 'payload'

export const sleepApneaWhyIPDFields: Field[] = [
  { name: 'title', type: 'text', defaultValue: 'Why Choose IPD?' },
  {
    name: 'subtitle',
    type: 'textarea',
    defaultValue:
      'Experience the difference that expertise and personalized care can make in your sleep health journey',
  },
  {
    name: 'items',
    type: 'array',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'text', type: 'textarea' },
      { name: 'wide', type: 'checkbox', defaultValue: false },
    ],
    defaultValue: [
      {
        title: 'Led by experienced sleep professionals',
        text: 'Expert clinicians with specialized training',
      },
      { title: 'Fast access and responsive care', text: 'Quick assessment and immediate support' },
      {
        title: 'Clinically backed, medication-free treatment',
        text: 'Evidence-based approach without side effects',
      },
      { title: 'Emphasis on long-term sleep health', text: 'Sustainable improvements that last' },
      {
        title: 'Trusted by NHS and private referrers nationwide',
        text: 'Recognized quality and reliability',
        wide: true,
      },
    ],
  },
]
