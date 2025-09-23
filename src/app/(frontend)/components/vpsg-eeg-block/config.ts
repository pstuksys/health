import type { Field } from 'payload'

export const vpsgEegBlockFields: Field[] = [
  { name: 'heroTitle', type: 'text', defaultValue: 'Combined Video Polysomnography' },
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
  {
    name: 'importanceTitle',
    type: 'text',
    defaultValue: 'Importance of Combined vPSG with Full EEG',
  },
  { name: 'importanceRichText', type: 'richText' },
  { name: 'whenTitle', type: 'text', defaultValue: 'When Should I Take This Test?' },
  { name: 'whenIntroRichText', type: 'richText' },
  { name: 'whenReasons', type: 'array', fields: [{ name: 'text', type: 'text' }] },
  { name: 'measuresTitle', type: 'text', defaultValue: 'What the Test Measures' },
  { name: 'measuresIntroRichText', type: 'richText' },
  {
    name: 'measures',
    type: 'array',
    fields: [
      { name: 'category', type: 'text' },
      { name: 'description', type: 'textarea' },
    ],
  },
  { name: 'measuresFootnoteRichText', type: 'richText' },
  { name: 'howTitle', type: 'text', defaultValue: 'How the Test Is Performed' },
  {
    name: 'howSteps',
    type: 'array',
    fields: [
      { name: 'title', type: 'text' },
      { name: 'description', type: 'textarea' },
    ],
  },
  { name: 'reportingTitle', type: 'text', defaultValue: 'Comprehensive Reporting' },
  { name: 'reportingText', type: 'textarea' },
  {
    name: 'whyChooseTitle',
    type: 'text',
    defaultValue: 'Why Choose IPD for Combined vPSG with Full EEG?',
  },
  { name: 'whyChoose', type: 'array', fields: [{ name: 'text', type: 'text' }] },
  { name: 'ctaBgImage', type: 'upload', relationTo: 'media' },
  {
    name: 'ctaTitle',
    type: 'text',
    defaultValue: 'Why Choose IPD for Combined vPSG with Full EEG?',
  },
  { name: 'ctaRightTopRichText', type: 'richText' },
  { name: 'ctaRightBottomRichText', type: 'richText' },
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
