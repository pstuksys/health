'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { Page } from '@/payload-types'

type SleepAssessmentStepsProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'sleepAssessmentSteps' }
>

export function SleepAssessmentSteps({ title, subtitle, steps }: SleepAssessmentStepsProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const defaultSteps = [
    {
      number: '01',
      title: 'Tell us a bit about yourself.',
      description: "Don't worry, your information is absolutely safe and private.",
      bulletPoints: [],
    },
    {
      number: '02',
      title: 'Answer a few quick questions about your sleep.',
      description: '',
      bulletPoints: [],
    },
    {
      number: '03',
      title:
        'Based on your responses, we can help check for symptoms associated with sleep issues such as:',
      description: '',
      bulletPoints: ['Obstructive sleep apnoea', 'Insomnia', 'Snoring', 'and many more...'],
    },
    {
      number: '04',
      title:
        "Once you've completed the assessment you'll see your results on screen, and we'll also email them to you.",
      description:
        'You will be told whether you are at risk of sleep apnoea, insomnia or other sleep problems or if you have a low risk.',
      bulletPoints: [],
    },
  ]

  const stepsToRender = steps && steps.length > 0 ? steps : defaultSteps

  return (
    <section ref={sectionRef} className="py-16 px-4 bg-ds-light-neutral">
      <div className="max-w-container mx-auto">
        <div
          className={cn(
            'text-center mb-12 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          )}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-ds-dark-blue mb-6 leading-tight">
            {title || 'Unlock the secrets of your sleep in just 4 easy steps'}
          </h1>
          <p className="text-ds-pastille-green text-lg max-w-4xl mx-auto leading-relaxed font-light">
            {subtitle ||
              "As well as taking the assessment, it's important you discuss your symptoms with your doctor. They can help you rule out any underlying medical conditions and recommend treatment options if you do have a sleep disorder, or suggest lifestyle changes."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stepsToRender.map((step, index) => (
            <div
              key={step.number}
              className={cn(
                'bg-ds-dark-blue rounded-2xl p-6 text-white min-h-[280px] flex flex-col transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-2xl font-light mb-4 text-ds-accent-yellow">{step.number}</div>
              <h3 className="text-lg font-light mb-3 leading-tight">{step.title}</h3>
              {step.description && (
                <p className="text-white/80 text-sm leading-relaxed mb-3 font-light">
                  {step.description}
                </p>
              )}
              {step.bulletPoints && step.bulletPoints.length > 0 && (
                <ul className="text-white/80 text-sm space-y-1 mt-auto">
                  {step.bulletPoints.map((bulletPoint, pointIndex) => (
                    <li key={pointIndex} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-ds-accent-yellow rounded-full mr-3 flex-shrink-0"></span>
                      {typeof bulletPoint === 'string' ? bulletPoint : bulletPoint.point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
