import type { Page } from '@/payload-types'
import { iconMap } from '@/lib/icons/icon-map'

type CareNetworkBlockProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'careNetworkBlock' }
>

// Distance of each specialist from the centre, as a percentage of the diagram size
const ORBIT_RADIUS = 38

function orbitPosition(index: number, total: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2
  return {
    x: 50 + ORBIT_RADIUS * Math.cos(angle),
    y: 50 + ORBIT_RADIUS * Math.sin(angle),
  }
}

export function CareNetworkBlock({
  title,
  description,
  specialists,
}: CareNetworkBlockProps) {
  const items = specialists ?? []
  const CenterIcon = iconMap.User

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-container mx-auto grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-center">
        <div>
          {title && <h2 className="text-3xl font-light text-ds-dark-blue mb-4">{title}</h2>}
          {description && (
            <p className="text-ds-pastille-green font-light leading-relaxed">{description}</p>
          )}
        </div>

        {/* Circular diagram from md up */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-[560px] md:block">
          <svg
            className="absolute inset-0 h-full w-full text-ds-dark-blue/20"
            viewBox="0 0 100 100"
            aria-hidden
          >
            {items.map((item, index) => {
              const { x, y } = orbitPosition(index, items.length)
              return (
                <line
                  key={item.id ?? index}
                  x1="50"
                  y1="50"
                  x2={x}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="0.3"
                />
              )
            })}
          </svg>

          <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ds-dark-blue text-white shadow-lg">
            <CenterIcon className="h-12 w-12" aria-hidden />
          </div>

          <ul>
            {items.map((item, index) => {
              const Icon = iconMap[item.icon ?? 'Users']
              const { x, y } = orbitPosition(index, items.length)
              return (
                <li
                  key={item.id ?? index}
                  className="absolute flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white p-3 text-center shadow-md"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <Icon className="h-6 w-6 mb-1 text-ds-pastille-green" aria-hidden />
                  <span className="text-xs font-light leading-tight text-ds-dark-blue">
                    {item.label}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Simple grid on small screens, where the circle would be too cramped */}
        <ul className="grid grid-cols-2 gap-4 md:hidden">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon ?? 'Users']
            return (
              <li
                key={item.id ?? index}
                className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-md"
              >
                <Icon className="h-5 w-5 flex-shrink-0 text-ds-pastille-green" aria-hidden />
                <span className="text-sm font-light text-ds-dark-blue">{item.label}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
