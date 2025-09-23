import type { Field } from 'payload'

export const cbtiBlockFields: Field[] = [
  { name: 'heroTitle', type: 'text', defaultValue: 'Cognitive Behavioural Therapy for Insomnia' },
  { name: 'heroSubtitle', type: 'textarea' },
  {
    name: 'whatIsTitle',
    type: 'text',
    defaultValue: 'What is CBTi?',
  },
  { name: 'whatIsRichText', type: 'richText' },
  {
    name: 'programTitle',
    type: 'text',
    defaultValue: 'Our CBTi Programme',
  },
  { name: 'programIntroRichText', type: 'richText' },
  {
    name: 'programFeatures',
    type: 'array',
    fields: [{ name: 'text', type: 'text' }],
    defaultValue: [
      { text: 'Initial assessment within 24 hours of referral' },
      { text: 'One-to-one therapy sessions tailored to your needs' },
      { text: 'Secure patient portal for resources and communication' },
      { text: 'Ongoing progress tracking using sleep diaries' },
      { text: 'Continuous support throughout your programme' },
    ],
  },
  {
    name: 'techniques',
    type: 'array',
    fields: [
      { name: 'title', type: 'text' },
      { name: 'description', type: 'textarea' },
    ],
    defaultValue: [
      { title: 'Sleep Education', description: 'Understand how sleep works and what disrupts it.' },
      { title: 'Sleep Hygiene', description: 'Build healthier evening routines.' },
      {
        title: 'Stimulus Control',
        description: 'Reconnect your bed with sleep instead of wakefulness.',
      },
      {
        title: 'Sleep Restriction',
        description: 'Align time in bed with actual sleep to improve efficiency.',
      },
      {
        title: 'Cognitive Restructuring',
        description: 'Reframe anxious or negative thoughts about sleep.',
      },
      { title: 'Relaxation Techniques', description: 'Practise deep breathing and mindfulness.' },
    ],
  },
  {
    name: 'whyTitle',
    type: 'text',
    defaultValue: 'Why Should I Do Cognitive Behavioural Therapy for Insomnia (CBTi)?',
  },
  { name: 'whyRichText', type: 'richText' },
  { name: 'ctaTitle', type: 'text', defaultValue: 'Start CBTi and Restore Restful Sleep' },
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
