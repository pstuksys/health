import type { Field } from 'payload'

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
  {
    name: 'linkType',
    type: 'radio',
    required: true,
    defaultValue: 'external',
    options: [
      { label: 'Internal', value: 'internal' },
      { label: 'External', value: 'external' },
    ],
    admin: {
      description: 'Choose whether to link to an internal page or external URL',
    },
  },
  {
    name: 'internal',
    type: 'group',
    admin: {
      condition: (_, siblingData) => siblingData?.linkType === 'internal',
    },
    fields: [
      {
        name: 'relationTo',
        type: 'select',
        required: true,
        options: [
          { label: 'Page', value: 'pages' },
          { label: 'Blog', value: 'blogs' },
        ],
        admin: {
          description: 'Type of content to link to',
        },
      },
      {
        name: 'value',
        type: 'text',
        required: true,
        admin: {
          description: 'Slug of the page or blog to link to',
        },
      },
    ],
  },
  {
    name: 'external',
    type: 'group',
    admin: {
      condition: (_, siblingData) => siblingData?.linkType === 'external',
    },
    fields: [
      {
        name: 'href',
        type: 'text',
        required: true,
        admin: {
          description: 'External URL (e.g., https://example.com)',
        },
      },
    ],
  },
]
