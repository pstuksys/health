import type { Field } from 'payload'

export const sleepApneaAboutHSTFields: Field[] = [
  { name: 'title', type: 'text', defaultValue: 'About the IPD Home Sleep Apnoea Test' },
  {
    name: 'subtitle',
    type: 'textarea',
    defaultValue:
      'A simple, comfortable home test designed for high diagnostic quality. Every result is clinically reviewed and signed off by a UK-based Consultant Sleep Physician.',
  },
  {
    name: 'steps',
    type: 'array',
    fields: [
      { name: 'number', type: 'text' },
      { name: 'text', type: 'text' },
    ],
    defaultValue: [
      { number: '1', text: 'Be booked, device dispatched the next working day' },
      { number: '2', text: 'Delivered directly to your door (fits through letter box)' },
      { number: '3', text: 'Simple instructions and IPD remote support' },
      { number: '4', text: 'Test takes place over two nights to gather more data' },
      { number: '5', text: 'Arrange the return of the device' },
      {
        number: '6',
        text: 'Reviewed by IPD clinician and UK based Consultant Sleep Physician – recommendations provided for next steps',
      },
    ],
  },
  {
    name: 'booking',
    type: 'group',
    fields: [
      { name: 'title', type: 'text', defaultValue: 'Book your appointment' },
      {
        name: 'options',
        type: 'array',
        fields: [{ name: 'value', type: 'text' }],
        defaultValue: [
          { value: 'Home Sleep Apnoea Test (HST)' },
          { value: 'Respiratory Polygraphy (RP)' },
          { value: 'Video Polysomnography (vPSG)' },
        ],
      },
      { name: 'submitText', type: 'text', defaultValue: 'Book Appointment' },
      {
        name: 'note',
        type: 'textarea',
        defaultValue: "We'll confirm availability and next steps by email or phone.",
      },
    ],
  },
]
