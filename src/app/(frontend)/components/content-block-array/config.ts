import type { Field } from 'payload'

export const contentBlockArrayFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: false,
    admin: {
      description: 'Optional section title displayed above the content blocks',
    },
  },
  {
    name: 'layout',
    type: 'select',
    required: true,
    defaultValue: 'default',
    options: [
      { label: 'Default', value: 'default' },
      { label: 'Alternating', value: 'alternating' },
    ],
    admin: {
      description:
        'Default: Each block uses its individual image position. Alternating: Automatically alternates image position for a zigzag pattern.',
    },
  },
  {
    name: 'contentBlocks',
    type: 'array',
    required: true,
    minRows: 1,
    admin: {
      description: 'Array of content blocks to display',
    },
    fields: [
      {
        name: 'title',
        type: 'text',
        required: true,
        admin: {
          description: 'Title for this content block',
        },
      },
      {
        name: 'description',
        type: 'textarea',
        required: true,
        admin: {
          description: 'Description text for this content block',
        },
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        required: true,
        admin: {
          description: 'Image for this content block',
        },
      },
      {
        name: 'imagePosition',
        type: 'select',
        required: true,
        defaultValue: 'right',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Right', value: 'right' },
        ],
        admin: {
          description: 'Position of the image relative to the text content',
        },
      },
      {
        name: 'buttonText',
        type: 'text',
        required: false,
        admin: {
          description: 'Text for the call-to-action button (optional)',
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
          condition: (_, siblingData) => Boolean(siblingData?.buttonText),
        },
      },
      {
        name: 'internal',
        type: 'group',
        admin: {
          condition: (_, siblingData) =>
            siblingData?.linkType === 'internal' && Boolean(siblingData?.buttonText),
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
          condition: (_, siblingData) =>
            siblingData?.linkType === 'external' && Boolean(siblingData?.buttonText),
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
    ],
  },
]
