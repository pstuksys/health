'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'
import type { Page, Questionnaire } from '@/payload-types'
import { cn } from '@/lib/utils'
import { resolveLinkHref } from '@/lib/navigation'
import { findResult, maxScore, scoreAnswers } from '@/lib/questionnaires/scoring'
import { isLexicalEditorState, RichText } from '@/app/(frontend)/components/ui/rich-text'

type QuestionnaireBlockProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'questionnaireBlock' }
>
type Section = Questionnaire['sections'][number]
type Level = Section['results'][number]['level']

const levelOrder: Level[] = ['low', 'medium', 'high']

const levelStyles: Record<Level, { segment: string; badge: string }> = {
  low: { segment: 'bg-ds-pastille-green', badge: 'bg-ds-pastille-green/10 text-ds-pastille-green' },
  medium: { segment: 'bg-ds-accent-yellow', badge: 'bg-ds-accent-yellow/15 text-[#b8700f]' },
  high: { segment: 'bg-ds-dark-blue', badge: 'bg-ds-dark-blue/10 text-ds-dark-blue' },
}

export function QuestionnaireBlock({
  questionnaire,
  title,
  description,
  cta,
  disclaimer,
}: QuestionnaireBlockProps) {
  const [answers, setAnswers] = useState<number[]>([])
  const [step, setStep] = useState(0)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const hasInteracted = useRef(false)

  // Move focus to the new question/result for keyboard and screen-reader
  // users, but not on first render (that would scroll the page to the block).
  useEffect(() => {
    if (hasInteracted.current) headingRef.current?.focus()
  }, [step])

  // Not populated (e.g. deleted questionnaire): render nothing
  if (!questionnaire || typeof questionnaire !== 'object') return null

  const sections = (questionnaire.sections ?? []).filter((s) => s.questions?.length)
  // All sections' questions in one flow
  const steps = sections.flatMap((section) =>
    section.questions.map((question) => ({ section, question })),
  )
  const total = steps.length
  if (!total) return null
  const isComplete = step >= total
  const current = steps[step]

  function answer(answerIndex: number) {
    hasInteracted.current = true
    setAnswers((prev) => {
      const next = prev.slice(0, step)
      next[step] = answerIndex
      return next
    })
    setStep((s) => s + 1)
  }

  function back() {
    hasInteracted.current = true
    setStep((s) => Math.max(0, s - 1))
  }

  function restart() {
    hasInteracted.current = true
    setAnswers([])
    setStep(0)
  }

  return (
    // Only block on the page: fill the screen below the header and centre, instead of
    // leaving white space above the footer.
    <section className="w-full py-16 px-4 first:last:flex first:last:min-h-[calc(100vh-4rem)] first:last:items-center">
      <div className="w-full max-w-container mx-auto grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start">
        <div className="lg:sticky lg:top-28">
          {title && <h2 className="text-3xl font-light text-ds-dark-blue mb-4">{title}</h2>}
          {description && (
            <p className="text-ds-pastille-green font-light leading-relaxed mb-6">{description}</p>
          )}
          <p className="text-sm text-ds-dark-blue/70 font-light">
            {total} {total === 1 ? 'question' : 'questions'}
          </p>
          {disclaimer && (
            <p className="mt-6 border-l-2 border-ds-accent-yellow pl-4 text-sm text-ds-dark-blue/70 font-light leading-relaxed">
              {disclaimer}
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-ds-light-neutral bg-white p-6 shadow-lg sm:p-10">
          {isComplete ? (
            <Results
              sections={sections}
              answers={answers}
              headingRef={headingRef}
              cta={cta}
              onRestart={restart}
            />
          ) : (
            <div>
              <div className="mb-3 flex items-center justify-between gap-4 text-sm text-ds-pastille-green">
                <span>
                  {sections.length > 1 && (
                    <span className="font-medium text-ds-dark-blue">
                      {current.section.title} ·{' '}
                    </span>
                  )}
                  Question {step + 1} of {total}
                </span>
                {step > 0 && (
                  <button
                    type="button"
                    onClick={back}
                    className="inline-flex items-center gap-1 rounded px-1 font-light hover:text-ds-dark-blue"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden />
                    Back
                  </button>
                )}
              </div>

              <div
                className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-ds-light-neutral"
                role="progressbar"
                aria-label="Questionnaire progress"
                aria-valuemin={0}
                aria-valuemax={total}
                aria-valuenow={step}
              >
                <div
                  className="h-full rounded-full bg-ds-accent-yellow transition-[width] duration-300"
                  style={{ width: `${(step / total) * 100}%` }}
                />
              </div>

              <h3
                ref={headingRef}
                tabIndex={-1}
                className="mb-8 text-xl font-light leading-snug text-ds-dark-blue outline-none sm:text-2xl"
              >
                {current.question.text}
              </h3>

              <div className="grid gap-3">
                {(current.question.answers ?? []).map((option, index) => {
                  const selected = answers[step] === index
                  return (
                    <button
                      key={option.id ?? index}
                      type="button"
                      onClick={() => answer(index)}
                      aria-pressed={selected}
                      className={cn(
                        'group flex w-full items-center justify-between rounded-xl border-2 px-5 py-4 text-left text-ds-dark-blue transition-colors',
                        selected
                          ? 'border-ds-pastille-green bg-ds-pastille-green/10'
                          : 'border-ds-light-neutral hover:border-ds-pastille-green',
                      )}
                    >
                      <span>{option.label}</span>
                      <ArrowRight
                        className="h-5 w-5 text-ds-pastille-green opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Results({
  sections,
  answers,
  headingRef,
  cta,
  onRestart,
}: {
  sections: Section[]
  answers: number[]
  headingRef: React.RefObject<HTMLHeadingElement | null>
  cta: QuestionnaireBlockProps['cta']
  onRestart: () => void
}) {
  const ctaHref = cta ? resolveLinkHref(cta) : '#'

  // Answers are in flow order; give each section its own slice
  const sectionAnswers = sections.map((section, index) => {
    const start = sections.slice(0, index).reduce((n, s) => n + s.questions.length, 0)
    return answers.slice(start, start + section.questions.length)
  })

  return (
    <div>
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="mb-2 text-sm uppercase tracking-wide text-ds-pastille-green outline-none"
      >
        {sections.length > 1 ? 'Your results' : 'Your result'}
      </h3>

      <div className="divide-y divide-ds-light-neutral">
        {sections.map((section, index) => (
          <SectionResult
            key={section.id ?? index}
            section={section}
            answers={sectionAnswers[index]}
            showTitle={sections.length > 1}
          />
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        {cta?.label && ctaHref !== '#' && (
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-[14px] bg-ds-accent-yellow px-6 py-3 text-white transition-all duration-200 hover:scale-[1.03] hover:brightness-110 active:brightness-95"
          >
            {cta.label}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        )}
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded px-2 py-3 text-ds-pastille-green hover:text-ds-dark-blue"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          Start again
        </button>
      </div>
    </div>
  )
}

function SectionResult({
  section,
  answers,
  showTitle,
}: {
  section: Section
  answers: number[]
  showTitle: boolean
}) {
  const score = scoreAnswers(section.questions, answers)
  const result = findResult(section.results ?? [], score)
  const styles = result ? levelStyles[result.level] : null
  const activeIndex = result ? levelOrder.indexOf(result.level) : -1

  return (
    <div className="py-8 first:pt-4 last:pb-0">
      {showTitle && <h4 className="mb-3 text-lg font-normal text-ds-dark-blue">{section.title}</h4>}

      <div className="mb-4 flex flex-wrap items-center gap-3">
        {result && styles && (
          <span className={cn('rounded-full px-3 py-1 text-sm font-medium', styles.badge)}>
            {result.label}
          </span>
        )}
        <span className="text-sm text-ds-dark-blue/70">
          Score {score} of {maxScore(section.questions)}
        </span>
      </div>

      {styles && (
        <div className="mb-6 grid grid-cols-3 gap-1.5" aria-hidden>
          {levelOrder.map((level, index) => (
            <div
              key={level}
              className={cn(
                'h-2 rounded-full',
                index <= activeIndex ? styles.segment : 'bg-ds-light-neutral',
              )}
            />
          ))}
        </div>
      )}

      {result && (
        <p className="mb-4 text-xl font-light leading-snug text-ds-dark-blue">{result.headline}</p>
      )}

      {result?.content && isLexicalEditorState(result.content) && (
        <RichText
          data={result.content}
          className="rich-text-headings-blue font-light text-ds-dark-blue/80 [&_h6]:mb-3 [&_h6]:mt-6 [&_h6]:text-base [&_h6]:font-normal sm:[&_h6]:text-lg"
        />
      )}
    </div>
  )
}
