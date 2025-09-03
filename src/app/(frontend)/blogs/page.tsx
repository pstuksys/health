import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { ScrollPostCards } from '@/app/(frontend)/components/scroll-post-cards/component'
import type { Blog } from '@/payload-types'
import { unstable_cache } from 'next/cache'

async function getBlogs() {
  const { isEnabled } = await draftMode()
  const isDraft = isEnabled
  const payload = await getPayload({ config: (await import('@/payload.config')).default })

  const { docs } = await payload.find({
    collection: 'blogs',
    draft: isDraft,
    sort: '-publishedAt',
    limit: 50,
  })

  return docs as unknown as Blog[]
}

// Cache the blogs with proper tags for revalidation
const getCachedBlogs = unstable_cache(getBlogs, ['blogs-list'], {
  tags: ['blogs', 'blog-list', 'blog-posts', 'blogs-page'],
  revalidate: 3600, // 1 hour fallback
})

export default async function BlogsPage() {
  const blogs = await getCachedBlogs()

  if (!blogs || blogs.length === 0) {
    return (
      <main className="min-h-screen bg-ds-light-neutral">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-light text-ds-dark-blue mb-4">Blog</h1>
            <p className="text-lg text-ds-pastille-green">No blog posts available yet.</p>
          </div>
        </div>
      </main>
    )
  }

  // Transform blogs to match the ScrollPostCards component format
  const blogPosts = blogs.map((blog) => ({
    id: blog.id?.toString(),
    title: blog.title,
    excerpt: blog.excerpt,
    image: blog.image,
    linkType: 'internal' as const,
    post: { relationTo: 'blogs' as const, value: blog },
    date: blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : undefined,
    author: blog.author || '',
    category: blog.category || '',
    readTime: blog.readTime || '',
  }))

  return (
    <main className="min-h-screen w-full mx-auto bg-white">
      <section
        id="hero-section"
        className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 flex items-center bg-gradient-to-b from-ds-dark-blue to-ds-pastille-green overflow-hidden min-h-[50vh]"
      >
        <div className="relative z-10 max-w-container mx-auto w-full">
          <div className="max-w-container">
            <h1 className="text-4xl md:text-5xl font-light leading-tight mb-8 text-white">
              Our Blog
            </h1>
            <p className="text-lg sm:text-xl font-light leading-relaxed mb-8 max-w-2xl text-gray-200">
              Stay updated with the latest insights, news, and stories from our team.
            </p>
          </div>
        </div>
      </section>
      <ScrollPostCards
        disableObserver={true}
        clickableCard={true}
        blockType="scrollPostCards"
        title=""
        subtitle=""
        posts={blogPosts}
      />
    </main>
  )
}

export async function generateMetadata() {
  return {
    title: 'Blog | Health & Wellness Insights',
    description: 'Read our latest blog posts about health, wellness, and medical insights.',
  }
}
