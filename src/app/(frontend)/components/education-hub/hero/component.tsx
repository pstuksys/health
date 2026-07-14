import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  EDUCATION_HUB_HERO_ALT,
  EDUCATION_HUB_HERO_IMAGE_DEFAULT,
} from '@/lib/education-hub/constants'

type EducationHubHeroProps = {
  eyebrow?: string
  title: string
  description: string
  backHref?: string
  backLabel?: string
  cta?: {
    href: string
    label: string
  }
  imageDesktop?: string
  imageMobile?: string
  imageAlt?: string
  className?: string
}

const DESKTOP_IMAGE_FADE =
  'linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.96) 10%, rgba(255,255,255,0.82) 22%, rgba(255,255,255,0.52) 36%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.04) 62%, transparent 76%)'

export function EducationHubHero({
  eyebrow = 'Sleep Education Hub',
  title,
  description,
  backHref,
  backLabel = 'Back to Education Hub',
  cta,
  imageDesktop = EDUCATION_HUB_HERO_IMAGE_DEFAULT,
  imageMobile = EDUCATION_HUB_HERO_IMAGE_DEFAULT,
  imageAlt = EDUCATION_HUB_HERO_ALT,
  className,
}: EducationHubHeroProps) {
  return (
    <section className={cn('relative overflow-hidden bg-white', className)}>
      <div className="max-w-container relative mx-auto">
        {/* Mobile & tablet: image begins below the nav (h-16) — text/layout unchanged */}
        <div
          className="absolute inset-x-0 top-0 h-16 bg-ds-dark-blue lg:hidden"
          aria-hidden="true"
        />
        <div className="absolute top-16 right-0 bottom-0 left-0 lg:hidden">
          <Image
            src={imageMobile}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-ds-dark-blue/95 from-0% via-ds-dark-blue/45 via-45% to-transparent to-70%"
            aria-hidden="true"
          />
        </div>

        {/* Desktop: image starts below fixed header so the subject isn't clipped */}
        <div className="absolute top-16 right-0 bottom-0 hidden w-[62%] lg:block">
          <Image
            src={imageDesktop}
            alt={imageAlt}
            fill
            priority
            sizes="62vw"
            className="object-cover object-[center_18%]"
          />
          <div
            className="absolute inset-0"
            style={{ background: DESKTOP_IMAGE_FADE }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_42%,rgba(255,255,255,0.22),transparent_58%)]"
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 flex min-h-[500px] flex-col justify-end px-4 py-12 sm:min-h-[520px] sm:px-6 sm:py-14 lg:min-h-[680px] lg:max-w-[46%] lg:justify-center lg:bg-white lg:px-8 lg:py-24 xl:min-h-[720px]">
          {backHref && (
            <Link
              href={backHref}
              className="mb-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white transition-colors duration-200 hover:text-ds-accent-yellow lg:mb-8 lg:text-ds-pastille-green lg:hover:text-ds-dark-blue"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
              {backLabel}
            </Link>
          )}

          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/90 lg:mb-4 lg:text-ds-pastille-green">
            {eyebrow}
          </p>
          <h1 className="max-w-xl text-3xl font-light leading-tight text-white text-balance sm:text-4xl lg:text-5xl lg:text-ds-dark-blue xl:text-[3.25rem]">
            {title}
          </h1>
          <p className="mt-4 hidden max-w-xl text-base font-light leading-relaxed text-white/90 sm:block sm:text-lg lg:mt-6 lg:text-ds-pastille-green">
            {description}
          </p>

          {cta && (
            <Link
              href={cta.href}
              className="mt-8 inline-flex w-fit items-center justify-center rounded-lg bg-ds-dark-blue px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-ds-dark-blue/90"
            >
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
