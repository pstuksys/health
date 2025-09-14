import type { Field } from 'payload'

export const corporateHealthFields: Field[] = [
  {
    name: 'heroSection',
    type: 'group',
    fields: [
      {
        name: 'title',
        type: 'text',
        required: true,
        defaultValue: 'Corporate Sleep Health Solutions',
      },
      {
        name: 'quote',
        type: 'text',
        required: false,
        defaultValue: '"Help Your Team Sleep Better, Live Better, and Work Smarter"',
        admin: {
          description: 'Highlighted quote in the hero section',
        },
      },
      {
        name: 'description',
        type: 'textarea',
        required: false,
        defaultValue:
          'Independent Physiological Diagnostics (IPD) works with companies of all sizes to address the root causes of fatigue, boost performance, and support mental and physical health across your workforce. As a leading provider of workplace sleep diagnostics, IPD partners with corporate entities to transform employee wellbeing through expert-led sleep health solutions.',
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        required: false,
        admin: {
          description: 'Hero section image',
        },
      },
      {
        name: 'imageAlt',
        type: 'text',
        required: false,
        defaultValue: 'Professional workplace wellness and sleep health',
        admin: {
          description: 'Alt text for the hero image',
        },
      },
      {
        name: 'ctaButton',
        type: 'group',
        fields: [
          {
            name: 'text',
            type: 'text',
            required: false,
            defaultValue: 'Enquire with us',
          },
          {
            name: 'linkType',
            type: 'radio',
            options: [
              { label: 'Internal', value: 'internal' },
              { label: 'External', value: 'external' },
            ],
            defaultValue: 'internal',
            required: false,
          },
          {
            name: 'internal',
            type: 'relationship',
            relationTo: 'pages',
            required: false,
            admin: {
              condition: (_, siblingData) => siblingData?.linkType === 'internal',
            },
          },
          {
            name: 'external',
            type: 'text',
            required: false,
            admin: {
              condition: (_, siblingData) => siblingData?.linkType === 'external',
            },
          },
          {
            name: 'openInNewTab',
            type: 'checkbox',
            defaultValue: false,
            admin: {
              condition: (_, siblingData) => siblingData?.linkType === 'external',
            },
          },
        ],
      },
    ],
  },
  {
    name: 'whyFocusSection',
    type: 'group',
    fields: [
      {
        name: 'title',
        type: 'text',
        required: false,
        defaultValue: 'Why Focus on Corporate Sleep Health?',
      },
      {
        name: 'description',
        type: 'textarea',
        required: false,
        defaultValue:
          'Quality sleep is the foundation of a healthy, high-performing workforce. Yet, sleep disorders such as insomnia and obstructive sleep apnoea, go undetected in corporate settings, impacting productivity, safety, and overall employee wellbeing.',
      },
      {
        name: 'statistics',
        type: 'array',
        required: false,
        fields: [
          {
            name: 'value',
            type: 'text',
            required: true,
            admin: {
              description: 'The statistic value (e.g., "£568", "17%")',
            },
          },
          {
            name: 'description',
            type: 'text',
            required: true,
            admin: {
              description: 'Description of what the statistic represents',
            },
          },
          {
            name: 'color',
            type: 'select',
            options: [
              { label: 'Red', value: 'red' },
              { label: 'Orange', value: 'orange' },
              { label: 'Green', value: 'green' },
              { label: 'Blue', value: 'blue' },
            ],
            defaultValue: 'blue',
            required: false,
          },
        ],
        defaultValue: [
          {
            value: '£568',
            description: 'Lost per employee annually due to illness-related absence',
            color: 'red',
          },
          { value: '£40B', description: 'Annual cost of fatigue to the UK economy', color: 'red' },
          { value: '1 in 3', description: 'People suffer from poor sleep', color: 'orange' },
          {
            value: '17%',
            description: 'Productivity boost from sleep improvement programmes',
            color: 'green',
          },
        ],
      },
      {
        name: 'highlightText',
        type: 'text',
        required: false,
        defaultValue:
          'Poor sleep is linked to depression, anxiety, burnout, and cardiovascular disease.',
        admin: {
          description: 'Bold highlighted text in the callout box',
        },
      },
      {
        name: 'additionalText',
        type: 'textarea',
        required: false,
        defaultValue:
          'Sleep-improvement programmes can lead to a 17% boost in productivity and up to 30% fewer days lost to absence. By proactively addressing sleep health, you improve wellbeing, reduce errors, and build a healthier, more focused workforce.',
      },
    ],
  },
  {
    name: 'servicesSection',
    type: 'group',
    fields: [
      {
        name: 'title',
        type: 'text',
        required: false,
        defaultValue: 'Why Partner with IPD for Corporate Sleep Health?',
      },
      {
        name: 'description',
        type: 'textarea',
        required: false,
        defaultValue:
          'IPD designs flexible, scalable, and fully confidential sleep health solutions for organisations of all sizes. Our corporate sleep health services include:',
      },
      {
        name: 'leftServices',
        type: 'array',
        required: false,
        fields: [
          {
            name: 'icon',
            type: 'select',
            options: [
              { label: 'Users', value: 'users' },
              { label: 'Trending Up', value: 'trending-up' },
              { label: 'Shield', value: 'shield' },
              { label: 'Check Circle', value: 'check-circle' },
              { label: 'Clock', value: 'clock' },
            ],
            defaultValue: 'users',
            required: false,
          },
          {
            name: 'title',
            type: 'text',
            required: true,
          },
          {
            name: 'description',
            type: 'textarea',
            required: true,
          },
        ],
        defaultValue: [
          {
            icon: 'users',
            title: 'Onsite and Remote Sleep Wellbeing Days',
            description:
              'IPD delivers interactive sleep talks and wellbeing events within your organisation to educate and engage employees.',
          },
          {
            icon: 'trending-up',
            title: 'Organisation-Wide Digital Sleep Screening',
            description:
              'We provide comprehensive risk assessments, available both onsite and remotely, to identify employees who may benefit from further support.',
          },
          {
            icon: 'shield',
            title: 'Home-Based Diagnostic Testing',
            description:
              "High-risk individuals are referred for confidential sleep studies at home, all coordinated and interpreted by IPD's network of GP and consultant sleep physicians.",
          },
          {
            icon: 'check-circle',
            title: 'Private, Evidence-Based Treatment',
            description:
              'Employees have access to tailored therapies, including CPAP, CBT-I, and Mandibular Advancement Devices, delivered with clinical oversight.',
          },
        ],
      },
      {
        name: 'rightServices',
        type: 'array',
        required: false,
        fields: [
          {
            name: 'icon',
            type: 'select',
            options: [
              { label: 'Users', value: 'users' },
              { label: 'Trending Up', value: 'trending-up' },
              { label: 'Shield', value: 'shield' },
              { label: 'Check Circle', value: 'check-circle' },
              { label: 'Clock', value: 'clock' },
            ],
            defaultValue: 'users',
            required: false,
          },
          {
            name: 'title',
            type: 'text',
            required: true,
          },
          {
            name: 'description',
            type: 'textarea',
            required: true,
          },
        ],
        defaultValue: [
          {
            icon: 'trending-up',
            title: 'Integrated Corporate Wellbeing Programmes',
            description:
              'IPD embeds sleep health solutions seamlessly into your existing wellbeing initiatives for maximum impact.',
          },
          {
            icon: 'clock',
            title: 'Workforce-Level Reporting',
            description:
              'We supply anonymised, aggregated data on sleep health trends within your workforce, supporting strategic health planning and ROI measurement.',
          },
          {
            icon: 'users',
            title: 'Dedicated Account Management',
            description:
              'Each client benefits from a dedicated IPD account manager and ongoing clinical support to ensure programme success.',
          },
        ],
      },
      {
        name: 'ctaText',
        type: 'text',
        required: false,
        defaultValue: 'To learn more about our corporate sleep health packages, enquire with us',
      },
      {
        name: 'ctaButton',
        type: 'group',
        fields: [
          {
            name: 'text',
            type: 'text',
            required: false,
            defaultValue: 'Get Started Today',
          },
          {
            name: 'linkType',
            type: 'radio',
            options: [
              { label: 'Internal', value: 'internal' },
              { label: 'External', value: 'external' },
            ],
            defaultValue: 'internal',
            required: false,
          },
          {
            name: 'internal',
            type: 'relationship',
            relationTo: 'pages',
            required: false,
            admin: {
              condition: (_, siblingData) => siblingData?.linkType === 'internal',
            },
          },
          {
            name: 'external',
            type: 'text',
            required: false,
            admin: {
              condition: (_, siblingData) => siblingData?.linkType === 'external',
            },
          },
          {
            name: 'openInNewTab',
            type: 'checkbox',
            defaultValue: false,
            admin: {
              condition: (_, siblingData) => siblingData?.linkType === 'external',
            },
          },
        ],
      },
    ],
  },
]
