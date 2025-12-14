import type { Field } from 'payload'
import { createLinkFields } from '@/lib/fields/link'

export const buttonFields: Field[] = [
  {
    name: 'label',
    type: 'text',
    required: true,
    admin: {
      description: 'Text displayed on the button',
    },
  },
  {
    name: 'variant',
    type: 'select',
    required: true,
    defaultValue: 'primary',
    options: [
      { label: 'Primary', value: 'primary' },
      { label: 'Secondary', value: 'secondary' },
      { label: 'Outline', value: 'outline' },
      { label: 'Ghost', value: 'ghost' },
      { label: 'Default', value: 'default' },
    ],
    admin: {
      description: 'Button style variant',
    },
  },
  {
    name: 'size',
    type: 'select',
    required: true,
    defaultValue: 'md',
    options: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
    ],
    admin: {
      description: 'Control the button dimensions',
    },
  },
  {
    name: 'position',
    type: 'select',
    required: true,
    defaultValue: 'center',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ],
    admin: {
      description: 'Align the button inside its section',
    },
  },
  {
    name: 'spacing',
    type: 'select',
    required: true,
    defaultValue: 'md',
    options: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
    ],
    admin: {
      description: 'Spacing maps to py-6, py-12, py-16, or py-32.',
    },
  },
  ...createLinkFields({
    defaultValue: 'external',
    description: 'Choose whether to link to an internal page or external URL',
  }),
]
