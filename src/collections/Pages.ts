import type { CollectionConfig, Block } from 'payload'
import type { Page } from '@/payload-types'
import { HERO_OVERLAY_DARKNESS_OPTIONS, HERO_TEXT_COLOR_OPTIONS } from '../lib/hero-config'
import { contentBlockFields } from '../app/(frontend)/components/content-block/config'
import { cardSectionFields } from '../app/(frontend)/components/card-section/config'
import { mediaBlockFields } from '../app/(frontend)/components/media-block/config'
import { ctaBlockFields } from '../app/(frontend)/components/cta-block/config'
import { aboutUsSectionFields } from '../app/(frontend)/components/about-us-section/config'
import { partnersBlockFields } from '../app/(frontend)/components/partners-block/config'
import { partnersTextBlockFields } from '../app/(frontend)/components/partners-text-block/config'
import { expandableTableFields } from '../app/(frontend)/components/expandable-table/config'
import { testimonialsFields } from '../app/(frontend)/components/testimonials/config'
import { teamCardsFields } from '../app/(frontend)/components/team-cards/config'
import { blogPostCardsFields } from '../app/(frontend)/components/blog-post-cards/config'
import { carouselFields } from '../app/(frontend)/components/carousel/config'
import { twoCardBlockFields } from '../app/(frontend)/components/two-card-block/config'
import { scrollPostCardsFields } from '../app/(frontend)/components/scroll-post-cards/config'
import { scrollableCards } from '../app/(frontend)/components/scrollable-cards/config'
import { fullWidthBannerFields } from '../app/(frontend)/components/full-width-banner/config'
import { parallaxHeroFields } from '../app/(frontend)/components/parallax-hero/config'
import { singleCardFields } from '@/components/single-card/config'
import { servicesBannerBlockFields } from '../app/(frontend)/components/services-banner-block/config'
import { medicalServicesGridFields } from '../app/(frontend)/components/medical-services-grid/config'
import { contentBlockArrayFields } from '../app/(frontend)/components/content-block-array/config'
import { twoBlocksTextFields } from '../app/(frontend)/components/two-blocks-text/config'
import { scoreAppWidgetFields } from '../app/(frontend)/components/scoreapp-widget/config'
import { sleepAssessmentStepsFields } from '../app/(frontend)/components/sleep-assessment-steps/config'
import { sleepAssessmentFeaturesFields } from '../app/(frontend)/components/sleep-assessment-features/config'
import { notificationBlockFields } from '../app/(frontend)/components/notification-block/config'
import { formBlockFields } from '../app/(frontend)/components/form-block/config'
import { contentBlockV2Fields } from '../app/(frontend)/components/content-block-v2/config'
import { patientsSleepFields } from '../app/(frontend)/components/patients-sleep/config'
import { corporateHealthFields } from '../app/(frontend)/components/corporate-health/config'
import { occupationalHealthFields } from '../app/(frontend)/components/occupational-health/config'
import { cpapBlockFields } from '../app/(frontend)/components/cpap-block/config'
import { sleepApneaIntroStepsFields } from '../app/(frontend)/components/sleep-apnea/components/intro-steps/config'
import { sleepApneaTestOptionsFields } from '../app/(frontend)/components/sleep-apnea/components/test-options/config'
import { sleepApneaReportIncludesFields } from '../app/(frontend)/components/sleep-apnea/components/report-includes/config'
import { sleepApneaAboutHSTFields } from '../app/(frontend)/components/sleep-apnea/components/about-hst/config'
import { sleepApneaWhyIPDFields } from '../app/(frontend)/components/sleep-apnea/components/why-ipd/config'
import { sleepApneaAfterTestFields } from '../app/(frontend)/components/sleep-apnea/components/after-test/config'
import { cbtiBlockFields } from '../app/(frontend)/components/cbti-block/config'
import { msltBlockFields } from '../app/(frontend)/components/mslt-block/config'
import { mwtBlockFields } from '../app/(frontend)/components/mwt-block/config'
import { actigraphyBlockFields } from '../app/(frontend)/components/actigraphy-block/config'
import { vpsgBlockFields } from '../app/(frontend)/components/vpsg-block/config'
import { vpsgEegBlockFields } from '../app/(frontend)/components/vpsg-eeg-block/config'
import { respiratoryPolygrophyBlockFields } from '../app/(frontend)/components/respiratory-polygrophy-block/config'
import { heroBannerBlockFields } from '../app/(frontend)/components/hero-banner-block/config'
import { partnershipBenefitsBlockFields } from '../app/(frontend)/components/partnership-benefits-block/config'
import { highlightSectionBlockFields } from '../app/(frontend)/components/highlight-section-block/config'
import { splitInfoListBlockFields } from '../app/(frontend)/components/split-info-list-block/config'
import { cardListBannerBlockFields } from '../app/(frontend)/components/card-list-banner-block/config'
import { cardBannerBlockFields } from '../app/(frontend)/components/card-banner-block/config'
import { callToActionBannerBlockFields } from '../app/(frontend)/components/call-to-action-banner-block/config'
import { gridCardsFields } from '../app/(frontend)/components/grid-cards/config'
import { buttonFields } from '../app/(frontend)/components/button/config'
import { splitInfoGridBlockFields } from '../app/(frontend)/components/split-info-grid-block/config'
import { cacheTags, revalidateCacheTags } from '@/lib/cache-tags'

