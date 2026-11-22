import type { Field } from 'payload'
import { BOOKING_MODAL_HASH } from '@/lib/booking-modal'

export const questionnaireBlockFields: Field[] = [
  {
    name: 'questionnaire',
    type: 'relationship',
    relationTo: 'questionnaires',
    required: true,
    admin: {
      description:
        'The questions and results to show. Pick one, or create a new one under Questionnaires first.',
    },
  },
  {
    name: 'title',
    type: 'text',
    defaultValue: 'Free sleep screener',
    admin: { description: 'Heading shown above the questions.' },
  },
  {
    name: 'description',
    type: 'textarea',
    defaultValue:
      'Answer a few quick questions to find out whether your symptoms may be linked to a sleep disorder. It takes less than a minute.',
    admin: { description: 'Short intro under the heading: what this is and how long it takes.' },
  },
  {
    name: 'cta',
    label: 'Call to action button',
    type: 'group',
    admin: {
      description:
        'The button visitors see next to their result, e.g. "Book a call with our doctor". Leave the button text empty to hide the button.',
    },
    fields: [
      {
        name: 'label',
        label: 'Button text',
        type: 'text',
        defaultValue: 'Book a call with our doctor',
      },
      {
        name: 'linkType',
        label: 'Where the button goes',
        type: 'radio',
        defaultValue: 'external',
        options: [
          { label: 'A page on this site', value: 'internal' },
          { label: 'A web address (or the booking pop-up)', value: 'external' },
        ],
      },
      {
        name: 'internal',
        label: false,
        type: 'group',
        admin: { condition: (_, siblingData) => siblingData?.linkType === 'internal' },
        fields: [
          {
            name: 'relation',
            label: 'Page',
            type: 'relationship',
            relationTo: ['pages', 'blogs'],
            admin: { description: 'Page or blog post the button opens.' },
          },
        ],
      },
      {
        name: 'external',
        label: false,
        type: 'group',
        admin: { condition: (_, siblingData) => siblingData?.linkType === 'external' },
        fields: [
          {
            name: 'href',
            label: 'Web address',
            type: 'text',
            defaultValue: BOOKING_MODAL_HASH,
            admin: {
              description: `Full address such as https://example.com. Keep ${BOOKING_MODAL_HASH} to open the "Book a video consultation" pop-up instead.`,
            },
          },
        ],
      },
    ],
  },
  {
    name: 'disclaimer',
    type: 'textarea',
    defaultValue:
      'This screener is not a diagnosis. Your answers stay in your browser and are not stored or sent anywhere.',
    admin: {
      description:
        'Small print under the questionnaire. Use it to reassure visitors: this is not a medical diagnosis, and their answers are not saved, sent or tracked (true for every questionnaire on this site). Leave empty to hide it, though keeping it is recommended.',
    },
  },
]
