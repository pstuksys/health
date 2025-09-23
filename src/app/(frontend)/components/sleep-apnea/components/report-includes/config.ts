import type { Field } from 'payload'

export const sleepApneaReportIncludesFields: Field[] = [
  { name: 'title', type: 'text', defaultValue: 'What Your Report Includes' },
  {
    name: 'features',
    type: 'array',
    fields: [
      { name: 'text', type: 'text', required: true },
      { name: 'wide', type: 'checkbox', defaultValue: false },
    ],
    defaultValue: [
      { text: 'Diagnosis and severity of sleep apnoea' },
      { text: 'Apnoea-Hypopnoea Index (AHI)' },
      { text: 'Oxygen Desaturation Index (ODI)' },
      { text: 'Sleep time estimates' },
      { text: 'Classification of apnoea events' },
      { text: 'Respiratory and cardiac feature analysis', wide: true },
    ],
  },
  {
    name: 'reviewCard',
    type: 'group',
    fields: [
      { name: 'title', type: 'text' },
      { name: 'text', type: 'textarea' },
    ],
    defaultValue: {
      title: 'Expert Clinical Review',
      text: 'Every test is reviewed by IPD clinicians and signed off by a UK-based Consultant Sleep Physician to ensure accurate diagnosis and clear interpretation.',
    },
  },
]
