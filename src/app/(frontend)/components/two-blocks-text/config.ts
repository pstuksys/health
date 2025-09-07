import { Field } from 'payload'

export const twoBlocksTextFields: Field[] = [
  {
    name: 'leftBlock',
    type: 'group',
    label: 'Left Block',
    fields: [
      {
        name: 'subtitle',
        type: 'text',
        label: 'Subtitle',
        required: false,
      },
      {
        name: 'title',
        type: 'text',
        label: 'Title',
        required: true,
      },
      {
        name: 'content',
        type: 'richText',
        label: 'Content',
        required: false,
      },
    ],
  },
  {
    name: 'rightBlock',
    type: 'group',
    label: 'Right Block',
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Title',
        required: true,
      },
      {
        name: 'content',
        type: 'richText',
        label: 'Content',
        required: false,
      },
    ],
  },
]
