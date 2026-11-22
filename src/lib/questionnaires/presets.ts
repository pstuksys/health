/**
 * Built-in questionnaire sections (IPD-9), from the client's "Interactive sleep
 * questionnaire logic" document. The sleep_screener migration loads these into
 * the Questionnaires collection; after that they're edited in the admin.
 */
import type { Questionnaire } from '@/payload-types'

type QuestionnaireData = Pick<Questionnaire, 'name' | 'sections'>
type SectionData = Questionnaire['sections'][number]

// Minimal Lexical (rich text) builders for the result content
const text = (value: string) => ({
  type: 'text',
  text: value,
  format: 0,
  detail: 0,
  mode: 'normal',
  style: '',
  version: 1,
})
const block = { format: '', indent: 0, version: 1, direction: 'ltr' as const }
const p = (value: string) => ({
  ...block,
  type: 'paragraph',
  textFormat: 0,
  textStyle: '',
  children: [text(value)],
})
const h = (value: string) => ({ ...block, type: 'heading', tag: 'h6', children: [text(value)] })
const ul = (items: string[]) => ({
  ...block,
  type: 'list',
  listType: 'bullet',
  start: 1,
  tag: 'ul',
  children: items.map((item, i) => ({
    ...block,
    type: 'listitem',
    value: i + 1,
    children: [text(item)],
  })),
})
const richText = (...children: object[]) =>
  ({ root: { ...block, type: 'root', children } }) as NonNullable<
    SectionData['results'][number]['content']
  >

const yesNo = (yes: number) => [
  { label: 'Yes', points: yes },
  { label: 'No', points: 0 },
]
const weekly = [
  { label: 'Never', points: 0 },
  { label: '1 to 3 times a week', points: 1 },
  { label: 'More than 3 times a week', points: 2 },
]

export const stopBang: SectionData = {
  title: 'Sleep apnoea',
  questions: [
    {
      text: 'Do you snore loudly (louder than talking or loud enough to be heard through closed doors)?',
      answers: yesNo(1),
    },
    {
      text: 'Do you often feel tired, fatigued or sleepy during the daytime?',
      answers: yesNo(1),
    },
    { text: 'Has anyone observed you stop breathing during your sleep?', answers: yesNo(1) },
    {
      text: 'Do you have or are you being treated for high blood pressure?',
      answers: yesNo(1),
    },
    { text: 'Is your BMI greater than 35 kg/m²?', answers: yesNo(1) },
    { text: 'Are you over 50 years old?', answers: yesNo(1) },
    { text: 'Is your neck circumference greater than 40 cm?', answers: yesNo(1) },
    { text: 'Are you male?', answers: yesNo(1) },
  ],
  results: [
    {
      label: 'Low risk',
      level: 'low',
      minScore: 0,
      maxScore: 2,
      headline:
        'Your answers indicate a low risk of obstructive sleep apnoea based on the STOP-Bang questionnaire.',
      content: richText(
        p(
          'However, if you continue to experience sleep-related symptoms or concerns, you may benefit from discussing these with a healthcare professional.',
        ),
      ),
    },
    {
      label: 'Intermediate risk',
      level: 'medium',
      minScore: 3,
      maxScore: 4,
      headline: 'Your answers indicate an intermediate risk of obstructive sleep apnoea.',
      content: richText(
        p(
          'Further assessment may help establish whether your symptoms are related to a sleep disorder. Consider arranging a consultation with a doctor to discuss your symptoms and whether a sleep study may be appropriate.',
        ),
      ),
    },
    {
      label: 'High risk',
      level: 'high',
      minScore: 5,
      maxScore: 8,
      headline: 'Your answers indicate a high risk of obstructive sleep apnoea.',
      content: richText(
        p(
          'We recommend discussing your results with a healthcare professional. A sleep specialist can assess your symptoms and advise whether diagnostic sleep testing is appropriate.',
        ),
      ),
    },
  ],
}

const whatIsInsomnia = [
  h('What is insomnia?'),
  p(
    'Insomnia is a persistent sleep problem that occurs even though you have the opportunity to get a full night of sleep. Common insomnia complaints include:',
  ),
  ul([
    'Difficulty falling asleep',
    'Difficulty staying asleep during the night',
    'Waking up earlier than desired',
  ]),
]
const occasionalBadNight = p(
  'An occasional bad night sleep is normal. If you notice that they are increasing in frequency and you are suffering in the day time as a result, consider seeking support from a health professional.',
)
const tipsHeading = h(
  'Good sleep habits can help you sleep better. Tips to promote good sleep hygiene:',
)
const tips = (alcoholTips: string[]) =>
  ul([
    'Go to bed when you feel sleepy and wake up at the same time each day.',
    'Avoid daytime naps.',
    'Obtain and maintain a healthy body weight.',
    'Exercise each day at a pace that feels comfortable.',
    ...alcoholTips,
    'Turn off any electronics at least one hour before bed.',
    'Follow a soothing bedtime routine that helps you relax.',
    'Set aside a period of time each day to think about any concerns or worries.',
  ])
const reduceAlcohol = [
  'Avoid caffeine in the afternoon and evening before bedtime.',
  'Cut down on excessive alcohol intake as it can disrupt your sleep.',
]

export const insomnia: SectionData = {
  title: 'Insomnia',
  questions: [
    { text: 'Do you have difficulties falling asleep or staying asleep?', answers: weekly },
    { text: 'Do you tend to wake up too early?', answers: weekly },
    { text: 'Do you suffer from anxiety or worry about sleep?', answers: yesNo(2) },
    {
      text: 'Are you finding it challenging to perform your daily activities?',
      answers: yesNo(2),
    },
    {
      text: 'Do you take naps to make up for lost sleep?',
      answers: [
        { label: 'Never', points: 0 },
        { label: 'Sometimes', points: 1 },
        { label: 'Frequently', points: 2 },
      ],
    },
  ],
  results: [
    {
      label: 'Low risk',
      level: 'low',
      minScore: 0,
      maxScore: 3,
      headline: 'You show little to no symptoms of Insomnia.',
      content: richText(
        ...whatIsInsomnia,
        occasionalBadNight,
        tipsHeading,
        tips(['Avoid caffeine in the afternoon and evening and alcohol before bedtime.']),
      ),
    },
    {
      label: 'Medium risk',
      level: 'medium',
      minScore: 4,
      maxScore: 6,
      headline: 'You have reported a few symptoms linked to Insomnia.',
      content: richText(...whatIsInsomnia, occasionalBadNight, tipsHeading, tips(reduceAlcohol)),
    },
    {
      // The client doc leaves out the "occasional bad night" paragraph here
      label: 'High risk',
      level: 'high',
      minScore: 7,
      maxScore: 10,
      headline: 'You have reported a number of symptoms linked to Insomnia.',
      content: richText(...whatIsInsomnia, tipsHeading, tips(reduceAlcohol)),
    },
  ],
}

// The client asked for both screeners in one questionnaire with a result per category
export const sleepScreener: QuestionnaireData = {
  name: 'Sleep screener',
  sections: [stopBang, insomnia],
}

export const questionnairePresets: QuestionnaireData[] = [sleepScreener]
