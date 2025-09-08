import { Field } from 'payload'

export const sleepAssessmentStepsFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    label: 'Title',
    defaultValue: 'Unlock the secrets of your sleep in just 4 easy steps',
    admin: {
      description: 'Main heading for the sleep assessment steps section',
    },
  },
  {
    name: 'subtitle',
    type: 'textarea',
    label: 'Subtitle',
    defaultValue:
      "As well as taking the assessment, it's important you discuss your symptoms with your doctor. They can help you rule out any underlying medical conditions and recommend treatment options if you do have a sleep disorder, or suggest lifestyle changes.",
    admin: {
      description: 'Descriptive text below the main title',
    },
  },
  {
    name: 'steps',
    type: 'array',
    label: 'Assessment Steps',
    minRows: 4,
    maxRows: 4,
    required: true,
    admin: {
      description: 'Exactly 4 steps in the sleep assessment process',
    },
    fields: [
      {
        name: 'number',
        type: 'text',
        label: 'Step Number',
        required: true,
        admin: {
          description: 'Step number (e.g., "01", "02", "Step 1", etc.)',
        },
      },
      {
        name: 'title',
        type: 'text',
        label: 'Step Title',
        required: true,
        admin: {
          description: 'Main title for this step',
        },
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Description',
        admin: {
          description: 'Optional description text for this step',
        },
      },
      {
        name: 'buttonText',
        type: 'text',
        label: 'Button Text',
        required: true,
        admin: {
          description: 'Text displayed on the action button',
        },
      },
      {
        name: 'linkType',
        type: 'radio',
        label: 'Link Type',
        options: [
          {
            label: 'Internal Link',
            value: 'internal',
          },
          {
            label: 'External Link',
            value: 'external',
          },
        ],
        defaultValue: 'internal',
        admin: {
          description: 'Choose whether the link is internal or external',
        },
      },
      {
        name: 'internal',
        type: 'relationship',
        relationTo: 'pages',
        label: 'Internal Link',
        admin: {
          condition: (data, siblingData) => siblingData?.linkType === 'internal',
          description: 'Select a page to link to',
        },
      },
      {
        name: 'external',
        type: 'text',
        label: 'External URL',
        admin: {
          condition: (data, siblingData) => siblingData?.linkType === 'external',
          description: 'Enter the full URL (https://example.com)',
        },
      },
      {
        name: 'openInNewTab',
        type: 'checkbox',
        label: 'Open in New Tab',
        defaultValue: false,
        admin: {
          condition: (data, siblingData) => siblingData?.linkType === 'external',
        },
      },
      {
        name: 'icon',
        type: 'select',
        label: 'Icon',
        required: true,
        options: [
          {
            label: 'File Text (Document)',
            value: 'FileText',
          },
          {
            label: 'Phone Call',
            value: 'PhoneCall',
          },
          {
            label: 'Beaker (Lab Test)',
            value: 'Beaker',
          },
          {
            label: 'Square Activity (Results)',
            value: 'SquareActivity',
          },
        ],
        admin: {
          description: 'Choose an icon to represent this step',
        },
      },
    ],
  },
  {
    name: 'mainButtonText',
    type: 'text',
    label: 'Main Button Text',
    defaultValue: 'Take a few minutes to complete sleep assessment',
    admin: {
      description: 'Text for the main call-to-action button at the bottom',
    },
  },
  {
    name: 'mainButtonLinkType',
    type: 'radio',
    label: 'Main Button Link Type',
    options: [
      {
        label: 'Internal Link',
        value: 'internal',
      },
      {
        label: 'External Link',
        value: 'external',
      },
    ],
    defaultValue: 'internal',
    admin: {
      description: 'Choose whether the main button links internally or externally',
    },
  },
  {
    name: 'mainButtonInternal',
    type: 'relationship',
    relationTo: 'pages',
    label: 'Main Button Internal Link',
    admin: {
      condition: (data, siblingData) => siblingData?.mainButtonLinkType === 'internal',
      description: 'Select a page for the main button to link to',
    },
  },
  {
    name: 'mainButtonExternal',
    type: 'text',
    label: 'Main Button External URL',
    admin: {
      condition: (data, siblingData) => siblingData?.mainButtonLinkType === 'external',
      description: 'Enter the full URL for the main button (https://example.com)',
    },
  },
  {
    name: 'mainButtonOpenInNewTab',
    type: 'checkbox',
    label: 'Open Main Button in New Tab',
    defaultValue: false,
    admin: {
      condition: (data, siblingData) => siblingData?.mainButtonLinkType === 'external',
    },
  },
]
