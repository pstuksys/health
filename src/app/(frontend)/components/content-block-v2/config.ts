import type { Field } from 'payload'

export const contentBlockV2Fields: Field[] = [
  {
    name: 'columns',
    type: 'array',
    minRows: 1,
    maxRows: 6,
    labels: {
      singular: 'Column',
      plural: 'Columns',
    },
    admin: {
      description: 'Add columns with different widths. They will wrap to new rows automatically.',
    },
    fields: [
      {
        name: 'width',
        type: 'select',
        required: true,
        defaultValue: 'full',
        options: [
          { label: 'Third (33%)', value: 'third' },
          { label: 'Half (50%)', value: 'half' },
          { label: 'Full (100%)', value: 'full' },
        ],
        admin: {
          description: 'Width of this column',
        },
      },
      {
        name: 'content',
        type: 'richText',
        required: true,
        admin: {
          description: 'Rich text content with full block support',
        },
      },
    ],
  },
  {
    name: 'spacing',
    type: 'select',
    defaultValue: 'md',
    options: [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
    ],
    admin: {
      description: 'Spacing between columns and rows',
    },
  },
  {
    name: 'containerPadding',
    type: 'select',
    defaultValue: 'md',
    options: [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
    ],
    admin: {
      description: 'Padding around the entire content block',
    },
  },
  {
    name: 'backgroundColor',
    type: 'select',
    defaultValue: 'transparent',
    options: [
      { label: 'Transparent', value: 'transparent' },
      { label: 'White', value: 'white' },
      { label: 'Light Gray', value: 'gray' },
      { label: 'Primary', value: 'primary' },
    ],
    admin: {
      description: 'Background color for the content block',
    },
  },
]

