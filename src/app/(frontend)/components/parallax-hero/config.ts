import type { Field } from 'payload'

export const parallaxHeroFields: Field[] = [
  { name: 'title', type: 'text', required: true },
  { name: 'subtitle', type: 'text', required: true },
  { name: 'buttonText', type: 'text', required: true },
  { name: 'buttonHref', type: 'text', required: true },
  { name: 'backgroundImage', type: 'upload', relationTo: 'media', required: true },
]
