'use client'

import { Card, CardContent } from '@/components/ui/card'

type AppointmentBookingFormProps = {
  booking?: {
    title?: string | null
    note?: string | null
    submitText?: string | null
    options?: (string | { value?: string | null; id?: string | null })[] | null
  }
  className?: string
}

export function AppointmentBookingForm({ booking, className }: AppointmentBookingFormProps) {
  // Default form data
  const defaultForm = {
    title: 'Book your appointment',
    note: "We'll confirm availability and next steps by email or phone.",
    submitText: 'Book Appointment',
    options: [
      'Home Sleep Apnoea Test (HST)',
      'Respiratory Polygraphy (RP)',
      'Video Polysomnography (vPSG)',
    ],
  }

  // Merge with provided booking data
  const form = booking || defaultForm

  // Process options array
  const optionValues: string[] = Array.isArray(form.options)
    ? form.options.map((opt) => (typeof opt === 'string' ? opt : opt?.value || ''))
    : defaultForm.options
  return (
    <Card className={`bg-white shadow-sm border p-8 relative ${className || ''}`}>
      <CardContent className="p-0">
        <h3 className="text-xl font-semibold text-ds-dark-blue mb-6">{form.title}</h3>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-ds-dark-blue mb-2">
              Appointment type *
            </label>
            <div className="relative">
              <select className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ds-accent-yellow focus:border-transparent appearance-none bg-white">
                {optionValues.map((opt: string, i: number) => (
                  <option key={i}>{opt}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ds-dark-blue mb-2">Full name</label>
              <input
                type="text"
                placeholder="Jane Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ds-accent-yellow focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ds-dark-blue mb-2">Phone</label>
              <input
                type="tel"
                placeholder="07123 456789"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ds-accent-yellow focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ds-dark-blue mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ds-accent-yellow focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ds-dark-blue mb-2">
                Preferred date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ds-accent-yellow focus:border-transparent"
              />
            </div>
          </div>

          <p className="text-xs text-gray-500">{form.note}</p>

          <button
            type="submit"
            className="w-full bg-ds-accent-yellow hover:bg-ds-accent-yellow/90 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200"
          >
            {form.submitText}
          </button>
        </form>
      </CardContent>
    </Card>
  )
}
