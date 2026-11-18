import { describe, expect, it } from 'vitest'
import { insomnia, sleepScreener, stopBang } from '@/lib/questionnaires/presets'
import {
  checkResultRanges,
  findResult,
  maxScore,
  scoreAnswers,
  type ScoringQuestion,
} from '@/lib/questionnaires/scoring'

/** Pick answers in question order that add up to exactly `target` points. */
function answersFor(questions: ScoringQuestion[], target: number): number[] {
  let remaining = target
  return questions.map((q) => {
    const ranked = (q.answers ?? [])
      .map((a, index) => ({ index, points: a.points ?? 0 }))
      .sort((a, b) => b.points - a.points)
    const pick = ranked.find((o) => o.points <= remaining) ?? ranked[ranked.length - 1]
    remaining -= pick.points
    return pick.index
  })
}

type BandCase = [score: number, level: 'low' | 'medium' | 'high']

describe.each<{ preset: typeof stopBang; questions: number; max: number; bands: BandCase[] }>([
  {
    preset: stopBang,
    questions: 8,
    max: 8,
    bands: [
      [0, 'low'],
      [2, 'low'],
      [3, 'medium'],
      [4, 'medium'],
      [5, 'high'],
      [8, 'high'],
    ],
  },
  {
    preset: insomnia,
    questions: 5,
    max: 10,
    bands: [
      [0, 'low'],
      [3, 'low'],
      [4, 'medium'],
      [6, 'medium'],
      [7, 'high'],
      [10, 'high'],
    ],
  },
])('$preset.title section', ({ preset, questions, max, bands }) => {
  it(`has ${questions} questions and a maximum of ${max} points`, () => {
    expect(preset.questions).toHaveLength(questions)
    expect(maxScore(preset.questions)).toBe(max)
  })

  it('has valid result ranges', () => {
    expect(checkResultRanges(preset.questions, preset.results)).toBeNull()
  })

  it.each(bands)('score %i is %s', (score, level) => {
    const answers = answersFor(preset.questions, score)
    expect(scoreAnswers(preset.questions, answers)).toBe(score)
    expect(findResult(preset.results, score)?.level).toBe(level)
  })
})

describe('sleep screener preset', () => {
  it('combines both sections in one questionnaire', () => {
    expect(sleepScreener.sections.map((s) => s.title)).toEqual(['Sleep apnoea', 'Insomnia'])
  })
})

describe('insomnia section', () => {
  it('scores yes/no questions as 2 points', () => {
    // Never, Never, Yes, No, Never
    expect(scoreAnswers(insomnia.questions, [0, 0, 0, 1, 0])).toBe(2)
  })
})

describe('scoreAnswers', () => {
  it('rejects incomplete answers', () => {
    expect(() => scoreAnswers(stopBang.questions, [0, 0])).toThrow()
  })

  it('rejects an answer that does not exist', () => {
    expect(() => scoreAnswers(insomnia.questions, [0, 0, 0, 0, 9])).toThrow()
  })
})

describe('checkResultRanges', () => {
  const questions = [{ answers: [{ points: 0 }, { points: 2 }] }, { answers: [{ points: 1 }] }]

  it('accepts ranges that cover every score exactly once', () => {
    const results = [
      { minScore: 0, maxScore: 1 },
      { minScore: 2, maxScore: 3 },
    ]
    expect(checkResultRanges(questions, results)).toBeNull()
  })

  it('reports gaps', () => {
    const results = [
      { minScore: 0, maxScore: 1 },
      { minScore: 3, maxScore: 3 },
    ]
    expect(checkResultRanges(questions, results)).toContain('no result for score 2')
  })

  it('reports overlaps', () => {
    const results = [
      { minScore: 0, maxScore: 2 },
      { minScore: 2, maxScore: 3 },
    ]
    expect(checkResultRanges(questions, results)).toContain('more than one result for score 2')
  })
})
