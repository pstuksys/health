import type { GlobalConfig } from 'payload'
import { cacheTags, revalidateCacheTags } from '@/lib/cache-tags'

export const Header: GlobalConfig = {
  slug: 'header',
  access: { read: () => true, update: () => true },
  hooks: {
    afterChange: [
      async () => {
        await revalidateCacheTags(cacheTags.header)
      },
    ],
  },
  fields: [
    {
      name: 'ctaButton',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
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
      name: 'navigation',
      type: 'array',
      label: 'Navigation Items',
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'hasMegaMenu',
          type: 'checkbox',
          label: 'Use Mega Menu',
          defaultValue: false,
        },
        // Simple link mode
        {
          name: 'linkType',
          type: 'radio',
          defaultValue: 'internal',
          options: [
            { label: 'Internal', value: 'internal' },
            { label: 'External', value: 'external' },
          ],
          admin: { condition: (_, siblingData) => !siblingData?.hasMegaMenu },
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: ['pages', 'blogs'],
          admin: {
            condition: (_, siblingData) =>
              !siblingData?.hasMegaMenu && siblingData?.linkType === 'internal',
          },
        },
        {
          name: 'href',
          type: 'text',
          admin: {
            condition: (_, siblingData) =>
              !siblingData?.hasMegaMenu && siblingData?.linkType === 'external',
          },
        },
        // Mega menu mode
        {
          name: 'megaMenu',
          type: 'group',
          admin: { condition: (_, siblingData) => Boolean(siblingData?.hasMegaMenu) },
          fields: [
            {
              name: 'categories',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true },
                /**
                 * Legacy category items (kept for reference)
                 *
                 * {
                 *   name: 'items',
                 *   type: 'array',
                 *   fields: [
                 *     { name: 'label', type: 'text', required: true },
                 *     {
                 *       name: 'linkType',
                 *       type: 'radio',
                 *       defaultValue: 'internal',
                 *       options: [
                 *         { label: 'Internal', value: 'internal' },
                 *         { label: 'External', value: 'external' },
                 *       ],
                 *     },
                 *     {
                 *       name: 'page',
                 *       type: 'relationship',
                 *       relationTo: ['pages', 'blogs'],
                 *       admin: { condition: (_, s) => s?.linkType === 'internal' },
                 *     },
                 *     {
                 *       name: 'href',
                 *       type: 'text',
                 *       admin: { condition: (_, s) => s?.linkType === 'external' },
                 *     },
                 *   ],
                 * },
                 */
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
                  admin: { condition: (_, s) => s?.linkType === 'internal' },
                },
                {
                  name: 'href',
                  type: 'text',
                  admin: { condition: (_, s) => s?.linkType === 'external' },
                },
              ],
            },
            {
              name: 'featured',
              type: 'array',
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
                  admin: { condition: (_, s) => s?.linkType === 'internal' },
                },
                {
                  name: 'href',
                  type: 'text',
                  admin: { condition: (_, s) => s?.linkType === 'external' },
                },
              ],
            },
          ],
        },
        {
          name: 'external',
          type: 'checkbox',
          label: 'Open in new tab (external link)',
          defaultValue: false,
        },
      ],
    },
  ],
}
