import type { Field } from 'payload'

export const fullWidthBannerFields: Field[] = [
  { name: 'title', type: 'text', required: true },
  { name: 'subtitle', type: 'text' },
  { name: 'buttonText', type: 'text', required: true },
  { name: 'buttonHref', type: 'text', required: true },
  { name: 'backgroundImage', type: 'upload', relationTo: 'media', required: true },
]
