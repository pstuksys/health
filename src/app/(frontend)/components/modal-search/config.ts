import type { Field } from 'payload'

export const modalSearchFields: Field[] = [
  { name: 'enabled', type: 'checkbox', defaultValue: true },
  { name: 'placeholder', type: 'text', defaultValue: 'Search for anything...' },
]