// Safely extract authenticated user's role without using `any`
const getUserRoleFromReq = (req: unknown): 'viewer' | 'editor' | 'admin' | undefined => {
  if (!req || typeof req !== 'object' || !('user' in req)) return undefined
  const user = (req as Record<string, unknown>).user
  if (!user || typeof user !== 'object') return undefined
  const role = (user as Record<string, unknown>).role
  if (role === 'viewer' || role === 'editor' || role === 'admin') return role
  return undefined
}

// Create blocks using the existing configs
const contentBlock: Block = { slug: 'contentBlock', fields: contentBlockFields }
const cardSectionBlock: Block = { slug: 'cardSection', fields: cardSectionFields }
const mediaBlock: Block = { slug: 'mediaBlock', fields: mediaBlockFields }
const ctaBlock: Block = { slug: 'ctaBlock', fields: ctaBlockFields }
const aboutUsSectionBlock: Block = { slug: 'aboutUsSection', fields: aboutUsSectionFields }
const partnersBlock: Block = { slug: 'partnersBlock', fields: partnersBlockFields }
const partnersTextBlock: Block = { slug: 'partnersTextBlock', fields: partnersTextBlockFields }
const expandableTableBlock: Block = { slug: 'expandableTable', fields: expandableTableFields }
const testimonialsBlock: Block = { slug: 'testimonials', fields: testimonialsFields }
const teamCardsBlock: Block = { slug: 'teamCards', fields: teamCardsFields }
const blogPostCardsBlock: Block = { slug: 'blogPostCards', fields: blogPostCardsFields }
const scrollPostCardsBlock: Block = { slug: 'scrollPostCards', fields: scrollPostCardsFields }
const scrollableCardsBlock: Block = { slug: 'scrollableCards', fields: scrollableCards.fields }
const carouselBlock: Block = { slug: 'carousel', fields: carouselFields }
const twoCardBlock: Block = { slug: 'twoCardBlock', fields: twoCardBlockFields }
const fullWidthBannerBlock: Block = { slug: 'fullWidthBanner', fields: fullWidthBannerFields }
const parallaxHeroBlock: Block = { slug: 'parallaxHero', fields: parallaxHeroFields }
const singleCardBlock: Block = { slug: 'singleCard', fields: singleCardFields }
const servicesBannerBlock: Block = {
  slug: 'servicesBannerBlock',
  dbName: 'services_banner',
  fields: servicesBannerBlockFields,
}
const medicalServicesGridBlock: Block = {
  slug: 'medicalServicesGrid',
  dbName: 'medical_services',
  fields: medicalServicesGridFields,
}
const contentBlockArrayBlock: Block = {
  slug: 'contentBlockArray',
  dbName: 'content_block_array',
  fields: contentBlockArrayFields,
}
const twoBlocksTextBlock: Block = {
  slug: 'twoBlocksText',
  dbName: 'two_blocks_text',
  fields: twoBlocksTextFields,
}
const scoreAppWidgetBlock: Block = {
  slug: 'scoreAppWidget',
  dbName: 'score_app_widget',
  fields: scoreAppWidgetFields,
}
const sleepAssessmentStepsBlock: Block = {
  slug: 'sleepAssessmentSteps',
  dbName: 'sleep_assessment_steps',
  fields: sleepAssessmentStepsFields,
}
const sleepAssessmentFeaturesBlock: Block = {
  slug: 'sleepAssessmentFeatures',
  dbName: 'sleep_assessment_features',
  fields: sleepAssessmentFeaturesFields,
}
const notificationBlock: Block = {
  slug: 'notificationBlock',
  dbName: 'notification_block',
  fields: notificationBlockFields,
}
const formBlock: Block = {
  slug: 'formBlock',
  dbName: 'form_block',
  fields: formBlockFields,
}
const contentBlockV2: Block = {
  slug: 'contentBlockV2',
  dbName: 'content_block_v2',
  fields: contentBlockV2Fields,
}
const patientsSleepBlock: Block = {
  slug: 'patientsSleep',
  dbName: 'patients_sleep',
  fields: patientsSleepFields,
}
const corporateHealthBlock: Block = {
  slug: 'corporateHealth',
  dbName: 'corporate_health',
  fields: corporateHealthFields,
}
const occupationalHealthBlock: Block = {
  slug: 'occupationalHealth',
  dbName: 'occupational_health',
  fields: occupationalHealthFields,
}
const cpapBlock: Block = {
  slug: 'cpapBlock',
  dbName: 'cpap_block',
  fields: cpapBlockFields,
}
const sleepApneaIntroStepsBlock: Block = {
  slug: 'sleepApneaIntroSteps',
  dbName: 'sleep_apnea_intro_steps',
  fields: sleepApneaIntroStepsFields,
}
const sleepApneaTestOptionsBlock: Block = {
  slug: 'sleepApneaTestOptions',
  dbName: 'sleep_apnea_test_options',
  fields: sleepApneaTestOptionsFields,
}
const sleepApneaReportIncludesBlock: Block = {
  slug: 'sleepApneaReportIncludes',
  dbName: 'sleep_apnea_report_includes',
  fields: sleepApneaReportIncludesFields,
}
const sleepApneaAboutHSTBlock: Block = {
  slug: 'sleepApneaAboutHST',
  dbName: 'sleep_apnea_about_hst',
  fields: sleepApneaAboutHSTFields,
}
const sleepApneaWhyIPDBlock: Block = {
  slug: 'sleepApneaWhyIPD',
  dbName: 'sleep_apnea_why_ipd',
  fields: sleepApneaWhyIPDFields,
}
const sleepApneaAfterTestBlock: Block = {
  slug: 'sleepApneaAfterTest',
  dbName: 'sleep_apnea_after_test',
  fields: sleepApneaAfterTestFields,
}
const cbtiBlock: Block = {
  slug: 'cbtiBlock',
  dbName: 'cbti_block',
  fields: cbtiBlockFields,
}
const msltBlock: Block = {
  slug: 'msltBlock',
  dbName: 'mslt_block',
  fields: msltBlockFields,
}
const mwtBlock: Block = {
  slug: 'mwtBlock',
  dbName: 'mwt_block',
  fields: mwtBlockFields,
}
const actigraphyBlock: Block = {
  slug: 'actigraphyBlock',
  dbName: 'actigraphy_block',
  fields: actigraphyBlockFields,
}
const vpsgBlock: Block = {
  slug: 'vpsgBlock',
  dbName: 'vpsg_block',
  fields: vpsgBlockFields,
}
const vpsgEegBlock: Block = {
  slug: 'vpsgEegBlock',
  dbName: 'vpsg_eeg_block',
  fields: vpsgEegBlockFields,
}
const respiratoryPolygrophyBlock: Block = {
  slug: 'respiratoryPolygrophyBlock',
  dbName: 'respiratory_polygrophy_block',
  fields: respiratoryPolygrophyBlockFields,
}

