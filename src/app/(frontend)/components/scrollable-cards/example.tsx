'use client'

import { ScrollableCards } from './component'

// Example data for the scrollable cards component
const exampleCards = [
  {
    id: '1',
    icon: 'Heart',
    title: 'Patient-Centered Care',
    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Our approach puts patients at the heart of everything we do. We believe in building lasting relationships and providing personalized care that addresses your unique health needs.',
              },
            ],
          },
        ],
      },
    },
  },
  {
    id: '2',
    icon: 'Users',
    title: 'Expert Medical Team',
    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Our team of experienced healthcare professionals is dedicated to delivering the highest quality care. With years of combined experience, we ensure you receive expert medical attention.',
              },
            ],
          },
        ],
      },
    },
  },
  {
    id: '3',
    icon: 'Shield',
    title: 'Advanced Technology',
    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'We utilize cutting-edge medical technology and equipment to provide accurate diagnoses and effective treatments. Our commitment to innovation ensures you receive the best possible care.',
              },
            ],
          },
        ],
      },
    },
  },
  {
    id: '4',
    icon: 'Star',
    title: 'Excellence in Service',
    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'We maintain the highest standards of medical excellence and patient care. Our commitment to quality has earned us recognition as a leading healthcare provider in the community.',
              },
            ],
          },
        ],
      },
    },
  },
  {
    id: '5',
    icon: 'CheckCircle',
    title: 'Comprehensive Solutions',
    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'From preventive care to specialized treatments, we offer comprehensive healthcare solutions. Our integrated approach ensures continuity of care and better health outcomes.',
              },
            ],
          },
        ],
      },
    },
  },
]

export function ScrollableCardsExample() {
  return (
    <ScrollableCards
      title="Why Choose Our Healthcare Services"
      subtitle="Discover the advantages that set us apart in providing exceptional medical care"
      cards={exampleCards}
    />
  )
}
