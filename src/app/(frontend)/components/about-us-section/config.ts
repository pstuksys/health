import type { Field } from 'payload'
import { contentRichTextEditor } from '@/lib/lexical/editor-configs'

export const aboutUsSectionFields: Field[] = [
  { name: 'title', type: 'text', required: true },
  {
    name: 'content',
    type: 'richText',
    editor: contentRichTextEditor,
  },
  { name: 'image', type: 'upload', relationTo: 'media' },
  {
    name: 'ctaButton',
    type: 'group',
    fields: [
      { name: 'label', type: 'text' },
      { name: 'href', type: 'text' },
    ],
  },
]
