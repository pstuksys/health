import type { Field } from 'payload'
import { createIconSelectField } from '@/lib/icons/icon-map'

export const splitInfoGridBlockFields: Field[] = [
  {
    name: 'leftTitle',
    type: 'text',
    defaultValue: 'What Is This Section?',
  },
  {
    name: 'leftRichText',
    type: 'richText',
  },
  {
    name: 'rightItems',
    type: 'array',
    fields: [
      { name: 'label', type: 'text' },
      createIconSelectField({
        name: 'icon',
        label: 'Icon',
        description: 'Pick an icon for this item',
      }),
    ],
    defaultValue: [
      { label: 'Brain Activity', icon: 'Brain' },
      { label: 'Eye Movement', icon: 'Activity' },
      { label: 'Heart Rate', icon: 'Heart' },
      { label: 'Breathing', icon: 'Stethoscope' },
    ],
  },
]
