import { notFound, redirect } from 'next/navigation'
import { RichText } from '@/app/(frontend)/components/ui/rich-text'
import { mediaToUrl } from '@/lib/media'
import Image from 'next/image'
import { getBlogBySlug } from '@/lib/cms/payload-client'
import { ShareButtons } from './ShareButtons'

type BlogPageParams = {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPage(props: BlogPageParams) {
  const { slug } = await props.params
  const blog = await getBlogBySlug(slug, 2)

  if (!blog) return notFound()

  // External blogs should redirect to their external URL
  if (blog.linkType === 'external' && blog.externalUrl) {
    redirect(blog.externalUrl)
  }

  return (
    <main className="min-h-screen bg-white">
      <article className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          {blog.image && (
            <div className="py-6 md:py-12">
              <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[520px] overflow-hidden bg-gray-100">
                <Image
                  src={mediaToUrl(blog.image)}
                  alt={blog.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 1024px"
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-ds-dark-blue text-balance">
              {blog.title}
            </h1>
          </div>

          {/* Excerpt */}
          {blog.excerpt && (
            <div className="mb-8">
              <p className="text-xl text-ds-pastille-green leading-relaxed">{blog.excerpt}</p>
            </div>
          )}

          {/* Meta info */}
          <div className="flex items-center gap-4 text-sm text-gray-500 border-b border-gray-200 pb-6 mb-12">
            <span>
              Published{' '}
              {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : 'Recently'}
            </span>
            <span>•</span>
            <span>{blog.readTime || '5 min'} read</span>
            {blog.author && (
              <>
                <span>•</span>
                <span>By {blog.author}</span>
              </>
            )}
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {blog.content && (
              <RichText
                data={blog.content}
                className="rich-text-headings-blue text-ds-pastille-green leading-relaxed"
              />
            )}
          </div>

          {/* Share buttons */}
          <ShareButtons
            title={blog.title}
            url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${blog.slug}`}
            excerpt={blog.excerpt || undefined}
          />
        </div>
      </article>
    </main>
  )
}

export async function generateMetadata(props: BlogPageParams) {
  const { slug } = await props.params

  try {
    const blog = await getBlogBySlug(slug, 2) // Need depth 2 for SEO meta fields

    if (!blog) {
      return {
        title: 'Blog Post Not Found',
        description: 'The requested blog post could not be found.',
      }
    }

    // Use SEO plugin fields if available, fallback to blog fields
    const seoTitle = blog.meta?.title
    const seoDescription = blog.meta?.description
    const seoImage = blog.meta?.image

    return {
      title: seoTitle || `${blog.title} | Blog`,
      description: seoDescription || blog.excerpt || `Read ${blog.title} on our blog.`,
      openGraph: {
        title: seoTitle || blog.title,
        description: seoDescription || blog.excerpt || `Read ${blog.title} on our blog.`,
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
        description: seoDescription || blog.excerpt || `Read ${blog.title} on our blog.`,
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
      title: 'Blog Post',
      description: 'Read our latest blog post.',
    }
  }
}
