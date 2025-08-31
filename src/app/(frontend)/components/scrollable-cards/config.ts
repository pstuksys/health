import { Block } from 'payload'

export const scrollableCards: Block = {
  slug: 'scrollableCards',
  interfaceName: 'ScrollableCardsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: false,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      required: false,
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Card Title',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          required: false,
          options: [
            { label: 'Heart', value: 'Heart' },
            { label: 'Activity', value: 'Activity' },
            { label: 'Users', value: 'Users' },
            { label: 'Shield', value: 'Shield' },
            { label: 'Star', value: 'Star' },
            { label: 'CheckCircle', value: 'CheckCircle' },
            { label: 'Lightbulb', value: 'Lightbulb' },
            { label: 'Target', value: 'Target' },
            { label: 'TrendingUp', value: 'TrendingUp' },
            { label: 'Award', value: 'Award' },
            { label: 'Zap', value: 'Zap' },
            { label: 'Leaf', value: 'Leaf' },
            { label: 'Globe', value: 'Globe' },
            { label: 'Clock', value: 'Clock' },
            { label: 'MapPin', value: 'MapPin' },
            { label: 'Phone', value: 'Phone' },
            { label: 'Mail', value: 'Mail' },
            { label: 'MessageCircle', value: 'MessageCircle' },
            { label: 'Calendar', value: 'Calendar' },
            { label: 'FileText', value: 'FileText' },
          ],
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Content',
          required: true,
        },
      ],
    },
  ],
}
