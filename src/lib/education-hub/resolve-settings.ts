import type { EducationHub as EducationHubGlobal, Media } from '@/payload-types'
import { iconMap, type IconKey, type LucideIcon } from '@/lib/icons/icon-map'
import { mediaToUrl } from '@/lib/media'
import {
  ALL_HUB_TOPICS,
  EDUCATION_HUB_HERO_ALT,
  EDUCATION_HUB_HERO_IMAGE_DEFAULT,
  getHubTopicById,
  getHubTopicGroupByTopicId,
  HUB_TOPIC_GROUPS,
  SLEEP_STUDY_HREF,
  TRUST_PILLARS,
  type HubTopic,
  type HubTopicGroupKey,
} from './constants'

type TopicGroupOverrides = {
  enabled?: boolean | null
  label?: string | null
  description?: string | null
}

function getTopicGroupOverrides(
  global: EducationHubGlobal | null,
  key: HubTopicGroupKey,
): TopicGroupOverrides | undefined {
  const exploreTopics = global?.exploreTopics
  if (!exploreTopics) return undefined

  return exploreTopics[key]
}

function resolveTopicFromGroup(
  topicId: string,
  overrides: TopicGroupOverrides | undefined,
): HubTopic | null {
  const base = getHubTopicById(topicId)
  if (!base) return null
  if (overrides?.enabled === false) return null

  return {
    ...base,
    label: overrides?.label?.trim() || base.label,
    description: overrides?.description?.trim() || base.description,
  }
}

export type ResolvedHeroSettings = {
  eyebrow: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  imageDesktop: string
  imageMobile: string
  imageAlt: string
}

export type ResolvedTrustPillar = {
  icon: LucideIcon
  title: string
  description: string
}

export type ResolvedEducationHubSettings = {
  hero: ResolvedHeroSettings
  exploreTopicsHeading: string
  exploreTopics: HubTopic[]
  trustedEducation: {
    title: string
    description: string
  }
  trustPillars: ResolvedTrustPillar[]
  sleepAssessment: {
    title: string
    description: string
    ctaLabel: string
    ctaHref: string
  }
  metadata: {
    title: string
    description: string
  }
}

const DEFAULT_HERO: ResolvedHeroSettings = {
  eyebrow: 'Sleep Education Hub',
  title: 'Expert education. Better sleep. Better health.',
  description:
    'Evidence-based information to help you understand sleep disorders, your treatment options and the care available to you.',
  ctaLabel: 'Explore Articles',
  ctaHref: '#explore-topics',
  imageDesktop: EDUCATION_HUB_HERO_IMAGE_DEFAULT,
  imageMobile: EDUCATION_HUB_HERO_IMAGE_DEFAULT,
  imageAlt: EDUCATION_HUB_HERO_ALT,
}

const DEFAULT_TRUSTED_EDUCATION = {
  title: 'Why trusted education matters',
  description:
    'Accurate, easy-to-understand information helps you make confident decisions about your sleep health. Our content is written and reviewed by experienced clinicians and specialists.',
}

const DEFAULT_SLEEP_ASSESSMENT = {
  title: 'Need a Sleep Assessment?',
  description:
    'If you think you may have a sleep disorder, our team can help connect you with an appropriate specialist and guide you towards the right next steps.',
  ctaLabel: 'Book a Sleep Study',
  ctaHref: SLEEP_STUDY_HREF,
}

const DEFAULT_METADATA = {
  title: 'Sleep Education Hub | IPDiagnostics',
  description:
    'Evidence-based articles and specialist insights on sleep disorders, diagnostics and treatment from IPDiagnostics.',
}

function resolveHeroImage(
  upload: number | Media | null | undefined,
  fallback: string,
): string {
  const url = mediaToUrl(upload)
  return url === '/placeholder.svg' ? fallback : url
}

function resolveTrustPillarIcon(iconKey: string | null | undefined, index: number): LucideIcon {
  if (iconKey && iconKey in iconMap) {
    return iconMap[iconKey as IconKey]
  }
  return TRUST_PILLARS[index]?.icon ?? iconMap.HeartHandshake
}

