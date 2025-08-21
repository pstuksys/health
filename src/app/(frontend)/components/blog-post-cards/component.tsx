import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type BlogPost = {
  image: string
  title: string
  excerpt: string
  href: string
  date?: string
  author?: string
}

type BlogPostCardsProps = {
  posts: BlogPost[]
  mobileCarousel?: boolean
  className?: string
}

export function BlogPostCards({ posts, mobileCarousel = false, className }: BlogPostCardsProps) {
  return (
    <section className={cn('py-16 px-4 sm:px-6 lg:px-8', className)}>
      <div className="max-w-container mx-auto">
        <div
          className={cn(
            'grid gap-8',
            mobileCarousel
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          )}
        >
          {posts.map((post, index) => (
            <article key={index} className="group">
              <Link href={post.href} className="block">
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={post.image || '/placeholder.svg'}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    {(post.date || post.author) && (
                      <div className="flex items-center text-sm text-ds-pastille-green font-light">
                        {post.date && <span>{post.date}</span>}
                        {post.date && post.author && <span className="mx-2">•</span>}
                        {post.author && <span>{post.author}</span>}
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-ds-dark-blue group-hover:text-ds-pastille-green transition-colors duration-200 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-ds-pastille-green font-light leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="pt-2">
                      <span className="text-ds-accent-yellow font-semibold text-sm group-hover:underline">
                        Read More →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
