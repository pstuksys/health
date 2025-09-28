import type { Field } from 'payload'

export const patientsSleepFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: false,
    admin: { description: 'Main heading for the patients sleep section' },
  },
  {
    name: 'subtitle',
    type: 'text',
    required: false,
    admin: { description: 'Subtitle text below the main title' },
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
  {
    name: 'sleepTests',
    type: 'array',
    required: true,
    minRows: 1,
    maxRows: 10,
    admin: { description: 'Sleep test cards (1-10 tests)' },
    fields: [
      {
        name: 'title',
        type: 'text',
        required: true,
        admin: { description: 'Title of the sleep test' },
      },
      {
        name: 'description',
        type: 'textarea',
        required: true,
        admin: { description: 'Description of the sleep test' },
      },
      {
        name: 'bestFor',
        type: 'textarea',
        required: true,
        admin: { description: 'What this test is best for' },
      },
      {
        name: 'badge',
        type: 'text',
        required: false,
        admin: { description: 'Badge text (e.g., Gold Standard, Focused Test) - optional' },
      },
      {
        name: 'buttonText',
        type: 'text',
        required: false,
        defaultValue: 'Learn more',
        admin: { description: 'Text for the button (e.g., Learn more, Book now)' },
      },
      {
        name: 'linkType',
        type: 'select',
        options: [
          { label: 'Internal', value: 'internal' },
          { label: 'External', value: 'external' },
        ],
        defaultValue: 'internal',
        admin: { description: 'Type of link' },
      },
      {
        name: 'internalLink',
        type: 'relationship',
        relationTo: 'pages',
        required: false,
        admin: {
          condition: (data, siblingData) => siblingData?.linkType === 'internal',
          description: 'Select a page to link to',
        },
      },
      {
        name: 'externalLink',
        type: 'text',
        required: false,
        admin: {
          condition: (data, siblingData) => siblingData?.linkType === 'external',
          description: 'External URL (e.g., https://example.com)',
        },
      },
    ],
  },
  {
    name: 'aboutSection',
    type: 'group',
    fields: [
      {
        name: 'enabled',
        type: 'checkbox',
        defaultValue: true,
        admin: { description: 'Show about section' },
      },
      {
        name: 'title',
        type: 'text',
        defaultValue: 'About Our sleep services',
        admin: { description: 'Title for about section' },
      },
      {
        name: 'description',
        type: 'textarea',
        defaultValue:
          'A sleep test is a medical assessment conducted overnight to measure brain activity, breathing patterns, oxygen level, heart rhythm and body movements to diagnose potential sleep disorders. At Independent Physiological Diagnostics (IPD) we assess and manage a wide variety of sleep disorders, such as obstructive sleep apnoea (OSA), insomnia, parasomnias, restless leg syndrome, snoring, and other complex sleep-related conditions. Every patient receives personalised care, with results analysed and reported by our national consultant network to ensure clinical accuracy',
        admin: { description: 'Description for about section' },
      },
    ],
  },
  {
    name: 'pediatricSection',
    type: 'group',
    fields: [
      {
        name: 'enabled',
        type: 'checkbox',
        defaultValue: true,
        admin: { description: 'Show pediatric section' },
      },
      {
        name: 'title',
        type: 'text',
        defaultValue: 'Paediatric Sleep Testing',
        admin: { description: 'Title for pediatric section' },
      },
      {
        name: 'description',
        type: 'textarea',
        defaultValue:
          'IPD provides gentle, home-based sleep studies for children of all ages. Our experienced team helps families prepare, ensures a comfortable experience, and delivers reliable results.',
        admin: { description: 'Description for pediatric section' },
      },
      {
        name: 'additionalText',
        type: 'textarea',
        defaultValue:
          "Our paediatric team is here to help if you have questions about your child's sleep test or want advice on which service is best.",
        admin: { description: 'Additional text for pediatric section' },
      },
    ],
  },
  {
    name: 'ctaSection',
    type: 'group',
    fields: [
      {
        name: 'enabled',
        type: 'checkbox',
        defaultValue: true,
        admin: { description: 'Show CTA section' },
      },
      {
        name: 'title',
        type: 'text',
        defaultValue: 'Ready to Book Your Sleep Study?',
        admin: { description: 'Title for CTA section' },
      },
      {
        name: 'description',
        type: 'text',
        defaultValue: 'Get the answers you need for better sleep and improved health.',
        admin: { description: 'Description for CTA section' },
      },
      {
        name: 'buttonText',
        type: 'text',
        defaultValue: 'Contact us to book your sleep study',
        admin: { description: 'Text for the main CTA button' },
      },
      {
        name: 'phoneText',
        type: 'text',
        defaultValue: 'Or call our friendly team for advice',
        admin: { description: 'Text for phone call option' },
      },
      {
        name: 'ctaLinkType',
        type: 'select',
        options: [
          { label: 'Internal', value: 'internal' },
          { label: 'External', value: 'external' },
        ],
        defaultValue: 'internal',
        admin: { description: 'Type of link for CTA button' },
      },
      {
        name: 'ctaInternalLink',
        type: 'relationship',
        relationTo: 'pages',
        required: false,
        admin: {
          condition: (data, siblingData) => siblingData?.ctaLinkType === 'internal',
          description: 'Select a page to link to',
        },
      },
      {
        name: 'ctaExternalLink',
        type: 'text',
        required: false,
        admin: {
          condition: (data, siblingData) => siblingData?.ctaLinkType === 'external',
          description: 'External URL (e.g., https://example.com)',
        },
      },
    ],
  },
  {
    name: 'faqSection',
    type: 'group',
    fields: [
      {
        name: 'enabled',
        type: 'checkbox',
        defaultValue: true,
        admin: { description: 'Show FAQ section' },
      },
      {
        name: 'title',
        type: 'text',
        defaultValue: 'Frequently Asked Questions',
        admin: { description: 'Title for FAQ section' },
      },
      {
        name: 'subtitle',
        type: 'text',
        defaultValue: 'Common questions about our sleep testing services',
        admin: { description: 'Subtitle for FAQ section' },
      },
      {
        name: 'faqs',
        type: 'array',
        required: false,
        minRows: 0,
        maxRows: 10,
        admin: { description: 'FAQ items (0-10 questions)' },
        fields: [
          {
            name: 'question',
            type: 'text',
            required: true,
            admin: { description: 'FAQ question' },
          },
          {
            name: 'answer',
            type: 'textarea',
            required: true,
            admin: { description: 'FAQ answer' },
          },
        ],
      },
    ],
  },
]
