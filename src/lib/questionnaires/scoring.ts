/**
 * Scoring for questionnaires from the Questionnaires collection. A score is the
 * sum of the chosen answers' points; the result is the one whose score range
 * contains it. Runs in the browser, so answers are never stored or sent.
 */

export type ScoringQuestion = { answers?: { points?: number | null }[] | null }
export type ScoringResult = { minScore?: number | null; maxScore?: number | null }

export function maxScore(questions: ScoringQuestion[]): number {
  return questions.reduce(
    (sum, q) => sum + Math.max(0, ...(q.answers ?? []).map((a) => a.points ?? 0)),
    0,
  )
}

/** `answers` holds the chosen answer index for each question, in order. */
export function scoreAnswers(questions: ScoringQuestion[], answers: number[]): number {
  if (answers.length !== questions.length) {
    throw new Error(`Expected ${questions.length} answers, got ${answers.length}`)
  }
  return answers.reduce((sum, answerIndex, i) => {
    const answer = questions[i].answers?.[answerIndex]
    if (!answer) throw new Error(`Invalid answer ${answerIndex} for question ${i + 1}`)
    return sum + (answer.points ?? 0)
  }, 0)
}

export function findResult<T extends ScoringResult>(results: T[], score: number): T | undefined {
  return results.find((r) => score >= (r.minScore ?? 0) && score <= (r.maxScore ?? 0))
}

/**
 * Every possible score (0 to the maximum) must match exactly one result.
 * Returns an error message for the admin, or null when the ranges are valid.
 */
export function checkResultRanges(
  questions: ScoringQuestion[],
  results: ScoringResult[],
): string | null {
  const max = maxScore(questions)
  const missing: number[] = []
  const overlapping: number[] = []

  for (let score = 0; score <= max; score++) {
    const matches = results.filter(
      (r) => score >= (r.minScore ?? 0) && score <= (r.maxScore ?? 0),
    ).length
    if (matches === 0) missing.push(score)
    if (matches > 1) overlapping.push(score)
  }

  const problems: string[] = []
  if (missing.length) problems.push(`no result for score ${missing.join(', ')}`)
  if (overlapping.length) problems.push(`more than one result for score ${overlapping.join(', ')}`)
  if (!problems.length) return null
  return `Result score ranges must cover 0–${max} with no gaps or overlaps: ${problems.join('; ')}.`
}
