import type { Field, GlobalConfig } from 'payload'
import { cacheTags, revalidateCacheTags } from '@/lib/cache-tags'
import { createIconSelectField } from '@/lib/icons/icon-map'
import { BOOKING_MODAL_HASH } from '@/lib/booking-modal'

function linkFields(): Field[] {
  return [
    {
      name: 'linkType',
      type: 'radio',
      defaultValue: 'external',
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
      defaultValue: '/contact-us',
      admin: { condition: (_, siblingData) => siblingData?.linkType === 'external' },
    },
  ]
}

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
    {
      name: 'bookingModal',
      type: 'group',
      admin: {
        description: `Opens from any button or link pointing to ${BOOKING_MODAL_HASH}`,
      },
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Book a Video Consultation' },
        {
          name: 'description',
          type: 'text',
          defaultValue: 'Choose the option that best describes you.',
        },
        {
          name: 'options',
          type: 'array',
          maxRows: 4,
          fields: [
            createIconSelectField({ name: 'icon', defaultValue: 'Wallet' }),
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
            ...linkFields(),
            {
              name: 'embed',
              type: 'checkbox',
              label: 'Open inside the modal',
              defaultValue: false,
              admin: {
                description: 'Shows the link (e.g. the Semble booking page) in an iframe in the modal',
              },
            },
          ],
          defaultValue: [
            {
              icon: 'Wallet',
              title: "I'm self-funding",
              description: "I'll pay for my consultation and any investigations myself.",
              linkType: 'external',
              href: 'https://online-booking.semble.io/?token=f4f229c013b1b2e8ebc306746283cddc4a89a687',
              embed: true,
            },
            {
              icon: 'ShieldCheck',
              title: 'I have private health insurance',
              description:
                'If a test is required, I would like to use my private health insurance policy to cover the cost.',
              linkType: 'external',
              href: 'https://online-booking.semble.io/?token=f4f229c013b1b2e8ebc306746283cddc4a89a687',
              embed: true,
            },
          ],
        },
        {
          name: 'help',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', defaultValue: 'Not sure which option to choose?' },
            { name: 'text', type: 'text', defaultValue: 'Contact our team for guidance.' },
            ...linkFields(),
          ],
        },
      ],
    },
  ],
}
