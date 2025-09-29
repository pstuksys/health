import type { Field } from 'payload'

export const callToActionBannerBlockFields: Field[] = [
  { name: 'ctaImage', type: 'upload', relationTo: 'media' },
  { name: 'ctaTitle', type: 'text', defaultValue: 'Expert Sleep Diagnostics from IPD' },
  { name: 'ctaDescription', type: 'richText' },
  {
    name: 'ctaPrimary',
    type: 'group',
    fields: [
      { name: 'label', type: 'text' },
      {
        name: 'linkType',
        type: 'select',
        options: ['internal', 'external'],
        defaultValue: 'internal',
      },
      {
        name: 'internal',
        type: 'group',
        admin: { condition: (_, s) => s?.linkType === 'internal' },
        fields: [{ name: 'relation', type: 'relationship', relationTo: ['pages', 'blogs'] }],
      },
      {
        name: 'external',
        type: 'group',
        admin: { condition: (_, s) => s?.linkType === 'external' },
        fields: [{ name: 'href', type: 'text' }],
      },
    ],
  },
  {
    name: 'ctaSecondary',
    type: 'group',
    fields: [
      { name: 'label', type: 'text' },
      {
        name: 'linkType',
        type: 'select',
        options: ['internal', 'external'],
        defaultValue: 'external',
      },
      {
        name: 'internal',
        type: 'group',
        admin: { condition: (_, s) => s?.linkType === 'internal' },
        fields: [{ name: 'relation', type: 'relationship', relationTo: ['pages', 'blogs'] }],
      },
      {
        name: 'external',
        type: 'group',
        admin: { condition: (_, s) => s?.linkType === 'external' },
        fields: [{ name: 'href', type: 'text' }],
      },
    ],
  },
  { name: 'footerRichText', type: 'richText' },
]
