import type { Field } from 'payload'

export const msltBlockFields: Field[] = [
  { name: 'heroTitle', type: 'text', defaultValue: 'Multiple Sleep Latency Test' },
  { name: 'heroSubtitle', type: 'textarea' },
  { name: 'whatIsTitle', type: 'text', defaultValue: 'What is the MSLT?' },
  { name: 'whatIsRichText', type: 'richText' },
  { name: 'involveTitle', type: 'text', defaultValue: 'What Does the MSLT Involve?' },
  { name: 'involveIntroRichText', type: 'richText' },
  {
    name: 'testSteps',
    type: 'array',
    fields: [
      { name: 'title', type: 'text' },
      { name: 'description', type: 'textarea' },
    ],
    defaultValue: [
      {
        title: 'Dark, Quiet Environment',
        description: 'Lie in a comfortable, controlled room designed for sleep testing.',
      },
      {
        title: 'Brain Activity Monitoring',
        description: 'EEG, EOG, and EMG sensors track your sleep patterns and REM onset.',
      },
      {
        title: 'Timed Sleep Trials',
        description: 'Five nap opportunities spaced two hours apart throughout the day.',
      },
      {
        title: 'Sleep Latency Measurement',
        description: 'Precise timing of how quickly you fall asleep in each trial.',
      },
    ],
  },
  { name: 'involveDetailRichText', type: 'richText' },
  { name: 'whyTitle', type: 'text', defaultValue: 'Why Is the MSLT Important?' },
  { name: 'whyIntroRichText', type: 'richText' },
  {
    name: 'conditions',
    type: 'array',
    fields: [{ name: 'text', type: 'text' }],
    defaultValue: [
      { text: 'Narcolepsy Type 1 and Type 2' },
      { text: 'Idiopathic hypersomnia' },
      { text: 'Excessive daytime sleepiness assessment' },
      { text: 'Sleep attack evaluation' },
      { text: 'REM sleep behavior analysis' },
    ],
  },
  { name: 'whoTitle', type: 'text', defaultValue: 'Who Should Be Referred for a MSLT?' },
  {
    name: 'symptoms',
    type: 'array',
    fields: [{ name: 'text', type: 'text' }],
    defaultValue: [
      { text: 'Ongoing daytime sleepiness despite adequate sleep' },
      { text: 'Sudden episodes of falling asleep ("sleep attacks")' },
      { text: 'Suspected narcolepsy with cataplexy, sleep paralysis, or vivid hallucinations' },
      { text: "Severe, unexplained fatigue that hasn't improved with treatment" },
      { text: 'Unrefreshing sleep and ongoing daytime fatigue' },
    ],
  },
  { name: 'whoConclusionRichText', type: 'richText' },
  { name: 'ipdTitle', type: 'text', defaultValue: 'Where and How IPD Performs the MSLT' },
  { name: 'ipdRichText', type: 'richText' },
  { name: 'ctaTitle', type: 'text', defaultValue: 'Expert Sleep Diagnostics from IPD' },
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
