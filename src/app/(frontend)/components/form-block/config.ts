import type { Field } from 'payload'
import { nestedRichTextEditor } from '@/lib/lexical/editor-configs'

export const formBlockFields: Field[] = [
  {
    name: 'form',
    type: 'relationship',
    relationTo: 'forms',
    required: true,
    admin: {
      description: 'Select the form to display',
    },
  },
  {
    name: 'title',
    type: 'text',
    required: false,
    admin: {
      description: 'Optional title to display above the form',
    },
  },
  {
    name: 'description',
    type: 'richText',
    required: false,
    editor: nestedRichTextEditor,
    admin: {
      description: 'Optional description to display above the form',
    },
  },
  {
    name: 'layout',
    type: 'select',
    defaultValue: 'default',
    options: [
      { label: 'Default', value: 'default' },
      { label: 'Card', value: 'card' },
      { label: 'Centered', value: 'centered' },
    ],
    admin: {
      description: 'Choose how the form should be displayed',
    },
  },
  {
    name: 'maxWidth',
    type: 'select',
    defaultValue: 'md',
    options: [
      { label: 'Small (400px)', value: 'sm' },
      { label: 'Medium (600px)', value: 'md' },
      { label: 'Large (800px)', value: 'lg' },
      { label: 'Extra Large (1000px)', value: 'xl' },
      { label: 'Full Width', value: 'full' },
    ],
    admin: {
      description: 'Maximum width of the form container',
    },
  },
  {
    name: 'backgroundColor',
    type: 'select',
    defaultValue: 'transparent',
    options: [
      { label: 'Transparent', value: 'transparent' },
      { label: 'White', value: 'white' },
      { label: 'Light Gray', value: 'gray' },
      { label: 'Primary', value: 'primary' },
    ],
    admin: {
      description: 'Background color for the form section',
    },
  },
  {
    name: 'padding',
    type: 'select',
    defaultValue: 'md',
    options: [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
    ],
    admin: {
      description: 'Padding around the form',
    },
  },
  {
    name: 'buttonWidth',
    type: 'select',
    defaultValue: 'full',
    options: [
      { label: 'Full Width', value: 'full' },
      { label: 'Auto Width', value: 'auto' },
    ],
    admin: {
      description: 'Width of the submit button',
    },
  },
]
