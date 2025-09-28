import type { Field } from 'payload'

export const occupationalHealthFields: Field[] = [
  {
    name: 'heroSection',
    type: 'group',
    fields: [
      {
        name: 'title',
        type: 'text',
        required: false,
        defaultValue: 'Supporting Workforce Health',
      },
      {
        name: 'subtitle',
        type: 'text',
        required: false,
        defaultValue: 'Through Expert Sleep Diagnostics',
      },
      {
        name: 'description1',
        type: 'textarea',
        required: false,
        defaultValue:
          'Occupational health is the medical specialty dedicated to promoting employee wellbeing and managing work-related illnesses. By working closely with occupational health professionals, IPD provides the specialist sleep diagnostics and treatment services that enable organisations to maintain a healthy, safe, and productive workforce.',
      },
      {
        name: 'description2',
        type: 'textarea',
        required: false,
        defaultValue:
          'At IPD, our rapid access pathways for assessing and managing sleep disorders such as Obstructive Sleep Apnoea help ensure employees receive swift, accurate diagnoses and timely treatment. This reduces fatigue-related risks in the workplace and supports a faster, safer return to work.',
      },
      {
        name: 'osaLink',
        type: 'group',
        fields: [
          {
            name: 'text',
            type: 'text',
            required: false,
            defaultValue: 'Obstructive Sleep Apnoea',
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
            type: 'group',
            fields: [
              {
                name: 'relation',
                type: 'relationship',
                relationTo: 'pages',
                required: false,
              },
            ],
            admin: {
              condition: (_, siblingData) => siblingData?.linkType === 'internal',
            },
          },
          {
            name: 'external',
            type: 'group',
            fields: [
              {
                name: 'href',
                type: 'text',
                required: false,
              },
            ],
            admin: {
              condition: (_, siblingData) => siblingData?.linkType === 'external',
            },
          },
        ],
      },
      {
        name: 'primaryCta',
        type: 'group',
        fields: [
          {
            name: 'text',
            type: 'text',
            required: false,
            defaultValue: 'Make Referral',
          },
          {
            name: 'linkType',
            type: 'radio',
            dbName: 'oh_p_cta_link_type',
            options: [
              { label: 'Internal', value: 'internal' },
              { label: 'External', value: 'external' },
            ],
            defaultValue: 'internal',
            required: false,
          },
          {
            name: 'internal',
            type: 'group',
            fields: [
              {
                name: 'relation',
                type: 'relationship',
                relationTo: 'pages',
                required: false,
              },
            ],
            admin: {
              condition: (_, siblingData) => siblingData?.linkType === 'internal',
            },
          },
          {
            name: 'external',
            type: 'group',
            fields: [
              {
                name: 'href',
                type: 'text',
                required: false,
              },
            ],
            admin: {
              condition: (_, siblingData) => siblingData?.linkType === 'external',
            },
          },
        ],
      },
      {
        name: 'secondaryCta',
        type: 'group',
        fields: [
          {
            name: 'text',
            type: 'text',
            required: false,
            defaultValue: 'Download OH Guide',
          },
          {
            name: 'linkType',
            type: 'radio',
            dbName: 'oh_s_cta_link_type',
            options: [
              { label: 'Internal', value: 'internal' },
              { label: 'External', value: 'external' },
            ],
            defaultValue: 'external',
            required: false,
          },
          {
            name: 'internal',
            type: 'group',
            fields: [
              {
                name: 'relation',
                type: 'relationship',
                relationTo: 'pages',
                required: false,
              },
            ],
            admin: {
              condition: (_, siblingData) => siblingData?.linkType === 'internal',
            },
          },
          {
            name: 'external',
            type: 'group',
            fields: [
              {
                name: 'href',
                type: 'text',
                required: false,
              },
            ],
            admin: {
              condition: (_, siblingData) => siblingData?.linkType === 'external',
            },
          },
        ],
      },
      {
        name: 'statistics',
        type: 'array',
        required: false,
        fields: [
          {
            name: 'icon',
            type: 'select',
            options: [
              { label: 'Shield', value: 'shield' },
              { label: 'Clock', value: 'clock' },
              { label: 'Users', value: 'users' },
              { label: 'Trending Up', value: 'trending-up' },
            ],
            defaultValue: 'shield',
            required: false,
          },
          {
            name: 'value',
            type: 'text',
            required: true,
          },
          {
            name: 'description',
            type: 'text',
            required: true,
          },
        ],
        defaultValue: [
          { icon: 'shield', value: '95%', description: 'Risk Reduction' },
          { icon: 'clock', value: '48h', description: 'Fast Track Results' },
          { icon: 'users', value: '1000+', description: 'Employee Studies' },
          { icon: 'trending-up', value: '30%', description: 'Productivity Increase' },
        ],
      },
    ],
  },
  {
    name: 'journeySection',
    type: 'group',
    fields: [
      {
        name: 'disableView',
        type: 'checkbox',
        defaultValue: false,
        admin: { description: 'If enabled, hides the Patient Journey section' },
      },
      {
        name: 'title',
        type: 'text',
        required: false,
        defaultValue: 'Patient Journey',
      },
      {
        name: 'description',
        type: 'textarea',
        required: false,
        defaultValue:
          'Our comprehensive patient pathway ensures thorough assessment and appropriate treatment options for sleep disorders.',
      },
    ],
  },
  {
    name: 'pathwaySection',
    type: 'group',
    fields: [
      {
        name: 'title',
        type: 'text',
        required: false,
        defaultValue: 'Occupational Health Pathway',
      },
      {
        name: 'description',
        type: 'textarea',
        required: false,
        defaultValue:
          'Our streamlined pathway is designed specifically for occupational health professionals, ensuring swift assessment and management of sleep-related workplace risks.',
      },
      {
        name: 'steps',
        type: 'array',
        required: false,
        fields: [
          {
            name: 'step',
            type: 'number',
            required: true,
            admin: {
              description: 'Step number (1, 2, 3, etc.)',
            },
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
          {
            name: 'buttonText',
            type: 'text',
            required: false,
            admin: {
              description: 'Default button text if no link is provided',
            },
          },
          {
            name: 'link',
            type: 'group',
            fields: [
              {
                name: 'text',
                type: 'text',
                required: false,
                admin: {
                  description: 'Link text (overrides buttonText)',
                },
              },
              {
                name: 'linkType',
                type: 'radio',
                dbName: 'oh_path_link_type',
                options: [
                  { label: 'Internal', value: 'internal' },
                  { label: 'External', value: 'external' },
                ],
                defaultValue: 'internal',
                required: false,
              },
              {
                name: 'internal',
                type: 'group',
                fields: [
                  {
                    name: 'relation',
                    type: 'relationship',
                    relationTo: 'pages',
                    required: false,
                  },
                ],
                admin: {
                  condition: (_, siblingData) => siblingData?.linkType === 'internal',
                },
              },
              {
                name: 'external',
                type: 'group',
                fields: [
                  {
                    name: 'href',
                    type: 'text',
                    required: false,
                  },
                ],
                admin: {
                  condition: (_, siblingData) => siblingData?.linkType === 'external',
                },
              },
            ],
          },
        ],
        defaultValue: [
          {
            step: 1,
            title: 'Initial Assessment',
            description:
              'Have you identified an individual? Use our IPD assessment designed for GPs that includes validated sleep screening tools.',
            buttonText: 'Complete Assessment',
          },
          {
            step: 2,
            title: 'Sleep Study',
            description:
              'Patient undertakes a sleep study based on their symptoms - comprehensive diagnostic testing.',
            buttonText: 'Find Out More',
          },
          {
            step: 3,
            title: 'Expert Reporting',
            description:
              'You will receive a report scored by Clinical Sleep Physiologist and reported by a Consultant Sleep Physician.',
            buttonText: 'View Sample Report',
          },
          {
            step: 4,
            title: 'Patient Follow-up',
            description: 'Arrange follow up with your patient to discuss results and next steps.',
            buttonText: 'Schedule Follow-up',
          },
          {
            step: 5,
            title: 'Ongoing Support',
            description:
              'If needed, IPD can support in arranging therapy and appointments with our nationwide network of consultant physicians.',
            buttonText: 'Access Support',
          },
        ],
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
        defaultValue: 'Related Pages',
      },
      {
        name: 'description',
        type: 'text',
        required: false,
        defaultValue: 'Explore our comprehensive range of sleep diagnostic services',
      },
      {
        name: 'services',
        type: 'array',
        required: false,
        fields: [
          {
            name: 'icon',
            type: 'select',
            options: [
              { label: 'Stethoscope', value: 'stethoscope' },
              { label: 'File Text', value: 'file-text' },
              { label: 'Heart Handshake', value: 'heart-handshake' },
            ],
            defaultValue: 'stethoscope',
            required: false,
          },
          {
            name: 'title',
            type: 'text',
            required: true,
          },
          {
            name: 'description',
            type: 'text',
            required: true,
          },
          {
            name: 'cta',
            type: 'group',
            fields: [
              {
                name: 'text',
                type: 'text',
                required: false,
                defaultValue: 'Learn More',
              },
              {
                name: 'linkType',
                type: 'radio',
                dbName: 'oh_svc_cta_link_type',
                options: [
                  { label: 'Internal', value: 'internal' },
                  { label: 'External', value: 'external' },
                ],
                defaultValue: 'internal',
                required: false,
              },
              {
                name: 'internal',
                type: 'group',
                fields: [
                  {
                    name: 'relation',
                    type: 'relationship',
                    relationTo: 'pages',
                    required: false,
                  },
                ],
                admin: {
                  condition: (_, siblingData) => siblingData?.linkType === 'internal',
                },
              },
              {
                name: 'external',
                type: 'group',
                fields: [
                  {
                    name: 'href',
                    type: 'text',
                    required: false,
                  },
                ],
                admin: {
                  condition: (_, siblingData) => siblingData?.linkType === 'external',
                },
              },
            ],
          },
        ],
        defaultValue: [
          {
            icon: 'stethoscope',
            title: 'MWT',
            description: 'Maintenance of Wakefulness Testing',
          },
          {
            icon: 'file-text',
            title: 'PSG',
            description: 'Polysomnography Sleep Studies',
          },
          {
            icon: 'heart-handshake',
            title: 'CPAP',
            description: 'CPAP Therapy Services',
          },
        ],
      },
    ],
  },
  {
    name: 'ctaSection',
    type: 'group',
    fields: [
      {
        name: 'title',
        type: 'text',
        required: false,
        defaultValue: 'Ready to Improve Workplace Safety?',
      },
      {
        name: 'description',
        type: 'textarea',
        required: false,
        defaultValue:
          'Start referring employees for comprehensive sleep assessments and help reduce fatigue-related workplace incidents while improving overall productivity.',
      },
      {
        name: 'primaryCta',
        type: 'group',
        fields: [
          {
            name: 'text',
            type: 'text',
            required: false,
            defaultValue: 'Make a Referral',
          },
          {
            name: 'linkType',
            type: 'radio',
            dbName: 'oh_cta_p_link_type',
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
        ],
      },
      {
        name: 'secondaryCta',
        type: 'group',
        fields: [
          {
            name: 'text',
            type: 'text',
            required: false,
            defaultValue: 'Download OH Toolkit',
          },
          {
            name: 'linkType',
            type: 'radio',
            dbName: 'oh_cta_s_link_type',
            options: [
              { label: 'Internal', value: 'internal' },
              { label: 'External', value: 'external' },
            ],
            defaultValue: 'external',
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
        ],
      },
    ],
  },
]
