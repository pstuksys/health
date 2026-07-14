import type { Field, GlobalConfig } from 'payload'
import { createIconSelectField } from '@/lib/icons/icon-map'
import { cacheTags, revalidateCacheTags } from '@/lib/cache-tags'
import { getHubTopicById, HUB_TOPIC_GROUPS } from '@/lib/education-hub/constants'

function createTopicGroupFields(topicId: string): Field[] {
  const defaults = getHubTopicById(topicId)

  return [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Show on hub',
      defaultValue: true,
    },
    {
      name: 'label',
      type: 'text',
      label: 'Card title',
      required: true,
      defaultValue: defaults?.label,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Card description',
      required: true,
      defaultValue: defaults?.description,
    },
  ]
}

export const EducationHub: GlobalConfig = {
  slug: 'education-hub',
  label: 'Education Hub',
  access: { read: () => true },
  hooks: {
    afterChange: [
      async () => {
        await revalidateCacheTags(cacheTags.educationHub)
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  defaultValue: 'Sleep Education Hub',
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Expert education. Better sleep. Better health.',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Evidence-based information to help you understand sleep disorders, your treatment options and the care available to you.',
                },
                {
                  name: 'ctaLabel',
                  type: 'text',
                  defaultValue: 'Explore Articles',
                },
                {
                  name: 'ctaHref',
                  type: 'text',
                  defaultValue: '#explore-topics',
                  admin: {
                    description: 'Internal path or anchor (e.g. #explore-topics) or full URL.',
                  },
                },
                {
                  name: 'imageDesktop',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Hero image (desktop)',
                  admin: {
                    description:
                      'Wide crop recommended. Falls back to the bundled public image when empty.',
                  },
                },
                {
                  name: 'imageMobile',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Hero image (mobile)',
                  admin: {
                    description:
                      'Taller crop recommended. Falls back to desktop image, then the bundled public image.',
                  },
                },
                {
                  name: 'imageAlt',
                  type: 'text',
                  defaultValue:
                    'Healthcare professional smiling at a clinic reception desk',
                },
              ],
            },
          ],
        },
        {
          label: 'Topics',
          fields: [
            {
              name: 'exploreTopics',
              type: 'group',
              admin: {
                description:
                  'Each topic is fixed in the site. Edit the card title and description, or hide a topic from the hub. Article categories and URLs are managed automatically.',
              },
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  defaultValue: 'Explore by topic',
                },
                ...HUB_TOPIC_GROUPS.map(
                  (topic): Field => ({
                    name: topic.key,
                    type: 'group',
                    label: topic.adminLabel,
                    admin: {
                      description: `Articles route: /education-hub/topics/${topic.id}`,
                    },
                    fields: createTopicGroupFields(topic.id),
                  }),
                ),
              ],
            },
          ],
        },
        {
          label: 'Trust & CTAs',
          fields: [
            {
              name: 'trustedEducation',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Why trusted education matters',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Accurate, easy-to-understand information helps you make confident decisions about your sleep health. Our content is written and reviewed by experienced clinicians and specialists.',
                },
              ],
            },
            {
              name: 'trustPillars',
              type: 'array',
              label: 'Trust pillars',
              defaultValue: [
                {
                  icon: 'ShieldCheck',
                  title: 'Evidence-based content',
                  description: 'Our articles are based on the latest clinical evidence.',
                },
                {
                  icon: 'Stethoscope',
                  title: 'Written by specialists',
                  description: 'Content written and reviewed by sleep experts.',
                },
                {
                  icon: 'HeartHandshake',
                  title: 'Patient-focused education',
                  description: 'Helping you make informed decisions about your sleep health.',
                },
                {
                  icon: 'Users',
                  title: 'Trusted by referrers',
                  description: 'We work with GPs and specialists across the UK.',
                },
              ],
              fields: [
                createIconSelectField({ name: 'icon', required: true }),
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
            {
              name: 'sleepAssessment',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Need a Sleep Assessment?',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'If you think you may have a sleep disorder, our team can help connect you with an appropriate specialist and guide you towards the right next steps.',
                },
                {
                  name: 'ctaLabel',
                  type: 'text',
                  defaultValue: 'Book a Sleep Study',
                },
                {
                  name: 'ctaHref',
                  type: 'text',
                  defaultValue: '/contact-us',
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metadata',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Sleep Education Hub | IPDiagnostics',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Evidence-based articles and specialist insights on sleep disorders, diagnostics and treatment from IPDiagnostics.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
