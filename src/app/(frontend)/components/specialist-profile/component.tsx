import type { Blog } from '@/payload-types'
import Image from 'next/image'
import { mediaToUrl } from '@/lib/media'
import {
  ShieldCheck,
  Award,
  BadgeCheck,
  GraduationCap,
  MapPin,
  Globe,
  Mail,
  Phone,
  Info,
} from 'lucide-react'

type SpecialistProfileProps = {
  specialist: NonNullable<Blog['specialist']>
  reviewNote?: Blog['clinicalReviewNote']
}

const PROFESSIONAL_DETAIL_ICONS = [BadgeCheck, GraduationCap, ShieldCheck, Award] as const

function normalizeExternalHref(value: string): string {
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(value) || value.startsWith('/')) return value
  return `https://${value}`
}

export function SpecialistProfile({ specialist, reviewNote }: SpecialistProfileProps) {
  const { photo, name, title, bio, professionalDetails, contact } = specialist

  const hasContent =
    name || title || bio || photo || (professionalDetails && professionalDetails.length > 0)
  if (!hasContent) return null

  return (
    <section
      aria-labelledby="specialist-heading"
      className="rounded-xl border border-ds-dark-blue/20 bg-white p-6 sm:p-8"
    >
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ds-dark-blue">
          <ShieldCheck className="h-5 w-5 text-white" aria-hidden="true" />
        </span>
        <h2 id="specialist-heading" className="text-xl font-semibold text-ds-dark-blue">
          Reviewed by Sleep Specialist
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 lg:divide-x lg:divide-gray-200">
        {/* Profile */}
        <div className="flex min-w-0 flex-col items-start gap-4 lg:pr-8">
          {photo && (
            <div className="relative h-28 w-28 overflow-hidden rounded-full bg-gray-100">
              <Image
                src={mediaToUrl(photo)}
                alt={name || 'Specialist'}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
          )}
          {name && <h3 className="text-lg font-semibold text-ds-dark-blue">{name}</h3>}
          {title && <p className="font-medium text-ds-pastille-green">{title}</p>}
          {bio && <p className="text-sm font-light leading-relaxed text-ds-pastille-green">{bio}</p>}
        </div>

        {/* Professional details */}
        {professionalDetails && professionalDetails.length > 0 && (
          <div className="min-w-0 lg:px-8">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ds-dark-blue">
              Professional Details
            </h4>
            <ul className="space-y-3">
              {professionalDetails.map((item, index) => {
                const DetailIcon = PROFESSIONAL_DETAIL_ICONS[index % PROFESSIONAL_DETAIL_ICONS.length]
                return (
                  <li key={item.id ?? item.detail} className="flex items-start gap-3">
                    <DetailIcon
                      className="mt-0.5 h-4 w-4 shrink-0 text-ds-dark-blue"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 break-words text-sm font-light text-ds-pastille-green">
                      {item.detail}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {/* Contact */}
        <div className="min-w-0 lg:pl-8">
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ds-dark-blue">
            Contact &amp; Practice Details
          </h4>
          <ul className="space-y-3">
            {contact?.location && (
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ds-dark-blue" aria-hidden="true" />
                <span className="min-w-0 break-words text-sm font-light text-ds-pastille-green">
                  {contact.location}
                </span>
              </li>
            )}
            {contact?.website && (
              <li className="flex items-start gap-3">
                <Globe className="mt-0.5 h-4 w-4 shrink-0 text-ds-dark-blue" aria-hidden="true" />
                <a
                  href={normalizeExternalHref(contact.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-0 break-all text-sm font-light text-ds-pastille-green underline-offset-2 hover:text-ds-dark-blue hover:underline"
                >
                  {contact.website}
                </a>
              </li>
            )}
            {contact?.email && (
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-ds-dark-blue" aria-hidden="true" />
                <a
                  href={`mailto:${contact.email}`}
                  className="min-w-0 break-all text-sm font-light text-ds-pastille-green underline-offset-2 hover:text-ds-dark-blue hover:underline"
                >
                  {contact.email}
                </a>
              </li>
            )}
            {contact?.phone && (
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-ds-dark-blue" aria-hidden="true" />
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                  className="text-sm font-light text-ds-pastille-green underline-offset-2 hover:text-ds-dark-blue hover:underline"
                >
                  {contact.phone}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {reviewNote && (
        <div className="mt-8 flex items-start gap-3 rounded-lg bg-ds-light-neutral p-4">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-ds-dark-blue" aria-hidden="true" />
          <p className="text-sm font-light text-ds-pastille-green">{reviewNote}</p>
        </div>
      )}
    </section>
  )
}
