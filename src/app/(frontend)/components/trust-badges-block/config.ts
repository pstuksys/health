import type { Field } from 'payload'

export const trustBadgesBlockFields: Field[] = [
  {
    name: 'badges',
    type: 'array',
    required: true,
    minRows: 1,
    admin: { description: 'Compliance and certification badge images to display in the strip.' },
    fields: [
      {
        name: 'logo',
        type: 'upload',
        relationTo: 'media',
        required: true,
        admin: { description: 'Badge image/SVG — the label should be embedded in the image.' },
      },
    ],
  },
]
