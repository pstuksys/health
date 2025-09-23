import type { Field } from 'payload'

export const sleepApneaIntroStepsFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    defaultValue: 'Step 1: Getting Started – How to Get Tested for Sleep Apnoea',
  },
  {
    name: 'subtitle',
    type: 'textarea',
    defaultValue:
      'Do you snore, struggle with unrefreshing sleep, or suspect sleep apnoea? Take these two simple steps to begin your journey to better sleep:',
  },
  {
    name: 'items',
    type: 'array',
    required: true,
    minRows: 2,
    maxRows: 2,
    fields: [
      { name: 'number', type: 'text', required: true },
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea' },
      {
        name: 'linkType',
        type: 'radio',
        options: [
          { label: 'Internal', value: 'internal' },
          { label: 'External', value: 'external' },
        ],
        defaultValue: 'internal',
      },
      {
        name: 'internal',
        type: 'group',
        admin: { condition: (_, siblingData) => siblingData?.linkType === 'internal' },
        fields: [
          {
            name: 'relation',
            type: 'relationship',
            relationTo: ['pages', 'blogs'],
          },
        ],
      },
      {
        name: 'external',
        type: 'group',
        admin: { condition: (_, siblingData) => siblingData?.linkType === 'external' },
        fields: [{ name: 'href', type: 'text' }],
      },
      { name: 'buttonText', type: 'text' },
    ],
    defaultValue: [
      {
        number: '01',
        title: 'Recognise your symptoms',
        description:
          'Take our quick online sleep assessment to see if your symptoms suggest obstructive sleep apnoea.',
        linkType: 'internal',
        internal: { relation: { relationTo: 'pages', value: { slug: '' } } },
        buttonText: 'Take sleep assessment',
      },
      {
        number: '02',
        title: 'Talk to our specialist team',
        description:
          'Discuss the results and your concerns with IPD team. If the test is needed, referral can be made.',
        linkType: 'external',
        external: { href: '#' },
        buttonText: 'Book a free 10-min call',
      },
    ],
  },
]
