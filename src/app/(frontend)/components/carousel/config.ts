import type { Field } from 'payload'

export const carouselFields: Field[] = [
  {
    name: 'items',
    type: 'array',
    fields: [
      { name: 'image', type: 'upload', relationTo: 'media' },
      { name: 'title', type: 'text' },
      { name: 'description', type: 'textarea' },
      { name: 'href', type: 'text' },
    ],
  },
  { name: 'slidesToShow', type: 'number', defaultValue: 3, min: 1, max: 6 },
  { name: 'autoplay', type: 'checkbox', defaultValue: false },
  { name: 'autoplayInterval', type: 'number', defaultValue: 5000 },
  { name: 'showArrows', type: 'checkbox', defaultValue: true },
  { name: 'showDots', type: 'checkbox', defaultValue: true },
]
