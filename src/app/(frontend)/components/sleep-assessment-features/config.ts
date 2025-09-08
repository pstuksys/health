import { Field } from 'payload'

export const sleepAssessmentFeaturesFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    label: 'Title',
    defaultValue: 'Free Online Sleep Assessment',
    admin: {
      description: 'Main heading for the sleep assessment features section',
    },
  },
  {
    name: 'subtitle',
    type: 'textarea',
    label: 'Subtitle',
    defaultValue:
      'IPDiagnostics offers a free online sleep assessment that helps you discover whether a sleep disorder is disturbing your rest. The assessment asks targeted questions about your bedtime habits, daytime energy, and medical history.',
    admin: {
      description: 'Descriptive text below the main title',
    },
  },
  {
    name: 'features',
    type: 'array',
    label: 'Features',
    minRows: 1,
    maxRows: 8,
    required: true,
    admin: {
      description: 'Features highlighting the sleep assessment benefits',
    },
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Feature Title',
        required: true,
        admin: {
          description: 'Main title for this feature',
        },
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Description',
        required: true,
        admin: {
          description: 'Description text for this feature',
        },
      },
      {
        name: 'icon',
        type: 'select',
        label: 'Icon',
        required: true,
        options: [
          {
            label: 'Clock (Quick & Easy)',
            value: 'Clock',
          },
          {
            label: 'Shield (Security/Privacy)',
            value: 'Shield',
          },
          {
            label: 'Check Circle (Completion/Success)',
            value: 'CheckCircle',
          },
          {
            label: 'Users (Support/Community)',
            value: 'Users',
          },
          {
            label: 'File Text (Document/Report)',
            value: 'FileText',
          },
          {
            label: 'Phone Call (Contact)',
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
          description: 'Choose an icon to represent this feature',
        },
      },
    ],
  },
  {
    name: 'ctaButtonText',
    type: 'text',
    label: 'CTA Button Text',
    defaultValue: 'Start Your Free Sleep Assessment',
    admin: {
      description: 'Text for the main call-to-action button',
    },
  },
  {
    name: 'ctaButtonLinkType',
    type: 'radio',
    label: 'CTA Button Link Type',
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
      description: 'Choose whether the CTA button links internally or externally',
    },
  },
  {
    name: 'ctaButtonInternal',
    type: 'relationship',
    relationTo: 'pages',
    label: 'CTA Button Internal Link',
    admin: {
      condition: (data, siblingData) => siblingData?.ctaButtonLinkType === 'internal',
      description: 'Select a page for the CTA button to link to',
    },
  },
  {
    name: 'ctaButtonExternal',
    type: 'text',
    label: 'CTA Button External URL',
    admin: {
      condition: (data, siblingData) => siblingData?.ctaButtonLinkType === 'external',
      description: 'Enter the full URL for the CTA button (https://example.com)',
    },
  },
  {
    name: 'ctaButtonOpenInNewTab',
    type: 'checkbox',
    label: 'Open CTA Button in New Tab',
    defaultValue: false,
    admin: {
      condition: (data, siblingData) => siblingData?.ctaButtonLinkType === 'external',
    },
  },
  {
    name: 'bottomText',
    type: 'text',
    label: 'Bottom Text',
    defaultValue:
      'We analyse your answers and calculate your risk for obstructive sleep apnoea or insomnia.',
    admin: {
      description: 'Small text displayed below the CTA button',
    },
  },
]
