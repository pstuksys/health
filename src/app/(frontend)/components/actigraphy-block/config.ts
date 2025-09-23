import type { Field } from 'payload'

export const actigraphyBlockFields: Field[] = [
  { name: 'heroTitle', type: 'text', defaultValue: 'Actigraphy Sleep Testing' },
  { name: 'heroSubtitle', type: 'textarea' },
  { name: 'whatIsTitle', type: 'text', defaultValue: 'What is Actigraphy?' },
  { name: 'whatIsRichText', type: 'richText' },
  { name: 'whyTitle', type: 'text', defaultValue: 'Why Choose Actigraphy?' },
  { name: 'whyIntroRichText', type: 'richText' },
  {
    name: 'reasons',
    type: 'array',
    fields: [
      { name: 'title', type: 'text' },
      { name: 'description', type: 'textarea' },
    ],
    defaultValue: [
      {
        title: 'Insomnia Assessment',
        description: 'Evaluate trouble falling and staying asleep over extended periods.',
      },
      {
        title: 'Circadian Rhythm Disorders',
        description: 'Identify patterns in conditions like Delayed Sleep Phase Syndrome.',
      },
      {
        title: 'Lifestyle Sleep Disruption',
        description: 'Monitor sleep issues linked to stress, shift work, or lifestyle changes.',
      },
      {
        title: 'Pediatric Sleep Issues',
        description: 'Long-term observation of sleep patterns in children.',
      },
      {
        title: 'Treatment Monitoring',
        description: 'Track sleep patterns before or after treatment interventions.',
      },
    ],
  },
  {
    name: 'features',
    type: 'array',
    fields: [{ name: 'text', type: 'text' }],
    defaultValue: [
      { text: 'Wear the device 24/7 for one to two weeks' },
      { text: 'Continue your usual daily routines while monitoring' },
      { text: 'Keep a detailed sleep diary during the monitoring period' },
      { text: 'Painless, portable, and suitable for adults and children' },
      { text: 'Data analysis by experienced physiologists' },
      { text: 'Results reviewed by UK-based consultant sleep physicians' },
    ],
  },
  { name: 'ipdTitle', type: 'text', defaultValue: 'Clinically Led, Conveniently Delivered' },
  { name: 'ipdRichText', type: 'richText' },
  { name: 'ctaTitle', type: 'text', defaultValue: 'Start Your Actigraphy Assessment Today' },
  { name: 'ctaDescription', type: 'richText' },
  {
    name: 'ctaPrimary',
    type: 'group',
    fields: [
      { name: 'label', type: 'text' },
      {
        name: 'linkType',
        type: 'select',
        options: ['internal', 'external'],
        defaultValue: 'internal',
      },
      {
        name: 'internal',
        type: 'group',
        admin: { condition: (_, s) => s?.linkType === 'internal' },
        fields: [{ name: 'relation', type: 'relationship', relationTo: ['pages', 'blogs'] }],
      },
      {
        name: 'external',
        type: 'group',
        admin: { condition: (_, s) => s?.linkType === 'external' },
        fields: [{ name: 'href', type: 'text' }],
      },
    ],
  },
  {
    name: 'ctaSecondary',
    type: 'group',
    fields: [
      { name: 'label', type: 'text' },
      {
        name: 'linkType',
        type: 'select',
        options: ['internal', 'external'],
        defaultValue: 'external',
      },
      {
        name: 'internal',
        type: 'group',
        admin: { condition: (_, s) => s?.linkType === 'internal' },
        fields: [{ name: 'relation', type: 'relationship', relationTo: ['pages', 'blogs'] }],
      },
      {
        name: 'external',
        type: 'group',
        admin: { condition: (_, s) => s?.linkType === 'external' },
        fields: [{ name: 'href', type: 'text' }],
      },
    ],
  },
  { name: 'ctaImage', type: 'upload', relationTo: 'media' },
]
