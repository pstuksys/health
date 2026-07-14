import type { ComponentType, SVGProps } from 'react'
import { Activity, BookOpen, HeartHandshake, ShieldCheck, Stethoscope, Users } from 'lucide-react'

// Bundled public fallback — editable via Education Hub global in Payload admin.
export const EDUCATION_HUB_HERO_IMAGE_DEFAULT =
  '/smiling-doctor-with-clipboard-standing-near-reception-clinic-hall-looking-camera.jpg'
export const EDUCATION_HUB_HERO_ALT =
  'Healthcare professional smiling at a clinic reception desk'

export const SLEEP_STUDY_HREF = '/contact-us'

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

export type HubTopic = {
  id: string
  label: string
  description: string
  categories: string[]
  icon: IconComponent
  accentText: string
  accentBg: string
}

export const HUB_TOPICS: HubTopic[] = [
  {
    id: 'understanding-sleep-disorders',
    label: 'Understanding Sleep Disorders',
    description:
      'Learn about the causes, symptoms and health risks of common sleep disorders.',
    categories: ['sleep-disorders'],
    icon: BookOpen,
    accentText: 'text-ds-pastille-green',
    accentBg: 'bg-ds-pastille-green/10',
  },
  {
    id: 'diagnostics-treatment',
    label: 'Diagnostics & Treatment',
    description:
      'Understand sleep studies, CPAP therapy and how treatment can improve your sleep.',
    categories: ['diagnostics-testing', 'therapies-treatments'],
    icon: Activity,
    accentText: 'text-ds-dark-blue',
    accentBg: 'bg-ds-dark-blue/10',
  },
  {
    id: 'specialist-insights',
    label: 'Specialist Insights',
    description:
      'Expert perspectives from our clinical partners across a range of specialties.',
    categories: ['specialists-insights'],
    icon: Users,
    accentText: 'text-ds-accent-yellow',
    accentBg: 'bg-ds-accent-yellow/10',
  },
]

export const EXTRA_HUB_TOPICS: HubTopic[] = [
  {
    id: 'lifestyle-tips',
    label: 'Lifestyle & Tips',
    description: 'Practical advice to help you sleep and live better.',
    categories: ['lifestyle-tips'],
    icon: BookOpen,
    accentText: 'text-ds-pastille-green',
    accentBg: 'bg-ds-pastille-green/10',
  },
  {
    id: 'featured',
    label: 'Featured In',
    description: 'Where our specialists and services have been featured.',
    categories: ['featured in'],
    icon: Users,
    accentText: 'text-ds-dark-blue',
    accentBg: 'bg-ds-dark-blue/10',
  },
]

export const ALL_HUB_TOPICS: HubTopic[] = [...HUB_TOPICS, ...EXTRA_HUB_TOPICS]

export const HUB_TOPIC_GROUPS = [
  {
    key: 'understandingSleepDisorders',
    id: 'understanding-sleep-disorders',
    adminLabel: 'Understanding Sleep Disorders',
  },
  {
    key: 'diagnosticsTreatment',
    id: 'diagnostics-treatment',
    adminLabel: 'Diagnostics & Treatment',
  },
  {
    key: 'specialistInsights',
    id: 'specialist-insights',
    adminLabel: 'Specialist Insights',
  },
  {
    key: 'lifestyleTips',
    id: 'lifestyle-tips',
    adminLabel: 'Lifestyle & Tips',
  },
  {
    key: 'featured',
    id: 'featured',
    adminLabel: 'Featured In',
  },
] as const

export type HubTopicGroupKey = (typeof HUB_TOPIC_GROUPS)[number]['key']

export function getHubTopicGroupByTopicId(topicId: string) {
  return HUB_TOPIC_GROUPS.find((group) => group.id === topicId)
}

export function getHubTopicById(topicId: string): HubTopic | undefined {
  return ALL_HUB_TOPICS.find((topic) => topic.id === topicId)
}

export function getHubTopicForCategory(category: string): HubTopic | undefined {
  return ALL_HUB_TOPICS.find((topic) => topic.categories.includes(category))
}

export const TRUST_PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Evidence-based content',
    description: 'Our articles are based on the latest clinical evidence.',
  },
  {
    icon: Stethoscope,
    title: 'Written by specialists',
    description: 'Content written and reviewed by sleep experts.',
  },
  {
    icon: HeartHandshake,
    title: 'Patient-focused education',
    description: 'Helping you make informed decisions about your sleep health.',
  },
  {
    icon: Users,
    title: 'Trusted by referrers',
    description: 'We work with GPs and specialists across the UK.',
  },
] as const
