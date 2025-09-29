import type { Field } from 'payload'

export const cardListBannerBlockFields: Field[] = [
  { name: 'title', type: 'text', defaultValue: 'Who Should Be Referred?' },
  { name: 'introRichText', type: 'richText' },
  { name: 'conclusionRichText', type: 'richText' },
  {
    name: 'items',
    type: 'array',
    fields: [{ name: 'text', type: 'text' }],
    defaultValue: [
      { text: 'Excessive daytime sleepiness despite adequate sleep' },
      { text: 'Suspected narcolepsy or idiopathic hypersomnia' },
      { text: 'Unexplained sleep attacks affecting daily activities' },
    ],
  },
]
