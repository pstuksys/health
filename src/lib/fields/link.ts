import type { Field } from 'payload'

type LinkTypeOption = { label: string; value: string }

type LinkFieldOptions = {
  /**
   * Default link type. Defaults to 'internal' to encourage relationship usage.
   */
  defaultValue?: 'internal' | 'external'
  /**
   * Override the link type options. Useful for adding custom actions like downloads.
   */
  linkTypeOptions?: LinkTypeOption[]
  /**
   * Admin description applied to the link type field.
   */
  description?: string
}

const defaultLinkTypeOptions: LinkTypeOption[] = [
  { label: 'Internal', value: 'internal' },
  { label: 'External', value: 'external' },
]

/**
 * Generates a consistent internal/external link model:
 * - linkType select
 * - internal relationship to pages/blogs
 * - external href text
 */
export function createLinkFields({
  defaultValue = 'internal',
  linkTypeOptions = defaultLinkTypeOptions,
  description = 'Choose between internal page/blog or external URL',
}: LinkFieldOptions = {}): Field[] {
  return [
    {
      name: 'linkType',
      type: 'select',
      label: 'Link Type',
      defaultValue,
      options: linkTypeOptions,
      admin: { description },
    },
    {
      name: 'internal',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData?.linkType === 'internal',
      },
      fields: [
        {
          name: 'relation',
          type: 'relationship',
          label: 'Internal Page or Blog',
          relationTo: ['pages', 'blogs'],
          required: true,
          admin: {
            description: 'Select a page or blog to link to',
          },
        },
      ],
    },
    {
      name: 'external',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData?.linkType === 'external',
      },
      fields: [
        {
          name: 'href',
          type: 'text',
          label: 'External URL',
          required: true,
          admin: {
            description: 'Full URL (e.g., https://example.com)',
          },
        },
      ],
    },
  ]
}

type CreateCTAGroupOptions = LinkFieldOptions & {
  name: string
  label: string
  /**
   * Include a variant selector (primary/secondary). Defaults to true.
   */
  withVariant?: boolean
}

/**
 * Factory for a CTA group containing label + link fields (and optional variant).
 */
export function createCTAGroup({
  name,
  label,
  withVariant = true,
  ...linkOptions
}: CreateCTAGroupOptions): Field {
  const fields: Field[] = [
    {
      name: 'label',
      type: 'text',
      admin: { description: 'Button text' },
    },
    ...createLinkFields(linkOptions),
  ]

  if (withVariant) {
    fields.push({
      name: 'variant',
      type: 'select',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
      ],
      defaultValue: 'primary',
      admin: { description: 'Button style variant' },
    })
  }

  return {
    name,
    type: 'group',
    label,
    fields,
  }
}


