import React, { JSX } from 'react'
import type { Page } from '@/payload-types'
import { mediaToUrl } from '@/lib/media'
import { resolveLinkHref } from '@/lib/navigation'
import {
  normalizeHeroOverlayDarkness,
  normalizeHeroTextColor,
  type HeroOverlayDarkness,
  type HeroTextColor,
} from '@/lib/hero-config'
import { ContentBlock } from './content-block/component'
import { CardSection } from './card-section/component'
import { MediaBlock } from './media-block/component'
import { CTABlock } from './cta-block/component'
import { AboutUsSection } from './about-us-section/component'
import { PartnersBlock } from './partners-block/component'
import { PartnersTextBlock } from './partners-text-block/component'
import { ExpandableTable } from './expandable-table/component'
import { Testimonials } from './testimonials/component'
import { BlogPostCards } from './blog-post-cards/component'
import { Carousel } from './carousel/component'
import { ScrollPostCards } from './scroll-post-cards/component'
import { ScrollableCards } from './scrollable-cards/component'
import { TwoCardBlock } from './two-card-block/component'
import { TeamCards } from './team-cards/component'
import { FullWidthBanner } from './full-width-banner/component'
import { ParallaxHero } from './parallax-hero/component'
import { SingleCard } from './single-card/component'
import { ServicesBannerBlock } from './services-banner-block/component'
import { MedicalServicesGrid } from './medical-services-grid/component'
import { ContentBlockArray } from './content-block-array/component'
import { TwoBlocksText } from './two-blocks-text/component'
import { ScoreAppWidget } from './scoreapp-widget/component'
import { SleepAssessmentSteps } from './sleep-assessment-steps/component'
import { SleepAssessmentFeatures } from './sleep-assessment-features/component'
import { NotificationBlock } from './notification-block/component'
import { FormBlock } from './form-block/component'
import { ContentBlockV2 } from './content-block-v2/component'
import { CorporateHealth } from './corporate-health/component'
import { OccupationalHealth } from './occupational-health/component'
import { CPAPBlock } from './cpap-block/component'
import { PatientsSleep } from './patients-sleep/component'
import { SleepApneaIntroSteps } from './sleep-apnea/components/intro-steps/component'
import { SleepApneaTestOptions } from './sleep-apnea/components/test-options/component'
import { SleepApneaReportIncludes } from './sleep-apnea/components/report-includes/component'
import { SleepApneaAboutHST } from './sleep-apnea/components/about-hst/component'
import { SleepApneaWhyIPD } from './sleep-apnea/components/why-ipd/component'
import { SleepApneaAfterTest } from './sleep-apnea/components/after-test/component'
import { CBTIBlock } from './cbti-block/component'
import { MSLTBlock } from './mslt-block/component'
import { MWTBlock } from './mwt-block/component'
import { ActigraphyBlock } from './actigraphy-block/component'
import { VPSGBlock } from './vpsg-block/component'
import { VPSGEEGBlock } from './vpsg-eeg-block/component'
import { RespiratoryPolygrophyBlock } from './respiratory-polygrophy-block/component'
import HeroBannerBlock from './hero-banner-block/component'
import PartnershipBenefitsBlock from './partnership-benefits-block/component'
import HighlightSectionBlock from './highlight-section-block/component'
import { SplitInfoGridBlock } from './split-info-grid-block/component'
import { CardListBannerBlock } from './card-list-banner-block/component'
import { CardBannerBlock } from './card-banner-block/component'
import { CallToActionBannerBlock } from './call-to-action-banner-block/component'
import { SplitInfoListBlock } from './split-info-list-block/component'
import { GridCards } from './grid-cards/component'
import { Button, type ButtonBlockProps } from './button/component'

type PageBlock = NonNullable<Page['blocks']>[number]

type ButtonBlockData = ButtonBlockProps & {
  blockType: 'button'
  id?: string
}

