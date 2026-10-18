import type { Field } from 'payload'
import { createIconSelectField } from '@/lib/icons/icon-map'

export const iconRowBlockFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    defaultValue: 'Common symptoms',
  },
  {
    name: 'description',
    type: 'textarea',
  },
  {
    name: 'showSteps',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      description: 'Number the items and show arrows between them (for step-by-step processes)',
    },
  },
  {
    name: 'items',
    type: 'array',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea' },
      createIconSelectField({
        name: 'icon',
        label: 'Icon',
        description: 'Pick an icon for this item',
      }),
    ],
    defaultValue: [
      { title: 'Snoring', icon: 'Bed' },
      { title: 'Breathing pauses during sleep', icon: 'Wind' },
      { title: 'Difficulty getting to sleep', icon: 'Moon' },
      { title: 'Waking up tired', icon: 'Sunrise' },
    ],
  },
]
