import type { Field } from 'payload'

export const contentBlockFields: Field[] = [
  { name: 'title', type: 'text', required: false },
  { name: 'content', type: 'richText' },
  { name: 'layout', type: 'select', options: ['full', 'split'], defaultValue: 'full' },
  { name: 'image', type: 'upload', relationTo: 'media' },
  { name: 'imagePosition', type: 'select', options: ['left', 'right'], defaultValue: 'right' },
]
