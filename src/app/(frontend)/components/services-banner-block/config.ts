import type { Field } from 'payload'

export const servicesBannerBlockFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: false,
    admin: { description: 'Main heading for the services banner section' },
  },
  {
    name: 'subtitle',
    type: 'text',
    required: false,
    admin: { description: 'Small subtitle text above the main title' },
  },
  {
    name: 'backgroundImage',
    type: 'upload',
    relationTo: 'media',
    required: false,
    admin: { description: 'Background image for the section (optional)' },
  },
  {
    name: 'backgroundColor',
    type: 'select',
    defaultValue: 'slate-800',
    options: [
      { label: 'Slate 800', value: 'slate-800' },
      { label: 'Dark Blue', value: 'ds-dark-blue' },
      { label: 'Pastille Green', value: 'ds-pastille-green' },
      { label: 'Gray 900', value: 'gray-900' },
      { label: 'Blue 900', value: 'blue-900' },
    ],
    admin: { description: 'Background color for the section' },
  },
  {
    name: 'textColor',
    type: 'select',
    defaultValue: 'white',
    options: [
      { label: 'White', value: 'white' },
      { label: 'Light Gray', value: 'gray-100' },
      { label: 'Dark Blue', value: 'ds-dark-blue' },
    ],
    admin: { description: 'Text color for the section' },
  },
  {
    name: 'overlayDarkness',
    type: 'select',
    defaultValue: 'medium',
    options: [
      { label: 'None', value: 'none' },
      { label: 'Light (10%)', value: 'light' },
      { label: 'Medium (30%)', value: 'medium' },
      { label: 'Dark (50%)', value: 'dark' },
      { label: 'Very Dark (70%)', value: 'very-dark' },
    ],
    admin: {
      description:
        'Darkness of overlay when background image is present (for better text readability)',
    },
  },
  {
    name: 'options',
    type: 'array',
    required: true,
    minRows: 1,
    maxRows: 3,
    admin: { description: 'Service option cards (1-3 options)' },
    fields: [
      {
        name: 'icon',
        type: 'select',
        defaultValue: 'calendar',
        options: [
          { label: 'Calendar', value: 'calendar' },
          { label: 'Settings', value: 'settings' },
          { label: 'Shield', value: 'shield' },
        ],
        admin: { description: 'Icon for this service option' },
      },
      {
        name: 'title',
        type: 'text',
        required: true,
        admin: { description: 'Title for this service option' },
      },
      {
        name: 'description',
        type: 'textarea',
        required: true,
        admin: { description: 'Description text for this service option' },
      },
      {
        name: 'buttonText',
        type: 'text',
        defaultValue: 'LEARN MORE',
        admin: { description: 'Text for the call-to-action button' },
      },
      {
        name: 'link',
        type: 'group',
        required: false,
        admin: { description: 'Link configuration for this service option' },
        fields: [
          {
            name: 'linkType',
            type: 'radio',
            defaultValue: 'internal',
            options: [
              { label: 'Internal', value: 'internal' },
              { label: 'External', value: 'external' },
            ],
          },
          {
            name: 'internal',
            type: 'group',
            admin: { condition: (_, siblingData) => siblingData?.linkType === 'internal' },
            fields: [
              {
                name: 'relation',
                type: 'relationship',
                relationTo: ['pages', 'blogs'],
                required: true,
              },
            ],
          },
          {
            name: 'external',
            type: 'group',
            admin: { condition: (_, siblingData) => siblingData?.linkType === 'external' },
            fields: [
              {
                name: 'href',
                type: 'text',
                required: true,
                admin: { description: 'External URL (e.g., https://example.com)' },
              },
            ],
          },
        ],
      },
    ],
  },
]
