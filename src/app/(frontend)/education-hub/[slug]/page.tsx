import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Clock } from 'lucide-react'
import { RichText } from '@/app/(frontend)/components/ui/rich-text'
import { mediaToUrl } from '@/lib/media'
import { getBlogBySlug, getEducationHub } from '@/lib/cms/payload-client'
import { getHubTopicForCategory } from '@/lib/education-hub/constants'
import { resolveEducationHubSettings } from '@/lib/education-hub/resolve-settings'
import { KeyTakeaways } from '@/app/(frontend)/components/key-takeaways/component'
import { SpecialistProfile } from '@/app/(frontend)/components/specialist-profile/component'
import { SleepAssessmentCta } from '@/app/(frontend)/components/education-hub/sleep-assessment-cta/component'
import { EducationHubTrustPillars } from '@/app/(frontend)/components/education-hub/trust-pillars/component'
import { ShareButtons } from './ShareButtons'

type BlogPageParams = {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPage(props: BlogPageParams) {
  const { slug } = await props.params
  const [blog, global] = await Promise.all([getBlogBySlug(slug, 2), getEducationHub()])
  const settings = resolveEducationHubSettings(global)

  if (!blog) return notFound()

  if (blog.linkType === 'external' && blog.externalUrl) {
    redirect(blog.externalUrl)
  }

  const topic = blog.category ? getHubTopicForCategory(blog.category) : undefined
  const publishedLabel = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Recently'

  return (
    <main className="min-h-screen bg-white">
      <article className="max-w-container mx-auto px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ds-pastille-green">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-ds-dark-blue">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li>
              <Link href="/education-hub" className="hover:text-ds-dark-blue">
                Sleep Education Hub
              </Link>
            </li>
            {topic && (
              <>
                <li aria-hidden="true">
                  <ChevronRight className="h-4 w-4" />
                </li>
                <li>
                  <Link
                    href={`/education-hub/topics/${topic.id}`}
                    className="hover:text-ds-dark-blue"
                  >
                    {topic.label}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li className="font-medium text-ds-dark-blue">{blog.title}</li>
          </ol>
        </nav>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-ds-pastille-green">
              Sleep Education Hub
            </p>
            <h1 className="text-3xl font-light leading-tight text-ds-dark-blue text-balance md:text-4xl lg:text-5xl">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="mt-6 text-lg font-light leading-relaxed text-ds-pastille-green">
                {blog.excerpt}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-gray-200 pb-6 text-sm text-gray-500">
              <span>Updated {publishedLabel}</span>
              <span aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {blog.readTime || '5 min'} read
              </span>
              {blog.author && (
                <>
                  <span aria-hidden="true">•</span>
                  <span>By {blog.author}</span>
                </>
              )}
            </div>
          </div>

          {blog.image && (
            <div className="relative min-h-[280px] overflow-hidden rounded-2xl bg-gray-100 sm:min-h-[360px] lg:min-h-[420px]">
              <Image
                src={mediaToUrl(blog.image)}
                alt={blog.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          )}
        </div>

        {blog.content && (
          <div className="mt-12">
            <RichText
              data={blog.content}
              className="rich-text-headings-blue text-ds-pastille-green leading-relaxed"
            />
          </div>
        )}

        {blog.keyTakeaways && blog.keyTakeaways.length > 0 && (
          <div className="mt-12">
            <KeyTakeaways takeaways={blog.keyTakeaways} />
          </div>
        )}

        {blog.showSpecialistProfile && blog.specialist && (
          <div className="mt-12">
            <SpecialistProfile
              specialist={blog.specialist}
              reviewNote={blog.clinicalReviewNote}
            />
          </div>
        )}

        <div className="mt-12 space-y-12">
          <SleepAssessmentCta
            title={settings.sleepAssessment.title}
            description={settings.sleepAssessment.description}
            ctaLabel={settings.sleepAssessment.ctaLabel}
            ctaHref={settings.sleepAssessment.ctaHref}
          />
          <ShareButtons
            title={blog.title}
            url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/education-hub/${blog.slug}`}
            excerpt={blog.excerpt || undefined}
          />
        </div>
      </article>

      <EducationHubTrustPillars pillars={settings.trustPillars} />
    </main>
  )
}

export async function generateMetadata(props: BlogPageParams) {
  const { slug } = await props.params

  try {
    const blog = await getBlogBySlug(slug, 2)

    if (!blog) {
      return {
        title: 'Article Not Found',
        description: 'The requested article could not be found.',
      }
    }

    const seoTitle = blog.meta?.title
    const seoDescription = blog.meta?.description
    const seoImage = blog.meta?.image

    return {
      title: seoTitle || `${blog.title} | Sleep Education Hub`,
      description: seoDescription || blog.excerpt || `Read ${blog.title} on our Sleep Education Hub.`,
      openGraph: {
        title: seoTitle || blog.title,
        description:
          seoDescription || blog.excerpt || `Read ${blog.title} on our Sleep Education Hub.`,
        type: 'article',
        publishedTime: blog.publishedAt || undefined,
        authors: blog.author ? [blog.author] : undefined,
        images: seoImage
          ? [
              {
                url:
                  typeof seoImage === 'object' && seoImage?.url
                    ? seoImage.url
                    : typeof blog.image === 'object' && blog.image?.url
                      ? blog.image.url
                      : undefined,
                width: typeof seoImage === 'object' ? seoImage?.width : undefined,
                height: typeof seoImage === 'object' ? seoImage?.height : undefined,
                alt: typeof seoImage === 'object' ? seoImage?.alt || blog.title : blog.title,
              },
            ].filter((img) => img.url)
          : typeof blog.image === 'object' && blog.image?.url
            ? [
                {
                  url: blog.image.url,
                  width: blog.image.width,
                  height: blog.image.height,
                  alt: blog.image.alt || blog.title,
                },
              ]
            : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: seoTitle || blog.title,
        description:
          seoDescription || blog.excerpt || `Read ${blog.title} on our Sleep Education Hub.`,
        images: seoImage
          ? typeof seoImage === 'object' && seoImage?.url
            ? [seoImage.url]
            : undefined
          : typeof blog.image === 'object' && blog.image?.url
            ? [blog.image.url]
            : undefined,
      },
    }
  } catch (error) {
    console.error('Error generating blog metadata:', error)
    return {
      title: 'Sleep Education Hub Article',
      description: 'Read our latest sleep education article.',
    }
  }
}
