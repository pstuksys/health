import type { Field } from 'payload'

export const sleepDisorderStatsCardFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    defaultValue: 'Sleep Disorder Statistics',
    admin: { description: 'Main title for the statistics card' },
  },
  {
    name: 'statisticLabel',
    type: 'text',
    defaultValue: 'Sleep Apnoea Cases Worldwide',
    admin: { description: 'Label for the statistic (e.g., "Sleep Apnoea Cases Worldwide")' },
  },
  {
    name: 'statisticValue',
    type: 'text',
    defaultValue: '1 Billion',
    admin: { description: 'The statistic value (e.g., "1 Billion", "50%", "2.5M")' },
  },
  {
    name: 'description',
    type: 'textarea',
    defaultValue:
      'Nearly one billion people worldwide live with sleep apnoea, yet many remain undiagnosed.',
    admin: { description: 'Descriptive text below the statistic' },
  },
  {
    name: 'progressPercentage',
    type: 'number',
    defaultValue: 85,
    min: 0,
    max: 100,
    admin: { description: 'Progress bar percentage (0-100)' },
  },
]
