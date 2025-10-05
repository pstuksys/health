import type { Field } from 'payload'
import { createIconSelectField } from '@/lib/icons/icon-map'

export const medicalServicesGridFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: false,
    admin: { description: 'Main heading for the medical services grid section' },
  },
  {
    name: 'subtitle',
    type: 'text',
    required: false,
    admin: { description: 'Small subtitle text above the main title' },
  },
  {
    name: 'backgroundColor',
    type: 'select',
    defaultValue: 'gray-50',
    options: [
      { label: 'Gray 50', value: 'gray-50' },
      { label: 'White', value: 'white' },
      { label: 'Light Blue', value: 'blue-50' },
      { label: 'Light Green', value: 'green-50' },
    ],
    admin: { description: 'Background color for the section' },
  },
  {
    name: 'services',
    type: 'array',
    required: true,
    minRows: 1,
    maxRows: 8,
    admin: { description: 'Medical service cards (1-8 services)' },
    fields: [
      createIconSelectField({
        name: 'icon',
        label: 'Icon',
        required: true,
        description: 'Icon for this medical service',
      }),
      {
        name: 'name',
        type: 'text',
        required: true,
        admin: { description: 'Name of the medical service (e.g., MRI, ULTRASOUND)' },
      },
      {
        name: 'available',
        type: 'checkbox',
        defaultValue: true,
        admin: { description: 'Show "Available for self-pay" badge' },
      },
      {
        name: 'backgroundImage',
        type: 'upload',
        relationTo: 'media',
        required: false,
        admin: { description: 'Optional background image for the service card' },
      },
      {
        name: 'link',
        type: 'group',
        admin: { description: 'Optional link configuration for the service card' },
        fields: [
          {
            name: 'linkType',
            type: 'select',
            defaultValue: 'internal',
            options: [
              { label: 'Internal Page', value: 'internal' },
              { label: 'External URL', value: 'external' },
            ],
            admin: { description: 'Choose whether to link to an internal page or external URL' },
          },
          {
            name: 'internal',
            type: 'group',
            admin: {
              condition: (data, siblingData) => siblingData?.linkType === 'internal',
              description: 'Select an internal page to link to',
            },
            fields: [
              {
                name: 'relation',
                type: 'relationship',
                relationTo: ['pages', 'blogs'],
                required: false,
                admin: { description: 'Select a page or blog post to link to' },
              },
            ],
          },
          {
            name: 'external',
            type: 'group',
            admin: {
              condition: (data, siblingData) => siblingData?.linkType === 'external',
              description: 'Enter an external URL to link to',
            },
            fields: [
              {
                name: 'href',
                type: 'text',
                required: false,
                admin: { description: 'External URL (e.g., https://example.com)' },
              },
            ],
          },
          {
            name: 'openInNewTab',
            type: 'checkbox',
            defaultValue: false,
            admin: { description: 'Open link in a new tab/window' },
          },
        ],
      },
    ],
  },
]
