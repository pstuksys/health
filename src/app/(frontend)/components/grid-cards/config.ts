import type { Field } from 'payload'

export const gridCardsFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    defaultValue: 'Our Services',
    admin: { description: 'Main heading for the grid cards section' },
  },
  {
    name: 'subtitle',
    type: 'text',
    required: false,
    admin: { description: 'Subtitle text below the main title (optional)' },
  },
  {
    name: 'cards',
    type: 'array',
    required: true,
    minRows: 1,
    maxRows: 12,
    admin: { description: 'Grid cards (1-12 cards)' },
    fields: [
      {
        name: 'title',
        type: 'text',
        required: true,
        admin: { description: 'Title of the card' },
      },
      {
        name: 'description',
        type: 'textarea',
        required: true,
        admin: { description: 'Description of the card' },
      },
      {
        name: 'bestFor',
        type: 'textarea',
        required: false,
        admin: { description: 'What this card is best for (optional)' },
      },
      {
        name: 'badge',
        type: 'text',
        required: false,
        admin: { description: 'Badge text (e.g., Gold Standard, Featured) - optional' },
      },
      {
        name: 'buttonText',
        type: 'text',
        required: false,
        admin: {
          description:
            'Text for the button (e.g., Learn more, Book now) - leave empty to hide button',
        },
      },
      {
        name: 'linkType',
        type: 'select',
        options: [
          { label: 'Internal', value: 'internal' },
          { label: 'External', value: 'external' },
        ],
        defaultValue: 'internal',
        admin: {
          condition: (data, siblingData) =>
            siblingData?.buttonText && siblingData.buttonText.trim() !== '',
          description: 'Type of link',
        },
      },
      {
        name: 'internalLink',
        type: 'relationship',
        relationTo: 'pages',
        required: false,
        admin: {
          condition: (data, siblingData) =>
            siblingData?.buttonText &&
            siblingData.buttonText.trim() !== '' &&
            siblingData?.linkType === 'internal',
          description: 'Select a page to link to',
        },
      },
      {
        name: 'externalLink',
        type: 'text',
        required: false,
        admin: {
          condition: (data, siblingData) =>
            siblingData?.buttonText &&
            siblingData.buttonText.trim() !== '' &&
            siblingData?.linkType === 'external',
          description: 'External URL (e.g., https://example.com)',
        },
      },
    ],
  },
  {
    name: 'gridColumns',
    type: 'select',
    defaultValue: '3',
    options: [
      { label: '2 Columns', value: '2' },
      { label: '3 Columns', value: '3' },
      { label: '4 Columns', value: '4' },
    ],
    admin: { description: 'Number of columns in the grid' },
  },
  {
    name: 'backgroundColor',
    type: 'select',
    defaultValue: 'white',
    options: [
      { label: 'White', value: 'white' },
      { label: 'Light Neutral', value: 'ds-light-neutral' },
      { label: 'Light Blue', value: 'blue-50' },
      { label: 'Light Green', value: 'green-50' },
    ],
    admin: { description: 'Background color for the section' },
  },
]
