import type { Field } from 'payload'

export const splitInfoListBlockFields: Field[] = [
  { name: 'leftTitle', type: 'text', defaultValue: 'When Is This Recommended?' },
  { name: 'leftRichText', type: 'richText' },
  {
    name: 'listItems',
    type: 'array',
    fields: [{ name: 'text', type: 'text' }],
    defaultValue: [
      { text: 'When other tests are inconclusive' },
      { text: 'When multi-system assessment is needed' },
      { text: 'When symptoms persist despite initial treatment' },
    ],
  },
]
