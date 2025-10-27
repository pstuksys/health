import type { Field } from 'payload'

export const cpapBlockFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    label: 'Main Title',
    defaultValue: 'Choose Your CPAP Therapy Option',
    admin: {
      description: 'Main heading for the CPAP comparison section',
    },
  },
  {
    name: 'subtitle',
    type: 'textarea',
    label: 'Subtitle',
    defaultValue:
      'Professional sleep therapy solutions with comprehensive support from certified Clinical Sleep Physiologists',
    admin: {
      description: 'Subtitle text displayed below the main title',
    },
  },
  {
    name: 'serviceCards',
    type: 'array',
    label: 'Service Cards',
    minRows: 2,
    maxRows: 2,
    fields: [
      {
        name: 'title',
        type: 'text',
        required: true,
        admin: {
          description: 'Service card title',
        },
      },
      {
        name: 'description',
        type: 'textarea',
        required: true,
        admin: {
          description: 'Service card description',
        },
      },
      {
        name: 'badge',
        type: 'group',
        fields: [
          {
            name: 'text',
            type: 'text',
            admin: {
              description: 'Badge text (e.g., "Most Popular", "One-Time Payment")',
            },
          },
          {
            name: 'variant',
            type: 'select',
            options: [
              { label: 'Default', value: 'default' },
              { label: 'Secondary', value: 'secondary' },
              { label: 'Outline', value: 'outline' },
            ],
            defaultValue: 'secondary',
            admin: {
              description: 'Badge style variant',
            },
          },
        ],
      },
      {
        name: 'borderColor',
        type: 'select',
        options: [
          { label: 'Dark Blue', value: 'border-ds-dark-blue/20' },
          { label: 'Pastille Green', value: 'border-ds-pastille-green/20' },
          { label: 'Accent Yellow', value: 'border-ds-accent-yellow/20' },
        ],
        defaultValue: 'border-ds-dark-blue/20',
        admin: {
          description: 'Card border color',
        },
      },
      {
        name: 'features',
        type: 'array',
        label: 'Features',
        fields: [
          {
            name: 'text',
            type: 'text',
            required: true,
            admin: {
              description: 'Feature description',
            },
          },
        ],
        admin: {
          description: 'List of features for this service',
        },
      },
      {
        name: 'ctaButtonText',
        type: 'text',
        label: 'CTA Button Text',
        admin: {
          description: 'Button text for this service card (optional)',
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
          condition: (_data, siblingData) =>
            siblingData?.ctaButtonText && siblingData?.ctaButtonText.trim() !== '',
          description: 'Choose whether the CTA button links internally or externally',
        },
      },
      {
        name: 'ctaButtonInternal',
        type: 'relationship',
        relationTo: 'pages',
        label: 'CTA Button Internal Link',
        admin: {
          condition: (_data, siblingData) =>
            siblingData?.ctaButtonText &&
            siblingData.ctaButtonText.trim() !== '' &&
            siblingData.ctaButtonLinkType === 'internal',
          description: 'Select a page for the CTA button to link to',
        },
      },
      {
        name: 'ctaButtonExternal',
        type: 'text',
        label: 'CTA Button External URL',
        admin: {
          condition: (_data, siblingData) =>
            siblingData?.ctaButtonText &&
            siblingData?.ctaButtonText.trim() !== '' &&
            siblingData?.ctaButtonLinkType === 'external',
          description: 'Enter the full URL for the CTA button (https://example.com)',
        },
      },
      {
        name: 'ctaButtonOpenInNewTab',
        type: 'checkbox',
        label: 'Open CTA Button in New Tab',
        defaultValue: false,
        admin: {
          condition: (_data, siblingData) =>
            siblingData?.ctaButtonText &&
            siblingData?.ctaButtonText.trim() !== '' &&
            siblingData?.ctaButtonLinkType === 'external',
        },
      },
    ],
    defaultValue: [
      {
        title: 'PAP Subscription Service',
        description: 'Comprehensive ongoing support with all-inclusive monthly service',
        badge: {
          text: 'Most Popular',
          variant: 'secondary',
        },
        borderColor: 'border-ds-dark-blue/20',
        features: [
          { text: 'Machine from leading CPAP manufacturer' },
          { text: 'Next working day delivery' },
          { text: 'Set up remotely, in-person, or in our clinic with Clinical Sleep Physiologist' },
          { text: 'Remote follow ups' },
          { text: 'Access to online CPAP data via remote therapy monitoring portal' },
          { text: 'CPAP machine filters, a tube and a humidifier are all included' },
          { text: 'Replacement of machine if it breaks down' },
          { text: 'Annual mask replacement' },
          { text: 'Annual report to your referring physician on your treatment progress' },
        ],
      },
      {
        title: 'CPAP Purchase Service',
        description: 'One-time purchase with essential setup and initial support',
        badge: {
          text: 'One-Time Payment',
          variant: 'outline',
        },
        borderColor: 'border-ds-pastille-green/20',
        features: [
          { text: 'Machine from leading CPAP manufacturer' },
          { text: 'Next working day delivery' },
          { text: 'Set up remotely, in-person, or in our clinic with Clinical Sleep Physiologist' },
          { text: 'Remote follow ups' },
          { text: 'Access to online CPAP data via remote therapy monitoring portal' },
          { text: 'CPAP machine filters, a tube and a humidifier are all included' },
          { text: 'Replacement mask in your first month' },
        ],
      },
    ],
  },
  {
    name: 'trustIndicators',
    type: 'group',
    label: 'Trust Indicators Section',
    fields: [
      {
        name: 'title',
        type: 'text',
        defaultValue: 'IPD Offering',
        admin: {
          description: 'Section title',
        },
      },
      {
        name: 'subtitle',
        type: 'textarea',
        defaultValue: 'Comprehensive CPAP therapy support designed around your needs and lifestyle',
        admin: {
          description: 'Section subtitle',
        },
      },
      {
        name: 'items',
        type: 'array',
        label: 'Trust Indicator Items',
        fields: [
          {
            name: 'text',
            type: 'text',
            required: true,
            admin: {
              description: 'Trust indicator text',
            },
          },
        ],
        defaultValue: [
          {
            text: 'Set up virtually, in our London clinic or in your home by a qualified Clinical Sleep Physiologist',
          },
          { text: 'Expert Led Clinician Consultations' },
          { text: 'Premium CPAP Devices from Trusted Brand' },
          { text: 'Stress-free supply of Equipment and Consumables' },
          { text: 'Personalised Therapy Support for Successful Outcomes' },
          { text: 'Ongoing Remote Monitoring and Adjustment' },
          { text: 'Help to start your therapy with the right CPAP mask' },
          { text: 'Try your CPAP treatment' },
          { text: 'Option to purchase your machine or enter subscription service' },
        ],
      },
    ],
  },
]
