import { ScrollPostCards } from '@/app/(frontend)/components/scroll-post-cards/component'
import type { Blog } from '@/payload-types'
import { cn } from '@/lib/utils'
import { getBlogsByCategories } from '@/lib/cms/payload-client'
import { BookOpen, Activity, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const BLOGS_PER_SECTION = 12

type HubSection = {
  id: string
  label: string
  description: string
  categories: string[]
  accentText: string
  accentBg: string
}

const TOPIC_SECTIONS: (HubSection & { icon: typeof BookOpen })[] = [
  {
    id: 'understanding-sleep-disorders',
    label: 'Understanding Sleep Disorders',
    description: 'Learn about the causes, symptoms and health risks of common sleep disorders.',
    categories: ['sleep-disorders'],
    icon: BookOpen,
    accentText: 'text-ds-pastille-green',
    accentBg: 'bg-ds-pastille-green/10',
  },
  {
    id: 'diagnostics-treatment',
    label: 'Diagnostics & Treatment',
    description: 'Understand sleep studies, CPAP therapy and how treatment can improve your sleep.',
    categories: ['diagnostics-testing', 'therapies-treatments'],
    icon: Activity,
    accentText: 'text-ds-dark-blue',
    accentBg: 'bg-ds-dark-blue/10',
  },
  {
    id: 'specialist-insights',
    label: 'Specialist Insights',
    description: 'Expert perspectives from our clinical partners across a range of specialties.',
    categories: ['specialists-insights'],
    icon: Users,
    accentText: 'text-ds-accent-yellow',
    accentBg: 'bg-ds-accent-yellow/10',
  },
]

const EXTRA_SECTIONS: HubSection[] = [
  {
    id: 'lifestyle-tips',
    label: 'Lifestyle & Tips',
    description: 'Practical advice to help you sleep and live better.',
    categories: ['lifestyle-tips'],
    accentText: 'text-ds-pastille-green',
    accentBg: 'bg-ds-pastille-green/10',
  },
  {
    id: 'featured',
    label: 'Featured In',
    description: 'Where our specialists and services have been featured.',
    categories: ['featured in'],
    accentText: 'text-ds-dark-blue',
    accentBg: 'bg-ds-dark-blue/10',
  },
]

const ALL_SECTIONS: HubSection[] = [...TOPIC_SECTIONS, ...EXTRA_SECTIONS]

const transformBlog = (blog: Blog) => ({
  id: blog.id?.toString(),
  title: blog.title,
  excerpt: blog.excerpt,
  image: blog.image,
  linkType: (blog.linkType || 'internal') as 'internal' | 'external',
  externalUrl: blog.externalUrl,
  post: { relationTo: 'blogs' as const, value: blog },
  date: blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : undefined,
  author: blog.author || '',
  category: blog.category || '',
  readTime: blog.readTime || '',
})

export default async function EducationHubPage() {
  const sectionResults = await Promise.all(
    ALL_SECTIONS.map((section) => getBlogsByCategories(section.categories, BLOGS_PER_SECTION)),
  )

  const blogsBySection = ALL_SECTIONS.reduce(
    (acc, section, index) => {
      acc[section.id] = sectionResults[index] ?? []
      return acc
    },
    {} as Record<string, Blog[]>,
  )

  const hasBlogs = sectionResults.some((list) => list.length > 0)

  return (
    <main className="min-h-screen w-full mx-auto bg-white">
      {/* Hero Section */}
      <section
        id="hero-section"
        className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 flex items-center bg-gradient-to-b from-ds-dark-blue to-ds-pastille-green overflow-hidden min-h-[45vh]"
      >
        <div className="relative z-10 max-w-container mx-auto w-full">
          <p className="text-sm font-semibold uppercase tracking-wide text-ds-accent-yellow mb-4">
            Sleep Education Hub
          </p>
          <h1 className="text-4xl md:text-5xl font-light leading-tight mb-6 text-white">
            Learn about sleep health from the experts
          </h1>
          <p className="text-lg sm:text-xl font-light leading-relaxed max-w-2xl text-gray-200">
            Evidence-based articles and specialist insights on sleep disorders, diagnostics and
            treatment to help you make informed decisions about your sleep.
          </p>
        </div>
      </section>

      {/* Explore by topic */}
      <section className="bg-white py-16">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-light text-ds-dark-blue">Explore by topic</h2>
            <div className="mt-3 w-16 h-1 bg-ds-accent-yellow" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TOPIC_SECTIONS.map((section) => {
              const Icon = section.icon
              return (
                <Link
                  key={section.id}
                  href={`#${section.id}`}
                  className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ds-accent-yellow focus:ring-offset-2"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={cn(
                        'flex h-14 w-14 shrink-0 items-center justify-center rounded-full',
                        section.accentBg,
                      )}
                    >
                      <Icon className={cn('h-7 w-7', section.accentText)} aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-semibold text-ds-dark-blue text-balance">
                      {section.label}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm font-light leading-relaxed text-ds-pastille-green">
                    {section.description}
                  </p>
                  <span
                    className={cn(
                      'mt-6 inline-flex items-center gap-1 text-sm font-semibold',
                      section.accentText,
                    )}
                  >
                    Read more
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section article lists */}
      {hasBlogs ? (
        <div className="bg-ds-light-neutral">
          {ALL_SECTIONS.map((section) => {
            const sectionBlogs = blogsBySection[section.id] || []
            if (sectionBlogs.length === 0) return null

            return (
              <section key={section.id} id={section.id} className="py-16 scroll-mt-20">
                <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-light text-ds-dark-blue mb-4">
                      {section.label}
                    </h2>
                    <div className="w-24 h-1 bg-ds-accent-yellow mx-auto" />
                  </div>

                  <ScrollPostCards
                    disableObserver={true}
                    clickableCard={true}
                    blockType="scrollPostCards"
                    title=""
                    subtitle=""
                    posts={sectionBlogs.map(transformBlog)}
                  />
                </div>
              </section>
            )
          })}
        </div>
      ) : (
        <section className="py-16 bg-ds-light-neutral">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-light text-ds-dark-blue mb-4">
              No articles available yet.
            </h2>
            <p className="text-ds-pastille-green">
              Articles will appear here once they are published.
            </p>
          </div>
        </section>
      )}
    </main>
  )
}

export async function generateMetadata() {
  return {
    title: 'Sleep Education Hub | IPDiagnostics',
    description:
      'Evidence-based articles and specialist insights on sleep disorders, diagnostics and treatment from IPDiagnostics.',
    openGraph: {
      title: 'Sleep Education Hub | IPDiagnostics',
      description:
        'Evidence-based articles and specialist insights on sleep disorders, diagnostics and treatment from IPDiagnostics.',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Sleep Education Hub | IPDiagnostics',
      description:
        'Evidence-based articles and specialist insights on sleep disorders, diagnostics and treatment from IPDiagnostics.',
    },
  }
}
