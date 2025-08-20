import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: { read: () => true },
  hooks: {
    afterChange: [
      ({ doc: _doc }) => {
        void fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/api/revalidate?secret=${process.env.REVALIDATION_SECRET ?? ''}`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ tags: ['global:header'] }),
          },
        ).catch(() => {})
      },
    ],
  },
  fields: [
    { name: 'logo', type: 'upload', relationTo: 'media' },
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
      name: 'enableBanter',
      type: 'checkbox',
      label: 'Enable Banter Block',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'headerDescription',
      type: 'textarea',
      label: 'Description Above Header',
      admin: {
        description: 'Optional description text shown above the site header',
        condition: (_, siblingData) => Boolean(siblingData?.enableBanter),
        position: 'sidebar',
      },
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
                {
                  name: 'items',
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
