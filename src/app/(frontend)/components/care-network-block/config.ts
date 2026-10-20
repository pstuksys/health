import type { Field } from 'payload'
import { createIconSelectField } from '@/lib/icons/icon-map'

export const careNetworkBlockFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    defaultValue: 'A multidisciplinary approach to your care',
  },
  {
    name: 'description',
    type: 'textarea',
    defaultValue: 'We work with a trusted network of specialists, including:',
  },
  {
    name: 'specialists',
    type: 'array',
    maxRows: 10,
    admin: { description: 'Shown in a circle around the centre (up to 10)' },
    fields: [
      { name: 'label', type: 'text', required: true },
      createIconSelectField({
        name: 'icon',
        label: 'Icon',
        description: 'Pick an icon for this specialist',
      }),
    ],
    defaultValue: [
      { label: 'Respiratory physicians', icon: 'Wind' },
      { label: 'Neurologists', icon: 'Brain' },
      { label: 'ENT specialists', icon: 'Ear' },
      { label: 'Paediatricians', icon: 'Baby' },
      { label: 'Other specialists as needed', icon: 'Users' },
      { label: 'Orthodontists and dental sleep specialists', icon: 'Smile' },
      { label: 'Psychiatrists', icon: 'BrainCog' },
    ],
  },
]
