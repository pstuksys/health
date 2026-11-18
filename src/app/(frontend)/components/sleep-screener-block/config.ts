import type { Field } from 'payload'
import { BOOKING_MODAL_HASH } from '@/lib/booking-modal'

export const sleepScreenerBlockFields: Field[] = [
  {
    name: 'questionnaire',
    type: 'relationship',
    relationTo: 'questionnaires',
    required: true,
    admin: {
      description: 'Pick a questionnaire, or create a new one under Questionnaires.',
    },
  },
  {
    name: 'title',
    type: 'text',
    defaultValue: 'Free sleep screener',
  },
  {
    name: 'description',
    type: 'textarea',
    defaultValue:
      'Answer a few quick questions to find out whether your symptoms may be linked to a sleep disorder. It takes less than a minute.',
  },
  {
    name: 'cta',
    type: 'group',
    admin: { description: 'Button shown with the result' },
    fields: [
      { name: 'label', type: 'text', defaultValue: 'Book a call with our doctor' },
      {
        name: 'href',
        type: 'text',
        defaultValue: BOOKING_MODAL_HASH,
        admin: {
          description: `Use ${BOOKING_MODAL_HASH} to open the booking modal, or any page/URL.`,
        },
      },
    ],
  },
  {
    name: 'disclaimer',
    type: 'textarea',
    defaultValue:
      'This screener is not a diagnosis. Your answers stay in your browser and are not stored or sent anywhere.',
  },
]
