import type { Field } from 'payload'

export const respiratoryPolygrophyBlockFields: Field[] = [
  { name: 'heroTitle', type: 'text', defaultValue: 'Respiratory Polygraphy' },
  { name: 'heroSubtitle', type: 'textarea' },
  {
    name: 'heroPrimary',
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
    name: 'heroSecondary',
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
  { name: 'whatIsTitle', type: 'text', defaultValue: 'What Does Respiratory Polygraphy Involve?' },
  { name: 'whatIsParagraph1', type: 'textarea' },
  { name: 'whatIsParagraph2', type: 'textarea' },
  { name: 'measuresTitle', type: 'text', defaultValue: 'What We Monitor During Your Sleep' },
  {
    name: 'testMeasures',
    type: 'array',
    fields: [
      { name: 'icon', type: 'text' },
      { name: 'title', type: 'text' },
      { name: 'description', type: 'text' },
    ],
    defaultValue: [
      { icon: 'stethoscope', title: 'Airflow', description: 'Through your nose and mouth' },
      { icon: 'heart', title: 'Breathing Effort', description: 'Chest and abdominal movement' },
      { icon: 'moon', title: 'Oxygen Levels', description: 'SpO₂ saturation monitoring' },
      { icon: 'heart', title: 'Heart Rate', description: 'Continuous cardiac monitoring' },
      { icon: 'home', title: 'Sleep Position', description: 'Body position and snoring sounds' },
    ],
  },
  { name: 'whyTitle', type: 'text', defaultValue: 'Why Is Respiratory Polygraphy Used?' },
  { name: 'whyParagraph1', type: 'textarea' },
  { name: 'whyParagraph2', type: 'textarea' },
  {
    name: 'whoTitle',
    type: 'text',
    defaultValue: 'Who Should Have a Respiratory Polygraphy Test?',
  },
  { name: 'whoIntro', type: 'textarea' },
  { name: 'symptoms', type: 'array', fields: [{ name: 'text', type: 'text' }] },
  { name: 'howTitle', type: 'text', defaultValue: 'How Is the Test Performed?' },
  { name: 'howParagraph1', type: 'textarea' },
  { name: 'howParagraph2', type: 'textarea' },
  { name: 'benefits', type: 'array', fields: [{ name: 'text', type: 'text' }] },
  { name: 'ctaTitle', type: 'text', defaultValue: 'Expert Sleep Assessment, Delivered to You' },
  { name: 'ctaParagraph1', type: 'textarea' },
  { name: 'ctaParagraph2', type: 'textarea' },
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
]
