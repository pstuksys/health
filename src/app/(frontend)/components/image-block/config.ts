import type { Field } from 'payload'

export const imageBlockFields: Field[] = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'Select an image to display',
    },
  },
  {
    name: 'size',
    type: 'select',
    label: 'Image Size',
    options: [
      { label: 'Small (200x200px max)', value: 'small' },
      { label: 'Medium (400x300px max)', value: 'medium' },
      { label: 'Large (600x400px max)', value: 'large' },
    ],
    defaultValue: 'small',
    admin: {
      description: 'Choose the maximum size for the image',
    },
  },
  {
    name: 'alignment',
    type: 'select',
    label: 'Alignment',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ],
    defaultValue: 'center',
    admin: {
      description: 'How to align the image within its container',
    },
  },
]
