import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { RichText } from '@/app/(frontend)/components/ui/rich-text'
import { mediaToUrl } from '@/lib/media'
import Image from 'next/image'
import type { Blog } from '@/payload-types'
import { ShareButtons } from './ShareButtons'

export default async function BlogPage(props: any) {
  const slug = props?.params?.slug as string
  const { isEnabled } = await draftMode()
  const isDraft = isEnabled
  const payload = await getPayload({ config: (await import('@/payload.config')).default })
  const { docs } = await payload.find({
    collection: 'blogs',
    where: { slug: { equals: slug } },
    draft: isDraft,
    limit: 1,
  })
  const blog = docs[0] as unknown as Blog | undefined

  if (!blog) return notFound()

  return (
    <main className="min-h-screen bg-white">
      <section
        id="hero-section"
        className="relative pt-10 pb-12 px-4 sm:px-6 lg:px-8 flex items-center overflow-hidden min-h-[50vh]"
      >
        {blog.image ? (
          <>
            <Image
              src={mediaToUrl(blog.image)}
              alt={blog.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-ds-dark-blue to-ds-pastille-green" />
        )}
        <div className="relative z-10 max-w-container mx-auto w-full">
          <div className="max-w-container text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-8 text-white">
              {blog.title}
            </h1>
          </div>
        </div>
      </section>
      <article className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
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
              <RichText data={blog.content} className="text-ds-pastille-green leading-relaxed" />
            )}
          </div>

          {/* Share buttons */}
          <ShareButtons
            title={blog.title}
            url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blogs/${blog.slug}`}
            excerpt={blog.excerpt || undefined}
          />
        </div>
      </article>
    </main>
  )
}

export async function generateMetadata(props: any) {
  const slug = props?.params?.slug as string
  const payload = await getPayload({ config: (await import('@/payload.config')).default })

  try {
    const { docs } = await payload.find({
      collection: 'blogs',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    const blog = docs[0] as unknown as Blog | undefined

    if (!blog) {
      return {
        title: 'Blog Post Not Found',
        description: 'The requested blog post could not be found.',
      }
    }

    return {
      title: `${blog.title} | Blog`,
      description: blog.excerpt || `Read ${blog.title} on our blog.`,
    }
  } catch (error) {
    return {
      title: 'Blog Post',
      description: 'Read our latest blog post.',
    }
  }
}
