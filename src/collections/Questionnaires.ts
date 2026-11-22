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
  label: 'Questions',
  labels: { singular: 'Question', plural: 'Questions' },
  type: 'array',
  required: true,
  minRows: 1,
  admin: {
    initCollapsed: true,
    description:
      'Visitors see one question at a time and pick one answer. Each answer is worth some points, which add up to this section’s score.',
  },
  fields: [
    {
      name: 'text',
      label: 'Question',
      type: 'text',
      required: true,
      admin: { placeholder: 'Do you snore loudly?' },
    },
    {
      name: 'answers',
      label: 'Answer options',
      labels: { singular: 'Answer', plural: 'Answers' },
      type: 'array',
      required: true,
      minRows: 2,
      admin: {
        description:
          'The choices visitors can pick from (at least 2). Give more points to answers that point to a higher risk; 0 points means it doesn’t count.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              label: 'Answer',
              type: 'text',
              required: true,
              admin: { placeholder: 'Yes' },
            },
            {
              name: 'points',
              label: 'Points',
              type: 'number',
              required: true,
              defaultValue: 0,
              min: 0,
            },
          ],
        },
      ],
    },
  ],
}

const resultsField: Field = {
  name: 'results',
  label: 'Results',
  labels: { singular: 'Result', plural: 'Results' },
  type: 'array',
  required: true,
  minRows: 1,
  admin: {
    initCollapsed: true,
    description:
      'What visitors see after answering, based on this section’s score (the points of their answers added up). Each result covers a score range, e.g. 0–2 low risk, 3–4 medium, 5–8 high. Together the ranges must cover every possible score once, from 0 to the highest possible total; you’ll get a message on save if any score is missing or covered twice.',
  },
  validate: (value, { siblingData }) => {
    const questions = (siblingData as { questions?: ScoringQuestion[] }).questions ?? []
    return checkResultRanges(questions, (value as ScoringResult[] | null) ?? []) ?? true
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          label: 'Result name',
          type: 'text',
          required: true,
          admin: { placeholder: 'Low risk', description: 'Short badge text, e.g. "Low risk"' },
        },
        {
          name: 'level',
          label: 'Risk level',
          type: 'select',
          required: true,
          defaultValue: 'low',
          options: [
            { label: 'Low (green)', value: 'low' },
            { label: 'Medium (yellow)', value: 'medium' },
            { label: 'High (dark blue)', value: 'high' },
          ],
          admin: { description: 'Sets the colour and where the marker sits on the risk bar' },
        },
        {
          name: 'minScore',
          label: 'From score',
          type: 'number',
          required: true,
          min: 0,
        },
        {
          name: 'maxScore',
          label: 'To score',
          type: 'number',
          required: true,
          min: 0,
          admin: { description: 'Inclusive: "From 3 to 4" means scores 3 and 4' },
        },
      ],
    },
    {
      name: 'headline',
      label: 'Headline',
      type: 'text',
      required: true,
      admin: {
        description: 'One sentence summing up the result, e.g. "Your answers suggest a low risk of sleep apnoea."',
      },
    },
    {
      name: 'content',
      label: 'More detail',
      type: 'richText',
      admin: { description: 'Optional: what this result means and what to do next.' },
    },
  ],
}

export const Questionnaires: CollectionConfig = {
  slug: 'questionnaires',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'updatedAt'],
    description:
      'Self-check questionnaires such as the sleep screener. Visitors answer the questions, their answers add up to a score, and the score decides which result they see. Answers are never saved or tracked. To show a questionnaire, add the Questionnaire block to a page and pick it there.',
  },
  labels: { singular: 'Questionnaire', plural: 'Questionnaires' },
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
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      admin: {
        description:
          'Only for finding it in the admin and in the Questionnaire block; visitors don’t see it.',
      },
    },
    {
      name: 'sections',
      label: 'Sections',
      labels: { singular: 'Section', plural: 'Sections' },
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description:
          'A section is one topic with its own questions and its own result, e.g. "Sleep apnoea" and "Insomnia" in the sleep screener. Visitors go through all sections in one go and then see one result per section. A simple questionnaire needs just one section.',
      },
      fields: [
        {
          name: 'title',
          label: 'Section title',
          type: 'text',
          required: true,
          admin: {
            description:
              'Shown to visitors above this section’s questions and its result, e.g. "Sleep apnoea".',
          },
        },
        questionsField,
        resultsField,
      ],
    },
  ],
}