const heroBannerBlock: Block = {
  slug: 'heroBannerBlock',
  dbName: 'hero_banner_block',
  fields: heroBannerBlockFields,
}

const partnershipBenefitsBlock: Block = {
  slug: 'partnershipBenefitsBlock',
  dbName: 'partnership_benefits_block',
  fields: partnershipBenefitsBlockFields,
}

const highlightSectionBlock: Block = {
  slug: 'highlightSectionBlock',
  dbName: 'highlight_section_block',
  fields: highlightSectionBlockFields,
}

const splitInfoGridBlock: Block = {
  slug: 'splitInfoGridBlock',
  dbName: 'split_info_grid_block',
  fields: splitInfoGridBlockFields,
}

const splitInfoListBlock: Block = {
  slug: 'splitInfoListBlock',
  dbName: 'split_info_list_block',
  fields: splitInfoListBlockFields,
}

const cardListBannerBlock: Block = {
  slug: 'cardListBannerBlock',
  dbName: 'card_list_banner_block',
  fields: cardListBannerBlockFields,
}

const cardBannerBlock: Block = {
  slug: 'cardBannerBlock',
  dbName: 'card_banner_block',
  fields: cardBannerBlockFields,
}

const callToActionBannerBlock: Block = {
  slug: 'callToActionBannerBlock',
  dbName: 'call_to_action_banner_block',
  fields: callToActionBannerBlockFields,
}

