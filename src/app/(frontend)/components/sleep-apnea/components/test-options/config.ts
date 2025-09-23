import type { Field } from 'payload'

export const sleepApneaTestOptionsFields: Field[] = [
  { name: 'title', type: 'text', defaultValue: 'Step 2: Understand Your Sleep Test Options' },
  {
    name: 'items',
    type: 'array',
    required: true,
    minRows: 3,
    maxRows: 3,
    fields: [
      { name: 'key', type: 'text' },
      {
        name: 'icon',
        type: 'select',
        options: ['home', 'activity', 'monitor'],
        defaultValue: 'home',
      },
      { name: 'title', type: 'text', required: true },
      {
        name: 'badges',
        type: 'array',
        fields: [
          { name: 'text', type: 'text' },
          {
            name: 'tone',
            type: 'select',
            options: ['filled', 'subtle', 'neutral'],
            defaultValue: 'neutral',
          },
        ],
      },
      { name: 'description', type: 'textarea' },
      {
        name: 'linkTypePrimary',
        type: 'radio',
        options: ['internal', 'external'],
        defaultValue: 'internal',
      },
      {
        name: 'primaryInternal',
        type: 'group',
        admin: { condition: (_, s) => s?.linkTypePrimary === 'internal' },
        fields: [{ name: 'relation', type: 'relationship', relationTo: ['pages', 'blogs'] }],
      },
      {
        name: 'primaryExternal',
        type: 'group',
        admin: { condition: (_, s) => s?.linkTypePrimary === 'external' },
        fields: [{ name: 'href', type: 'text' }],
      },
      { name: 'primaryText', type: 'text' },
      {
        name: 'linkTypeSecondary',
        type: 'radio',
        options: ['internal', 'external'],
        defaultValue: 'external',
      },
      {
        name: 'secondaryInternal',
        type: 'group',
        admin: { condition: (_, s) => s?.linkTypeSecondary === 'internal' },
        fields: [{ name: 'relation', type: 'relationship', relationTo: ['pages', 'blogs'] }],
      },
      {
        name: 'secondaryExternal',
        type: 'group',
        admin: { condition: (_, s) => s?.linkTypeSecondary === 'external' },
        fields: [{ name: 'href', type: 'text' }],
      },
      { name: 'secondaryText', type: 'text' },
    ],
    defaultValue: [
      {
        key: 'hst',
        icon: 'home',
        title: 'Home Sleep Apnoea Testing (HST)',
        badges: [
          { text: 'Recommended', tone: 'filled' },
          { text: 'Sensors: 2', tone: 'subtle' },
          { text: 'Diagnostic yield: Moderate', tone: 'neutral' },
          { text: 'Inconclusive risk: Low', tone: 'neutral' },
        ],
        description:
          'Our compact, two-sensor sleep test offers a more convenient solution for suspected obstructive sleep apnoea, ideal for many adults with classic symptoms. It allows you to sleep in your own bed and routine while still getting a detailed diagnostic report.',
        linkTypePrimary: 'internal',
        primaryInternal: { relation: { relationTo: 'pages', value: { slug: '' } } },
        primaryText: 'Book for £300',
      },
      {
        key: 'rp',
        icon: 'activity',
        title: 'Respiratory Polygraphy (RP)',
        badges: [
          { text: 'Sensors: 6-8', tone: 'neutral' },
          { text: 'Diagnostic yield: High', tone: 'neutral' },
          { text: 'Inconclusive risk: Very low', tone: 'neutral' },
        ],
        description:
          'Multi-channel home study monitoring airflow, respiratory effort, oxygen levels, body position and more. Higher diagnostic confidence than basic HST.',
        linkTypeSecondary: 'external',
        secondaryExternal: { href: '#' },
        secondaryText: 'Learn more',
        linkTypePrimary: 'external',
        primaryExternal: { href: '#' },
        primaryText: 'Enquire',
      },
      {
        key: 'vpsg',
        icon: 'monitor',
        title: 'Comprehensive Sleep Testing (vPSG)',
        badges: [
          { text: 'Sensors: 20+ + video', tone: 'neutral' },
          { text: 'Diagnostic yield: Highest', tone: 'neutral' },
          { text: 'Inconclusive risk: Minimal', tone: 'neutral' },
        ],
        description:
          'Video Polysomnography (vPSG) is the most comprehensive test available, used for complex or neurological sleep conditions. It involves an overnight clinic stay and full physiological monitoring including video and full sleep staging — diagnosing more than sleep apnoea.',
        linkTypeSecondary: 'external',
        secondaryExternal: { href: '#' },
        secondaryText: 'Learn more',
        linkTypePrimary: 'external',
        primaryExternal: { href: '#' },
        primaryText: 'Enquire',
      },
    ],
  },
]
