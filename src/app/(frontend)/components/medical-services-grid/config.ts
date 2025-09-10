import type { Field } from 'payload'

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
      {
        name: 'icon',
        type: 'select',
        defaultValue: 'scan',
        options: [
          { label: 'Scan (MRI)', value: 'scan' },
          { label: 'Activity (Ultrasound)', value: 'activity' },
          { label: 'Zap (DEXA)', value: 'zap' },
          { label: 'Heart (Body Composition)', value: 'heart' },
          { label: 'Stethoscope (ECG)', value: 'stethoscope' },
          { label: 'Check (Lab)', value: 'check' },
          { label: 'Calendar (Appointments)', value: 'calendar' },
          { label: 'Settings (Administration)', value: 'settings' },
          { label: 'Shield (Insurance)', value: 'shield' },
        ],
        admin: { description: 'Icon for this medical service' },
      },
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
    ],
  },
]