const gridCardsBlock: Block = {
  slug: 'gridCards',
  dbName: 'grid_cards',
  fields: gridCardsFields,
}

const buttonBlock: Block = {
  slug: 'button',
  fields: buttonFields,
}

// All available page blocks
const pageBlocks: Block[] = [
  contentBlock,
  cardSectionBlock,
  mediaBlock,
  ctaBlock,
  buttonBlock,
  aboutUsSectionBlock,
  partnersBlock,
  partnersTextBlock,
  expandableTableBlock,
  testimonialsBlock,
  teamCardsBlock,
  blogPostCardsBlock,
  scrollPostCardsBlock,
  scrollableCardsBlock,
  carouselBlock,
  twoCardBlock,
  fullWidthBannerBlock,
  parallaxHeroBlock,
  singleCardBlock,
  servicesBannerBlock,
  medicalServicesGridBlock,
  contentBlockArrayBlock,
  twoBlocksTextBlock,
  scoreAppWidgetBlock,
  sleepAssessmentStepsBlock,
  sleepAssessmentFeaturesBlock,
  notificationBlock,
  formBlock,
  contentBlockV2,
  patientsSleepBlock,
  corporateHealthBlock,
  occupationalHealthBlock,
  cpapBlock,
  sleepApneaIntroStepsBlock,
  sleepApneaTestOptionsBlock,
  sleepApneaReportIncludesBlock,
  sleepApneaAboutHSTBlock,
  sleepApneaWhyIPDBlock,
  sleepApneaAfterTestBlock,
  cbtiBlock,
  msltBlock,
  mwtBlock,
  actigraphyBlock,
  vpsgBlock,
  vpsgEegBlock,
  respiratoryPolygrophyBlock,
  heroBannerBlock,
  partnershipBenefitsBlock,
  highlightSectionBlock,
  splitInfoGridBlock,
  splitInfoListBlock,
  cardListBannerBlock,
  cardBannerBlock,
  callToActionBannerBlock,
  gridCardsBlock,
]

