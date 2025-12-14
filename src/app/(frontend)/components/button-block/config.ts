import type { Field } from 'payload'
import { createLinkFields } from '@/lib/fields/link'

const linkTypeOptions = [
  { label: 'Internal', value: 'internal' },
  { label: 'External', value: 'external' },
  { label: 'IPD referral form download', value: 'ipd-referral-form' },
]

export const buttonBlockFields: Field[] = [
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
    ],
    admin: {
      description: 'Button size',
    },
  },
  ...createLinkFields({
    defaultValue: 'external',
    linkTypeOptions,
    description:
      'Choose whether to link to an internal page, external URL, or trigger the IPD referral form download',
  }),
]
