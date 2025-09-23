import type { Field } from 'payload'

export const sleepApneaAfterTestFields: Field[] = [
  { name: 'title', type: 'text', defaultValue: 'What Happens After the Test?' },
  {
    name: 'subtitle',
    type: 'textarea',
    defaultValue:
      "If your home sleep test confirms sleep apnoea, the good news is that it's highly manageable. Getting the right diagnosis is the first step toward better sleep and long-term health.",
  },
  {
    name: 'sections',
    type: 'array',
    fields: [
      { name: 'title', type: 'text' },
      { name: 'richText', type: 'richText', required: false },
    ],
    defaultValue: [{ title: 'Treatment options' }, { title: 'Your personalised care pathway' }],
  },
]
