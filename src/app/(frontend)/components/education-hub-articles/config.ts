import type { Field } from 'payload'
import { ALL_HUB_TOPICS } from '@/lib/education-hub/constants'

export const educationHubArticlesFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    defaultValue: 'Sleep Education Hub',
  },
  {
    name: 'subtitle',
    type: 'textarea',
    defaultValue:
      'Expert insights, practical advice and the latest in sleep health from our specialist team.',
  },
  {
    name: 'topic',
    type: 'select',
    required: true,
    defaultValue: 'specialist-insights',
    options: ALL_HUB_TOPICS.map((topic) => ({ label: topic.label, value: topic.id })),
    admin: { description: 'Published articles from this Education Hub topic are rotated' },
  },
  {
    name: 'limit',
    type: 'number',
    defaultValue: 6,
    min: 1,
    max: 12,
    admin: { description: 'Maximum number of articles to rotate through' },
  },
  {
    name: 'linkLabel',
    type: 'text',
    defaultValue: 'Explore the Sleep Education Hub',
    admin: { description: 'Link to the Education Hub; leave empty to hide it' },
  },
]
