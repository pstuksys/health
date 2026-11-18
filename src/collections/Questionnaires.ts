import type { CollectionConfig, Field } from 'payload'
import { cacheTags, revalidateCacheTags } from '@/lib/cache-tags'
import {
  checkResultRanges,
  type ScoringQuestion,
  type ScoringResult,
} from '@/lib/questionnaires/scoring'

const isEditor = (role?: string) => role === 'editor' || role === 'admin'
const roleOf = (user: unknown) => (user as { role?: string } | null | undefined)?.role

// Pages embed their questionnaire, so any change must refresh cached pages
const revalidatePages = async () => {
  await revalidateCacheTags(cacheTags.pages)
}

const questionsField: Field = {
  name: 'questions',
  type: 'array',
  required: true,
  minRows: 1,
  admin: { initCollapsed: true },
  fields: [
    { name: 'text', type: 'text', required: true },
    {
      name: 'answers',
      type: 'array',
      required: true,
      minRows: 2,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'points', type: 'number', required: true, defaultValue: 0, min: 0 },
          ],
        },
      ],
    },
  ],
}

const resultsField: Field = {
  name: 'results',
  type: 'array',
  required: true,
  minRows: 1,
  admin: {
    initCollapsed: true,
    description:
      'Each possible section score must fall in exactly one result. The score is the sum of the chosen answers’ points in this section.',
  },
  validate: (value, { siblingData }) => {
    const questions = (siblingData as { questions?: ScoringQuestion[] }).questions ?? []
    return checkResultRanges(questions, (value as ScoringResult[] | null) ?? []) ?? true
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'label', type: 'text', required: true, admin: { placeholder: 'Low risk' } },
        {
          name: 'level',
          type: 'select',
          required: true,
          defaultValue: 'low',
          options: [
            { label: 'Low (green)', value: 'low' },
            { label: 'Medium (yellow)', value: 'medium' },
            { label: 'High (dark blue)', value: 'high' },
          ],
        },
        { name: 'minScore', type: 'number', required: true, min: 0 },
        { name: 'maxScore', type: 'number', required: true, min: 0 },
      ],
    },
    { name: 'headline', type: 'text', required: true },
    { name: 'content', type: 'richText' },
  ],
}

export const Questionnaires: CollectionConfig = {
  slug: 'questionnaires',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'updatedAt'],
    description:
      'Scored questionnaires (e.g. sleep screeners). Add one to a page with the Sleep screener block.',
  },
  access: {
    read: () => true,
    create: ({ req }) => isEditor(roleOf(req.user)),
    update: ({ req }) => isEditor(roleOf(req.user)),
    delete: ({ req }) => roleOf(req.user) === 'admin',
  },
  hooks: {
    afterChange: [revalidatePages],
    afterDelete: [revalidatePages],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'sections',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description:
          'Each section is scored separately and gets its own result (e.g. Sleep apnoea, Insomnia). Visitors answer all sections in one go.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: { description: 'Shown above its questions and its result' },
        },
        questionsField,
        resultsField,
      ],
    },
  ],
}
