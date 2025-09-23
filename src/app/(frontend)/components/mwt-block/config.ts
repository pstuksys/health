import type { Field } from 'payload'

export const mwtBlockFields: Field[] = [
  { name: 'heroTitle', type: 'text', defaultValue: 'Maintenance of Wakefulness Test' },
  { name: 'heroSubtitle', type: 'textarea' },
  {
    name: 'whatIsTitle',
    type: 'text',
    defaultValue: 'What is a Maintenance of Wakefulness Test (MWT)?',
  },
  { name: 'whatIsRichText', type: 'richText' },
  {
    name: 'importanceTitle',
    type: 'text',
    defaultValue: 'The Importance of Maintenance of Wakefulness Test',
  },
  { name: 'importanceIntroRichText', type: 'richText' },
  {
    name: 'testBenefits',
    type: 'array',
    fields: [{ name: 'text', type: 'text' }],
    defaultValue: [
      { text: 'Objective measure of daytime alertness' },
      { text: 'Evaluation of current treatment effectiveness' },
      { text: 'Fitness to drive assessment' },
      { text: 'Suitability for safety-critical roles' },
      { text: 'Evidence-based decisions for ongoing care' },
    ],
  },
  { name: 'whyCardTitle', type: 'text', defaultValue: 'Why is MWT Important?' },
  {
    name: 'whyCardDescription',
    type: 'text',
    defaultValue: 'Results can inform critical decisions about your daily life and safety',
  },
  { name: 'whoTitle', type: 'text', defaultValue: 'Do I need a Maintenance of Wakefulness Test?' },
  { name: 'whoRichText', type: 'richText' },
  {
    name: 'happensTitle',
    type: 'text',
    defaultValue: 'What Happens During a Maintenance of Wakefulness Test?',
  },
  { name: 'happensIntroRichText', type: 'richText' },
  {
    name: 'testSteps',
    type: 'array',
    fields: [
      { name: 'title', type: 'text' },
      { name: 'description', type: 'textarea' },
    ],
    defaultValue: [
      {
        title: '40-Minute Sessions',
        description:
          'Remain awake for up to 40 minutes per session while seated comfortably in a dim, quiet room.',
      },
      {
        title: 'Non-invasive Monitoring',
        description:
          'Sensors record brain activity (EEG), eye movements (EOG), and muscle tone (EMG).',
      },
      {
        title: 'Sleep Onset Recording',
        description:
          'Session ends at sleep onset; time to sleep is recorded for objective measurement.',
      },
    ],
  },
  { name: 'happensDetailRichText', type: 'richText' },
  {
    name: 'ipdTitle',
    type: 'text',
    defaultValue: 'How and where IPD performs the Maintenance of Wakefulness Test?',
  },
  { name: 'ipdRichText', type: 'richText' },
  { name: 'ctaTitle', type: 'text', defaultValue: 'Expert sleep testing with IPD' },
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
