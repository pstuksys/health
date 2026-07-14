import type { Blog } from '@/payload-types'
import { ClipboardList, CheckCircle } from 'lucide-react'

type KeyTakeawaysProps = {
  takeaways: NonNullable<Blog['keyTakeaways']>
}

export function KeyTakeaways({ takeaways }: KeyTakeawaysProps) {
  if (!takeaways || takeaways.length === 0) return null

  return (
    <section
      aria-labelledby="key-takeaways-heading"
      className="rounded-xl bg-ds-dark-blue/5 p-6 sm:p-8"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
          <ClipboardList className="h-6 w-6 text-ds-dark-blue" aria-hidden="true" />
        </span>
        <div className="flex-1">
          <h2
            id="key-takeaways-heading"
            className="text-xl font-semibold text-ds-dark-blue mb-4"
          >
            Key Takeaways
          </h2>
          <ul className="space-y-3">
            {takeaways.map((item) => (
              <li key={item.id ?? item.point} className="flex items-start gap-3">
                <CheckCircle
                  className="mt-0.5 h-5 w-5 shrink-0 text-ds-pastille-green"
                  aria-hidden="true"
                />
                <span className="font-light leading-relaxed text-ds-pastille-green">
                  {item.point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
