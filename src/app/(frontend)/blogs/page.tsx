import { ScrollPostCards } from '@/app/(frontend)/components/scroll-post-cards/component'
import type { Blog } from '@/payload-types'
import { cn } from '@/lib/utils'
import { getCachedBlogs } from '@/lib/cms/payload-client'

// Define blog categories with proper typing
const BLOG_CATEGORIES = [
  { label: 'Sleep Disorders Hub', value: 'sleep-disorders', id: 'sleep-disorders' },
  { label: 'Diagnostics & Testing Hub', value: 'diagnostics-testing', id: 'diagnostics-testing' },
  {
    label: 'Therapies & Treatments Hub',
    value: 'therapies-treatments',
    id: 'therapies-treatments',
  },
  { label: 'Lifestyle & Tips Hub', value: 'lifestyle-tips', id: 'lifestyle-tips' },
] as const

export default async function BlogsPage() {
  const blogs = await getCachedBlogs(1000)

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

  // Group blogs by category
  const blogsByCategory = BLOG_CATEGORIES.reduce(
    (acc, category) => {
      acc[category.value] = blogs.filter((blog) => blog.category === category.value)
      return acc
    },
    {} as Record<string, Blog[]>,
  )

  // Transform blogs to match the ScrollPostCards component format
  const transformBlog = (blog: Blog) => ({
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
  })

  return (
    <main className="min-h-screen w-full mx-auto bg-white">
      {/* Hero Section */}
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

      {/* Category Navigation */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto py-4" aria-label="Blog categories">
            {BLOG_CATEGORIES.map((category) => (
              <a
                key={category.value}
                href={`#${category.id}`}
                className={cn(
                  'whitespace-nowrap py-2 px-4 text-sm font-medium rounded-full transition-colors duration-200',
                  'text-ds-pastille-green hover:text-ds-dark-blue hover:bg-ds-light-neutral',
                  'focus:outline-none focus:ring-2 focus:ring-ds-accent-yellow focus:ring-offset-2',
                )}
              >
                {category.label}
                {blogsByCategory[category.value]?.length > 0 && (
                  <span className="ml-2 bg-ds-accent-yellow text-ds-dark-blue text-xs px-3 py-1 rounded-full">
                    {blogsByCategory[category.value].length}
                  </span>
                )}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Blog Categories Sections */}
      <div className="bg-ds-light-neutral">
        {BLOG_CATEGORIES.map((category) => {
          const categoryBlogs = blogsByCategory[category.value] || []

          if (categoryBlogs.length === 0) {
            return null
          }

          return (
            <section key={category.value} id={category.id} className="py-16 scroll-mt-20">
              <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-light text-ds-dark-blue mb-4">
                    {category.label}
                  </h2>
                  <div className="w-24 h-1 bg-ds-accent-yellow mx-auto"></div>
                </div>

                <ScrollPostCards
                  disableObserver={true}
                  clickableCard={true}
                  blockType="scrollPostCards"
                  title=""
                  subtitle=""
                  posts={categoryBlogs.map(transformBlog)}
                />
              </div>
            </section>
          )
        })}
      </div>

      {/* Show message if no blogs in any category */}
      {BLOG_CATEGORIES.every((cat) => (blogsByCategory[cat.value]?.length || 0) === 0) && (
        <section className="py-16 bg-ds-light-neutral">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-light text-ds-dark-blue mb-4">
              No categorized blog posts available yet.
            </h2>
            <p className="text-ds-pastille-green">
              Blog posts will appear here once they are assigned to categories.
            </p>
          </div>
        </section>
      )}
    </main>
  )
}

export async function generateMetadata() {
  return {
    title: 'Blog | Health & Wellness Insights',
    description: 'Read our latest blog posts about health, wellness, and medical insights.',
    openGraph: {
      title: 'Blog | Health & Wellness Insights',
      description: 'Read our latest blog posts about health, wellness, and medical insights.',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog | Health & Wellness Insights',
      description: 'Read our latest blog posts about health, wellness, and medical insights.',
    },
  }
}
