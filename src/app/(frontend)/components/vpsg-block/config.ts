import type { Field } from 'payload'

export const vpsgBlockFields: Field[] = [
  { name: 'heroTitle', type: 'text', defaultValue: 'Video Polysomnography' },
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
  { name: 'whatIsTitle', type: 'text', defaultValue: 'What Is Video Polysomnography?' },
  { name: 'whatIsRichText', type: 'richText' },
  {
    name: 'monitoringAspects',
    type: 'array',
    fields: [{ name: 'label', type: 'text' }],
    defaultValue: [
      { label: 'Brain activity (EEG)' },
      { label: 'Eye movements (EOG)' },
      { label: 'Muscle tone and leg movements (EMG)' },
      { label: 'Heart rate and rhythm (ECG)' },
      { label: 'Breathing patterns and oxygen levels' },
      { label: 'Snoring sounds and airflow' },
      { label: 'Body position and movements' },
      { label: 'High-definition video throughout the night' },
    ],
  },
  { name: 'whyTitle', type: 'text', defaultValue: 'Why Is It the Gold Standard?' },
  { name: 'whyIntroRichText', type: 'richText' },
  {
    name: 'whyCards',
    type: 'array',
    fields: [
      { name: 'title', type: 'text' },
      { name: 'text', type: 'textarea' },
    ],
    defaultValue: [
      {
        title: 'Comprehensive Detection',
        text: 'Detects subtle disturbances that simpler home sleep studies may miss',
      },
      {
        title: 'Real-time Correlation',
        text: 'Synchronises detailed physiological data with high-definition video for accurate diagnosis',
      },
      {
        title: 'Complex Cases',
        text: 'Essential for investigating complex movements, neurological conditions, or safety concerns',
      },
    ],
  },
  { name: 'conditionsTitle', type: 'text', defaultValue: 'When Is vPSG Recommended?' },
  {
    name: 'conditions',
    type: 'array',
    fields: [{ name: 'text', type: 'text' }],
    defaultValue: [
      { text: 'Parasomnias (sleepwalking, night terrors, REM sleep behaviour disorder)' },
      { text: 'Sleep apnoea' },
      { text: 'Insomnia' },
      { text: 'Narcolepsy and hypersomnia' },
      { text: 'Unusual or disruptive sleep behaviours' },
      { text: 'Suspected sleep disorders in children' },
      { text: 'Respiratory conditions needing detailed overnight evaluation' },
    ],
  },
  { name: 'ctaBgImage', type: 'upload', relationTo: 'media' },
  { name: 'ctaTitle', type: 'text', defaultValue: 'Expert Care in Clinical Settings or Your Home' },
  { name: 'ctaLeftRichText', type: 'richText' },
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
