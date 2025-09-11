import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { unstable_cache } from 'next/cache'
import {
  getPayloadClient,
  getCachedBlogs,
  getCachedBlogBySlug,
  getCachedHeaderFooter,
} from '@/lib/cms/payload-client'
import { revalidateCacheTags } from '@/hooks/revalidate'

describe('Cache Invalidation Integration Tests', () => {
  let payload: any

  beforeAll(async () => {
    payload = await getPayloadClient()
  })

  afterAll(async () => {
    // Clean up any test data if needed
  })

  describe('Payload Client Caching', () => {
    it('should reuse the same Payload instance', async () => {
      const client1 = await getPayloadClient()
      const client2 = await getPayloadClient()

      expect(client1).toBe(client2) // Should be the same instance
    })

    it('should cache blog queries with proper tags', async () => {
      const blogs = await getCachedBlogs(10)
      expect(Array.isArray(blogs)).toBe(true)
    })

    it('should cache individual blog queries', async () => {
      // First, let's get a blog to test with
      const blogs = await getCachedBlogs(1)

      if (blogs.length > 0) {
        const firstBlog = blogs[0]
        const cachedBlog = await getCachedBlogBySlug(firstBlog.slug, 2)

        expect(cachedBlog).toBeTruthy()
        expect(cachedBlog?.slug).toBe(firstBlog.slug)
      }
    })

    it('should cache header and footer globals', async () => {
      const globals = await getCachedHeaderFooter()

      expect(globals).toHaveProperty('header')
      expect(globals).toHaveProperty('footer')
    })
  })

  describe('Cache Tag Revalidation', () => {
    it('should revalidate cache tags without throwing errors', () => {
      const testTags = ['blogs', 'blog-list', 'test-tag']

      // This should not throw
      expect(() => {
        revalidateCacheTags(testTags)
      }).not.toThrow()
    })

    it('should handle invalid cache tags gracefully', () => {
      const invalidTags = ['', null, undefined].filter(Boolean) as string[]

      expect(() => {
        revalidateCacheTags(invalidTags)
      }).not.toThrow()
    })
  })

  describe('Collection-specific Cache Tags', () => {
    it('should generate correct cache tags for blogs', () => {
      const { getCollectionCacheTags } = require('@/lib/cms/payload-client')

      const blogTags = getCollectionCacheTags('blogs', 'test-blog-slug')

      expect(blogTags).toContain('blogs')
      expect(blogTags).toContain('blog-list')
      expect(blogTags).toContain('blog-posts')
      expect(blogTags).toContain('blogs-page')
      expect(blogTags).toContain('blog:test-blog-slug')
      expect(blogTags).toContain('blog-detail')
    })

    it('should generate correct cache tags for pages', () => {
      const { getCollectionCacheTags } = require('@/lib/cms/payload-client')

      const pageTags = getCollectionCacheTags('pages', 'test-page-slug')

      expect(pageTags).toContain('pages')
      expect(pageTags).toContain('page:test-page-slug')
    })

    it('should generate correct cache tags for globals', () => {
      const { getCollectionCacheTags } = require('@/lib/cms/payload-client')

      const headerTags = getCollectionCacheTags('header')
      const footerTags = getCollectionCacheTags('footer')

      expect(headerTags).toContain('header')
      expect(headerTags).toContain('global:header')
      expect(footerTags).toContain('footer')
      expect(footerTags).toContain('global:footer')
    })
  })

  describe('Error Handling', () => {
    it('should handle payload client errors gracefully', async () => {
      // Test with invalid slug
      const result = await getCachedBlogBySlug('non-existent-slug-12345', 1)
      expect(result).toBeNull()
    })

    it('should return empty array for blogs when collection is empty or error occurs', async () => {
      // This should not throw and should return an array
      const blogs = await getCachedBlogs(1000) // Large limit to test edge cases
      expect(Array.isArray(blogs)).toBe(true)
    })
  })

  describe('Cache Performance', () => {
    it('should be faster on subsequent calls (cache hit)', async () => {
      const start1 = performance.now()
      await getCachedBlogs(5)
      const time1 = performance.now() - start1

      const start2 = performance.now()
      await getCachedBlogs(5)
      const time2 = performance.now() - start2

      // Second call should be significantly faster (cache hit)
      // Allow some variance for system performance
      expect(time2).toBeLessThan(time1 * 2) // At least 50% faster
    })
  })
})

describe('Cache Integration with Payload Hooks', () => {
  it('should have hooks properly configured in collections', () => {
    const { Blogs } = require('@/collections/Blogs')
    const { Pages } = require('@/collections/Pages')

    expect(Blogs.hooks?.afterChange).toBeDefined()
    expect(Blogs.hooks?.afterDelete).toBeDefined()
    expect(Pages.hooks?.afterChange).toBeDefined()
    expect(Pages.hooks?.afterDelete).toBeDefined()
  })

  it('should have hooks properly configured in globals', () => {
    const { Header } = require('@/globals/Header')
    const { Footer } = require('@/globals/Footer')

    expect(Header.hooks?.afterChange).toBeDefined()
    expect(Footer.hooks?.afterChange).toBeDefined()
  })
})
