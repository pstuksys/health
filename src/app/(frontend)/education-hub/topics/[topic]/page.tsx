import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Blog } from '@/payload-types'
import { ScrollPostCards } from '@/app/(frontend)/components/scroll-post-cards/component'
import { getBlogsByCategories, getEducationHub } from '@/lib/cms/payload-client'
import { resolveEducationHubSettings, resolveTopicSettings } from '@/lib/education-hub/resolve-settings'
import { EducationHubHero } from '@/app/(frontend)/components/education-hub/hero/component'
import { EducationHubTrustPillars } from '@/app/(frontend)/components/education-hub/trust-pillars/component'

const BLOGS_PER_TOPIC = 24

type TopicPageParams = {
  params: Promise<{
    topic: string
  }>
}

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

export default async function EducationHubTopicPage(props: TopicPageParams) {
  const { topic: topicId } = await props.params
  const global = await getEducationHub()
  const settings = resolveEducationHubSettings(global)
  const topic = resolveTopicSettings(global, topicId)

  if (!topic) return notFound()

  const blogs = await getBlogsByCategories(topic.categories, BLOGS_PER_TOPIC)

  return (
    <main className="min-h-screen w-full bg-white">
      <EducationHubHero
        title={topic.label}
        description={topic.description}
        imageDesktop={settings.hero.imageDesktop}
        imageMobile={settings.hero.imageMobile}
        imageAlt={settings.hero.imageAlt}
        backHref="/education-hub#explore-topics"
        backLabel="Back to topics"
      />

      <section className="py-16">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          {blogs.length > 0 ? (
            <ScrollPostCards
              disableObserver={true}
              clickableCard={true}
              blockType="scrollPostCards"
              title=""
              subtitle=""
              posts={blogs.map(transformBlog)}
            />
          ) : (
            <div className="rounded-xl border border-gray-200 bg-ds-light-neutral px-6 py-12 text-center">
              <h2 className="text-2xl font-light text-ds-dark-blue">No articles available yet</h2>
              <p className="mt-3 text-ds-pastille-green">
                Articles will appear here once they are published in this topic.
              </p>
              <Link
                href="/education-hub#explore-topics"
                className="mt-6 inline-flex text-sm font-semibold text-ds-dark-blue hover:text-ds-accent-yellow"
              >
                Back to topics
              </Link>
            </div>
          )}
        </div>
      </section>

      <EducationHubTrustPillars pillars={settings.trustPillars} />
    </main>
  )
}

export async function generateMetadata(props: TopicPageParams) {
  const { topic: topicId } = await props.params
  const global = await getEducationHub()
  const topic = resolveTopicSettings(global, topicId)

  if (!topic) {
    return {
      title: 'Topic Not Found | Sleep Education Hub',
    }
  }

  return {
    title: `${topic.label} | Sleep Education Hub | IPDiagnostics`,
    description: topic.description,
  }
}
