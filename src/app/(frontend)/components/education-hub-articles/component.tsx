import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Blog, Page } from '@/payload-types'
import { getBlogsByCategories } from '@/lib/cms/payload-client'
import { getHubTopicById } from '@/lib/education-hub/constants'
import { mediaToUrl } from '@/lib/media'
import {
  ArticleRotator,
  type RotatorArticle,
} from '@/app/(frontend)/components/education-hub/article-rotator/component'

type EducationHubArticlesProps = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'educationHubArticles' }
>

function toRotatorArticle(blog: Blog): RotatorArticle {
  const isExternal = blog.linkType === 'external' && Boolean(blog.externalUrl)
  return {
    id: String(blog.id),
    title: blog.title,
    excerpt: blog.excerpt ?? '',
    imageUrl: blog.image ? mediaToUrl(blog.image) : '',
    imageAlt: typeof blog.image === 'object' && blog.image?.alt ? blog.image.alt : blog.title,
    href: isExternal && blog.externalUrl ? blog.externalUrl : `/education-hub/${blog.slug ?? ''}`,
    isExternal,
  }
}

export async function EducationHubArticles({
  title,
  subtitle,
  topic,
  limit,
  linkLabel,
}: EducationHubArticlesProps) {
  const hubTopic = getHubTopicById(topic)
  if (!hubTopic) return null

  const blogs = await getBlogsByCategories(hubTopic.categories, limit ?? 6)
  if (blogs.length === 0) return null

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-container mx-auto">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            {title && <h2 className="text-3xl font-light text-ds-dark-blue mb-3">{title}</h2>}
            {subtitle && <p className="text-ds-pastille-green font-light">{subtitle}</p>}
          </div>
          {linkLabel && (
            <Link
              href="/education-hub"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ds-dark-blue hover:text-ds-accent-yellow"
            >
              {linkLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          )}
        </div>

        <ArticleRotator articles={blogs.map(toRotatorArticle)} />
      </div>
    </section>
  )
}
