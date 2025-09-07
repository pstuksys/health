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
    minRows: 1,
    maxRows: 6,
    admin: {
      description: 'Steps in the sleep assessment process (leave empty to use default 4 steps)',
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
        name: 'bulletPoints',
        type: 'array',
        label: 'Bullet Points',
        admin: {
          description: 'Optional list of bullet points for this step',
        },
        fields: [
          {
            name: 'point',
            type: 'text',
            label: 'Bullet Point',
            required: true,
          },
        ],
      },
    ],
  },
]