export const Pages: CollectionConfig = {
  slug: 'pages',
  hooks: {
    afterChange: [
      async ({ doc }) => {
        const page = doc as Page | undefined
        if (page?._status && page._status !== 'published') return
        await revalidateCacheTags([cacheTags.pages, cacheTags.page(page?.slug ?? '')])
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        const page = doc as Page | undefined
        await revalidateCacheTags([cacheTags.pages, cacheTags.page(page?.slug ?? '')])
      },
    ],
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    preview: ({ slug }) => {
      const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
      return `${base}/${slug ?? ''}?preview=true`
    },
    livePreview: {
      url: ({ data }) => {
        const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
        const slug = typeof data?.slug === 'string' ? data.slug : ''
        return `${base}/${slug}`
      },
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1280, height: 800 },
      ],
    },
    description: 'Create pages with flexible content blocks',
  },
  versions: { drafts: true },
  lockDocuments: { duration: 600 },
  access: {
    read: ({ req }) => {
      const role = getUserRoleFromReq(req)
      if (role === 'editor' || role === 'admin') return true
      return { _status: { equals: 'published' } }
    },
    create: ({ req }) => {
      const role = getUserRoleFromReq(req)
      return role === 'editor' || role === 'admin'
    },
    update: ({ req }) => {
      const role = getUserRoleFromReq(req)
      return role === 'editor' || role === 'admin'
    },
    delete: ({ req }) => {
      const role = getUserRoleFromReq(req)
      return role === 'admin'
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: { description: 'Page title displayed in the browser tab and page header' },
            },
            {
              name: 'slug',
              type: 'text',
              required: false,
              unique: true,
              index: true,
              admin: { description: 'URL path for this page. Example: about, blog/my-post' },
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Hero Content',
              required: false,
              admin: {
                description: 'Content displayed within the Hero when Show Hero is enabled',
                className: 'hero-content-editor',
              },
            },
            {
              name: 'heroBackground',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero Background Image',
              admin: {
                description:
                  'Optional background image for the Hero section when Show Hero is enabled',
              },
            },
            {
              name: 'showHero',
              type: 'checkbox',
              label: 'Show Hero',
              defaultValue: false,
              admin: {
                description: 'If enabled, the hero is rendered using the Hero Content rich text.',
              },
            },

            {
              name: 'heroTextColor',
              type: 'select',
              label: 'Hero Text Color',
              options: HERO_TEXT_COLOR_OPTIONS,
              defaultValue: 'auto',
              admin: {
                description: 'Text color scheme for hero content',
                condition: (data) => data.showHero,
              },
            },
            {
              name: 'heroGradientOverlay',
              type: 'checkbox',
              label: 'Hero Gradient Overlay',
              defaultValue: false,
              admin: {
                description: 'Add a gradient overlay for better text readability',
                condition: (data) => data.showHero,
              },
            },
            {
              name: 'heroOverlayDarkness',
              type: 'select',
              label: 'Hero Overlay Darkness',
              options: HERO_OVERLAY_DARKNESS_OPTIONS,
              defaultValue: 'medium',
              admin: {
                description: 'Controls the darkness of the overlay when a background image is used',
                condition: (data) => data.showHero,
              },
            },
            {
              name: 'heroCTAButton',
              type: 'group',
              label: 'Hero Primary Button',
              admin: {
                description: 'Primary call-to-action button for the hero section',
                condition: (data) => data.showHero,
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: false,
                  admin: { description: 'Button text' },
                },
                {
                  name: 'linkType',
                  type: 'select',
                  label: 'Link Type',
                  options: [
                    { label: 'Internal', value: 'internal' },
                    { label: 'External', value: 'external' },
                  ],
                  defaultValue: 'internal',
                  admin: { description: 'Choose between internal page/blog or external URL' },
                },
                {
                  name: 'internal',
                  type: 'group',
                  label: 'Internal Link',
                  admin: {
                    description: 'Link to an internal page or blog post',
                    condition: (data, siblingData) => siblingData?.linkType === 'internal',
                  },
                  fields: [
                    {
                      name: 'relation',
                      type: 'relationship',
                      label: 'Select Page or Blog',
                      relationTo: ['pages', 'blogs'],
                      required: false,
                      admin: { description: 'Choose the page or blog to link to' },
                    },
                  ],
                },
                {
                  name: 'external',
                  type: 'group',
                  label: 'External Link',
                  admin: {
                    description: 'Link to an external website',
                    condition: (data, siblingData) => siblingData?.linkType === 'external',
                  },
                  fields: [
                    {
                      name: 'href',
                      type: 'text',
                      required: false,
                      admin: { description: 'External URL (e.g., https://example.com)' },
                    },
                  ],
                },
                {
                  name: 'variant',
                  type: 'select',
                  options: [
                    { label: 'Primary', value: 'primary' },
                    { label: 'Secondary', value: 'secondary' },
                  ],
                  defaultValue: 'primary',
                  admin: { description: 'Button style variant' },
                },
              ],
            },
            {
              name: 'heroSecondaryCTA',
              type: 'group',
              label: 'Hero Secondary Button',
              admin: {
                description: 'Secondary call-to-action button (optional)',
                condition: (data) => data.showHero,
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  admin: { description: 'Button text' },
                },
                {
                  name: 'linkType',
                  type: 'select',
                  label: 'Link Type',
                  options: [
                    { label: 'Internal', value: 'internal' },
                    { label: 'External', value: 'external' },
                  ],
                  defaultValue: 'internal',
                  admin: { description: 'Choose between internal page/blog or external URL' },
                },
                {
                  name: 'internal',
                  type: 'group',
                  label: 'Internal Link',
                  admin: {
                    description: 'Link to an internal page or blog post',
                    condition: (data, siblingData) => siblingData?.linkType === 'internal',
                  },
                  fields: [
                    {
                      name: 'relation',
                      type: 'relationship',
                      label: 'Select Page or Blog',
                      relationTo: ['pages', 'blogs'],
                      required: false,
                      admin: { description: 'Choose the page or blog to link to' },
                    },
                  ],
                },
                {
                  name: 'external',
                  type: 'group',
                  label: 'External Link',
                  admin: {
                    description: 'Link to an external website',
                    condition: (data, siblingData) => siblingData?.linkType === 'external',
                  },
                  fields: [
                    {
                      name: 'href',
                      type: 'text',
                      required: false,
                      admin: { description: 'External URL (e.g., https://example.com)' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'heroCTAAlignment',
              type: 'select',
              label: 'Hero CTA Button Alignment',
              options: [
                { label: 'Left Aligned', value: 'left' },
                { label: 'Centered', value: 'center' },
                { label: 'Right Aligned', value: 'right' },
              ],
              defaultValue: 'left',
              admin: {
                description: 'Choose the alignment for the hero CTA buttons',
                condition: (data) => data.showHero,
              },
            },
            {
              name: 'heroFullHeight',
              type: 'checkbox',
              label: 'Full Height Hero',
              defaultValue: false,
              admin: {
                description:
                  'Make the hero section take up the full viewport height (100vh) with animations',
                condition: (data) => data.showHero,
              },
            },
            {
              name: 'showHeroStatsCard',
              type: 'checkbox',
              label: 'Show Hero Statistics Card',
              defaultValue: false,
              admin: {
                description: 'Display a statistics card in the hero section',
                condition: (data) => data.showHero,
              },
            },
            {
              name: 'heroStatsCard',
              type: 'group',
              label: 'Hero Statistics Card',
              admin: {
                description: 'Configure the statistics card displayed in the hero section',
                condition: (data) => data.showHero && data.showHeroStatsCard,
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Sleep Disorder Statistics',
                  admin: { description: 'Main title for the statistics card' },
                },
                {
                  name: 'statisticLabel',
                  type: 'text',
                  defaultValue: 'Sleep Apnoea Cases Worldwide',
                  admin: {
                    description: 'Label for the statistic (e.g., "Sleep Apnoea Cases Worldwide")',
                  },
                },
                {
                  name: 'statisticValue',
                  type: 'text',
                  defaultValue: '1 Billion',
                  admin: { description: 'The statistic value (e.g., "1 Billion", "50%", "2.5M")' },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Nearly one billion people worldwide live with sleep apnoea, yet many remain undiagnosed.',
                  admin: { description: 'Descriptive text below the statistic' },
                },
                {
                  name: 'progressPercentage',
                  type: 'number',
                  defaultValue: 85,
                  min: 0,
                  max: 100,
                  admin: { description: 'Progress bar percentage (0-100)' },
                },
              ],
            },
          ],
        },
        {
          label: 'Blocks',
          fields: [
            {
              name: 'blocks',
              type: 'blocks',
              label: 'Content Blocks',
              blocks: pageBlocks,
              admin: { description: 'Add flexible content blocks to build your page layout' },
            },
          ],
        },
      ],
    },
  ],
}