function resolveExploreTopics(global: EducationHubGlobal | null): HubTopic[] {
  const resolved = HUB_TOPIC_GROUPS.map(({ key, id }) =>
    resolveTopicFromGroup(id, getTopicGroupOverrides(global, key)),
  ).filter((topic): topic is HubTopic => topic !== null)

  return resolved.length > 0 ? resolved : ALL_HUB_TOPICS
}

export function resolveTopicSettings(
  global: EducationHubGlobal | null,
  topicId: string,
): HubTopic | undefined {
  const group = getHubTopicGroupByTopicId(topicId)
  if (!group) return getHubTopicById(topicId)

  return (
    resolveTopicFromGroup(topicId, getTopicGroupOverrides(global, group.key)) ??
    getHubTopicById(topicId)
  )
}

export function resolveEducationHubSettings(
  global: EducationHubGlobal | null,
): ResolvedEducationHubSettings {
  const heroDesktopFromCms = global?.hero?.imageDesktop
    ? resolveHeroImage(global.hero.imageDesktop, EDUCATION_HUB_HERO_IMAGE_DEFAULT)
    : EDUCATION_HUB_HERO_IMAGE_DEFAULT

  const heroMobileFromCms = global?.hero?.imageMobile
    ? resolveHeroImage(global.hero.imageMobile, heroDesktopFromCms)
    : heroDesktopFromCms

  const hero: ResolvedHeroSettings = {
    eyebrow: global?.hero?.eyebrow?.trim() || DEFAULT_HERO.eyebrow,
    title: global?.hero?.title?.trim() || DEFAULT_HERO.title,
    description: global?.hero?.description?.trim() || DEFAULT_HERO.description,
    ctaLabel: global?.hero?.ctaLabel?.trim() || DEFAULT_HERO.ctaLabel,
    ctaHref: global?.hero?.ctaHref?.trim() || DEFAULT_HERO.ctaHref,
    imageDesktop: heroDesktopFromCms,
    imageMobile: heroMobileFromCms,
    imageAlt: global?.hero?.imageAlt?.trim() || DEFAULT_HERO.imageAlt,
  }

  const cmsPillars = global?.trustPillars
  const trustPillars: ResolvedTrustPillar[] =
    cmsPillars && cmsPillars.length > 0
      ? cmsPillars.map((pillar, index) => ({
          icon: resolveTrustPillarIcon(pillar.icon, index),
          title: pillar.title?.trim() || TRUST_PILLARS[index]?.title || '',
          description: pillar.description?.trim() || TRUST_PILLARS[index]?.description || '',
        }))
      : TRUST_PILLARS.map((pillar) => ({
          icon: pillar.icon,
          title: pillar.title,
          description: pillar.description,
        }))

  return {
    hero,
    exploreTopicsHeading: global?.exploreTopics?.heading?.trim() || 'Explore by topic',
    exploreTopics: resolveExploreTopics(global),
    trustedEducation: {
      title: global?.trustedEducation?.title?.trim() || DEFAULT_TRUSTED_EDUCATION.title,
      description:
        global?.trustedEducation?.description?.trim() || DEFAULT_TRUSTED_EDUCATION.description,
    },
    trustPillars,
    sleepAssessment: {
      title: global?.sleepAssessment?.title?.trim() || DEFAULT_SLEEP_ASSESSMENT.title,
      description:
        global?.sleepAssessment?.description?.trim() || DEFAULT_SLEEP_ASSESSMENT.description,
      ctaLabel: global?.sleepAssessment?.ctaLabel?.trim() || DEFAULT_SLEEP_ASSESSMENT.ctaLabel,
      ctaHref: global?.sleepAssessment?.ctaHref?.trim() || DEFAULT_SLEEP_ASSESSMENT.ctaHref,
    },
    metadata: {
      title: global?.metadata?.title?.trim() || DEFAULT_METADATA.title,
      description: global?.metadata?.description?.trim() || DEFAULT_METADATA.description,
    },
  }
}