export const blockComponents: Record<string, (block: unknown) => JSX.Element> = {
  heroBannerBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'heroBannerBlock' }>
    return <HeroBannerBlock {...b} />
  },
  partnershipBenefitsBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'partnershipBenefitsBlock' }>
    return <PartnershipBenefitsBlock {...b} />
  },
  highlightSectionBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'highlightSectionBlock' }>
    return <HighlightSectionBlock {...b} />
  },
  splitInfoGridBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'splitInfoGridBlock' }>
    return <SplitInfoGridBlock {...b} />
  },
  splitInfoListBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'splitInfoListBlock' }>
    return <SplitInfoListBlock {...b} />
  },
  cardListBannerBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'cardListBannerBlock' }>
    return <CardListBannerBlock {...b} />
  },
  cardBannerBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'cardBannerBlock' }>
    return <CardBannerBlock {...b} />
  },
  callToActionBannerBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'callToActionBannerBlock' }>
    return <CallToActionBannerBlock {...b} />
  },
  button: (block) => {
    const b = block as ButtonBlockData
    return <Button {...b} />
  },
  gridCards: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'gridCards' }>
    return <GridCards {...b} />
  },
  contentBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'contentBlock' }>
    return <ContentBlock {...b} />
  },
  cardSection: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'cardSection' }>
    return <CardSection {...b} />
  },
  mediaBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'mediaBlock' }>
    return <MediaBlock {...b} />
  },
  ctaBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'ctaBlock' }>
    return <CTABlock {...(b as any)} />
  },
  aboutUsSection: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'aboutUsSection' }>
    return <AboutUsSection {...b} />
  },
  partnersBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'partnersBlock' }>
    return <PartnersBlock {...b} />
  },
  partnersTextBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'partnersTextBlock' }>
    return <PartnersTextBlock {...b} />
  },
  expandableTable: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'expandableTable' }>
    return <ExpandableTable {...b} />
  },
  testimonials: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'testimonials' }>
    return <Testimonials {...b} />
  },
  teamCards: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'teamCards' }>
    return <TeamCards {...b} />
  },
  blogPostCards: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'blogPostCards' }>
    return <BlogPostCards {...(b as any)} />
  },
  scrollPostCards: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'scrollPostCards' }>
    return <ScrollPostCards {...b} />
  },
  carousel: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'carousel' }>
    return <Carousel {...b} />
  },
  scrollableCards: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'scrollableCards' }>
    return <ScrollableCards {...b} />
  },
  singleCard: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'singleCard' }>
    return <SingleCard {...b} />
  },
  fullWidthBanner: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'fullWidthBanner' }>
    return <FullWidthBanner {...b} />
  },
  parallaxHero: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'parallaxHero' }>
    return <ParallaxHero {...b} />
  },
  twoCardBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'twoCardBlock' }>
    return <TwoCardBlock {...b} />
  },
  servicesBannerBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'servicesBannerBlock' }>
    return <ServicesBannerBlock {...b} />
  },
  medicalServicesGrid: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'medicalServicesGrid' }>
    return <MedicalServicesGrid {...b} />
  },
  contentBlockArray: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'contentBlockArray' }>
    return <ContentBlockArray {...b} />
  },
  twoBlocksText: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'twoBlocksText' }>
    return <TwoBlocksText {...b} />
  },
  scoreAppWidget: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'scoreAppWidget' }>
    return <ScoreAppWidget {...b} />
  },
  sleepAssessmentSteps: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'sleepAssessmentSteps' }>
    return <SleepAssessmentSteps {...b} />
  },
  sleepAssessmentFeatures: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'sleepAssessmentFeatures' }>
    return <SleepAssessmentFeatures {...b} />
  },
  notificationBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'notificationBlock' }>
    return <NotificationBlock {...b} />
  },
  formBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'formBlock' }>
    return <FormBlock {...(b as any)} />
  },
  contentBlockV2: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'contentBlockV2' }>
    return <ContentBlockV2 {...(b as any)} />
  },
  patientsSleep: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'patientsSleep' }>
    return <PatientsSleep {...b} />
  },
  corporateHealth: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'corporateHealth' }>
    return <CorporateHealth {...(b as any)} />
  },
  occupationalHealth: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'occupationalHealth' }>
    return <OccupationalHealth {...(b as any)} />
  },
  cpapBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'cpapBlock' }>
    return <CPAPBlock {...b} />
  },
  sleepApneaIntroSteps: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'sleepApneaIntroSteps' }>
    return <SleepApneaIntroSteps {...b} />
  },
  sleepApneaTestOptions: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'sleepApneaTestOptions' }>
    return <SleepApneaTestOptions {...b} />
  },
  sleepApneaReportIncludes: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'sleepApneaReportIncludes' }>
    return <SleepApneaReportIncludes {...(b as any)} />
  },
  sleepApneaAboutHST: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'sleepApneaAboutHST' }>
    return <SleepApneaAboutHST {...(b as any)} />
  },
  sleepApneaWhyIPD: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'sleepApneaWhyIPD' }>
    return <SleepApneaWhyIPD {...(b as any)} />
  },
  sleepApneaAfterTest: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'sleepApneaAfterTest' }>
    return <SleepApneaAfterTest {...(b as any)} />
  },
  cbtiBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'cbtiBlock' }>
    return <CBTIBlock {...b} />
  },
  msltBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'msltBlock' }>
    return <MSLTBlock {...b} />
  },
  mwtBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'mwtBlock' }>
    return <MWTBlock {...(b as any)} />
  },
  actigraphyBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'actigraphyBlock' }>
    return <ActigraphyBlock {...(b as any)} />
  },
  vpsgBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'vpsgBlock' }>
    return <VPSGBlock {...(b as any)} />
  },
  vpsgEegBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'vpsgEegBlock' }>
    return <VPSGEEGBlock {...(b as any)} />
  },
  respiratoryPolygrophyBlock: (block) => {
    const b = block as Extract<PageBlock, { blockType: 'respiratoryPolygrophyBlock' }>
    return <RespiratoryPolygrophyBlock {...(b as any)} />
  },
}

