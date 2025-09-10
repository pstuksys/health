'use client'

import { cn } from '@/lib/utils'

type SleepDisorderStatsCardProps = {
  title?: string
  statisticLabel?: string
  statisticValue?: string
  description?: string
  progressPercentage?: number
  className?: string
}

export function SleepDisorderStatsCard({
  title = 'Sleep Disorder Statistics',
  statisticLabel = 'Sleep Apnoea Cases Worldwide',
  statisticValue = '1 Billion',
  description = 'Nearly one billion people worldwide live with sleep apnoea, yet many remain undiagnosed.',
  progressPercentage = 85,
  className,
}: SleepDisorderStatsCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-lg p-6 max-w-sm w-full',
        'border border-gray-100',
        className,
      )}
    >
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>

      {/* Statistic */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">{statisticLabel}</span>
          <span className="text-2xl font-bold text-ds-accent-yellow">{statisticValue}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-ds-accent-yellow h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, progressPercentage))}%` }}
          />
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}
