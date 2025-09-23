import type { Field } from 'payload'

export const cpapBlockFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    label: 'Main Title',
    defaultValue: 'Choose Your CPAP Therapy Option',
    admin: {
      description: 'Main heading for the CPAP comparison section',
    },
  },
  {
    name: 'subtitle',
    type: 'textarea',
    label: 'Subtitle',
    defaultValue:
      'Professional sleep therapy solutions with comprehensive support from certified Clinical Sleep Physiologists',
    admin: {
      description: 'Subtitle text displayed below the main title',
    },
  },
]