export function RenderBlocks({ blocks }: { blocks: Page['blocks'] | null | undefined }) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => (
        <BlockRenderer
          key={(block as { id?: string }).id ?? `${block.blockType}-${index}`}
          block={block}
        />
      ))}
    </>
  )
}

function BlockRenderer({ block }: { block: PageBlock }) {
  const renderer = blockComponents[block.blockType]
  if (renderer) return renderer(block)

  // Basic recursion support: if a custom block contains nested `blocks`, render them
  if (
    'blocks' in (block as Record<string, unknown>) &&
    Array.isArray((block as { blocks?: Page['blocks'] }).blocks)
  ) {
    return (
      <div>
        <RenderBlocks blocks={(block as { blocks?: Page['blocks'] }).blocks} />
      </div>
    )
  }

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ border: '1px dashed #ccc', padding: '1rem', borderRadius: 8 }}>
        Unknown block type: <code>{(block as any).blockType}</code>
      </div>
    </div>
  )
}

export function hasHeroBlock(blocks: Page['blocks'] | null | undefined): boolean {
  return (
    Array.isArray(blocks) &&
    blocks.some((b) => (b as { blockType: string }).blockType === 'heroSection')
  )
}

export function deriveGlobalHeroProps(page: Page) {
  // Prefer raw Lexical content for RichText; fallback to plain description string
  const subtitleRaw: Page['content'] | string =
    page?.content ?? (page?.meta?.description ?? '').trim()
  const bg = mediaToUrl(page?.heroBackground ?? page?.meta?.image)

  // Extract hero configuration from Pages collection fields with proper type safety
  const heroTextColor: HeroTextColor = normalizeHeroTextColor(page?.heroTextColor)

  const heroGradientOverlay = Boolean(page?.heroGradientOverlay)
  const heroOverlayDarkness: HeroOverlayDarkness = normalizeHeroOverlayDarkness(
    page?.heroOverlayDarkness,
  )

  // Extract CTA button data
  const heroCTAButton = page?.heroCTAButton
  const heroSecondaryCTA = page?.heroSecondaryCTA

  // Extract CTA alignment with type narrowing
  const rawCTAAlignment = page?.heroCTAAlignment
  const heroCTAAlignment: 'left' | 'center' | 'right' =
    rawCTAAlignment === 'left' || rawCTAAlignment === 'center' || rawCTAAlignment === 'right'
      ? rawCTAAlignment
      : 'left'

  // Extract full height setting
  const heroFullHeight = Boolean(page?.heroFullHeight)

  // Extract statistics card settings
  const showHeroStatsCard = Boolean(page?.showHeroStatsCard)
  const heroStatsCard = page?.heroStatsCard

  const ctaButton = heroCTAButton
    ? {
        label: heroCTAButton.label || '',
        href: resolveLinkHref({
          linkType: heroCTAButton.linkType,
          internal: heroCTAButton.internal,
          external: heroCTAButton.external,
        }),
        variant: heroCTAButton.variant || 'primary',
      }
    : undefined

  const secondaryCTA = heroSecondaryCTA
    ? {
        label: heroSecondaryCTA.label || '',
        href: resolveLinkHref({
          linkType: heroSecondaryCTA.linkType,
          internal: heroSecondaryCTA.internal,
          external: heroSecondaryCTA.external,
        }),
      }
    : undefined

  return {
    subtitle: subtitleRaw,
    backgroundImage: bg,
    ctaButton,
    secondaryCTA,
    gradientOverlay: heroGradientOverlay,
    overlayDarkness: heroOverlayDarkness,
    textColor: heroTextColor,
    ctaAlignment: heroCTAAlignment,
    fullHeight: heroFullHeight,
    showStatsCard: showHeroStatsCard,
    statsCard: heroStatsCard,
  }
}
