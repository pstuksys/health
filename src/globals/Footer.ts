import type { GlobalConfig } from 'payload'
import { revalidateFooterOnChange } from '@/hooks/revalidate'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateFooterOnChange],
  },
  fields: [
    {
      name: 'about',
      type: 'textarea',
      label: 'About',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'navigationLinks',
          type: 'array',
          label: 'Navigation Links',
          fields: [
            { name: 'label', type: 'text', required: true },
            {
              name: 'linkType',
              type: 'radio',
              defaultValue: 'internal',
              options: [
                { label: 'Internal', value: 'internal' },
                { label: 'External', value: 'external' },
              ],
            },
            {
              name: 'page',
              type: 'relationship',
              relationTo: ['pages', 'blogs'],
              admin: { condition: (_, siblingData) => siblingData?.linkType === 'internal' },
            },
            {
              name: 'href',
              type: 'text',
              admin: { condition: (_, siblingData) => siblingData?.linkType === 'external' },
            },
          ],
        },
        {
          name: 'legalLinks',
          type: 'array',
          label: 'Legal Links',
          fields: [
            { name: 'label', type: 'text', required: true },
            {
              name: 'linkType',
              type: 'radio',
              defaultValue: 'internal',
              options: [
                { label: 'Internal', value: 'internal' },
                { label: 'External', value: 'external' },
              ],
            },
            {
              name: 'page',
              type: 'relationship',
              relationTo: ['pages', 'blogs'],
              admin: { condition: (_, siblingData) => siblingData?.linkType === 'internal' },
            },
            {
              name: 'href',
              type: 'text',
              admin: { condition: (_, siblingData) => siblingData?.linkType === 'external' },
            },
          ],
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Information',
      fields: [
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'address', type: 'textarea' },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        { name: 'platform', type: 'select', options: ['facebook', 'twitter', 'linkedin', 'x'] },
        { name: 'url', type: 'text' },
      ],
    },
  ],
}
