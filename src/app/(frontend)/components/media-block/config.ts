import type { Field } from 'payload'
import { contentRichTextEditor } from '@/lib/lexical/editor-configs'

export const mediaBlockFields: Field[] = [
  { name: 'image', type: 'upload', relationTo: 'media', required: true },
  { name: 'imagePosition', type: 'select', options: ['left', 'right'], defaultValue: 'left' },
  { name: 'title', type: 'text', required: true },
  {
    name: 'content',
    type: 'richText',
    editor: contentRichTextEditor,
  },
  {
    name: 'ctaButton',
    type: 'group',
    fields: [
      { name: 'label', type: 'text' },
      { name: 'href', type: 'text' },
    ],
  },
  {
    name: 'backgroundColor',
    type: 'select',
    options: [
      { label: 'Default', value: 'default' },
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
    ],
    defaultValue: 'default',
  },
]
