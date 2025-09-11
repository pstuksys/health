# Caching System Documentation

This document describes the comprehensive caching solution implemented for the Payload CMS application using Next.js `unstable_cache` and automatic cache invalidation.

## Overview

The caching system provides:
- **Single source of truth** for Payload CMS client
- **Automatic cache invalidation** when content changes
- **Optimized query performance** with proper cache tags
- **Reliable revalidation** using both direct `revalidateTag` and HTTP fallback

## Architecture

### Core Components

1. **Payload Client (`src/lib/cms/payload-client.ts`)**
   - Centralized Payload CMS client instance
   - Cached query functions for all collections and globals
   - Cache tag generation utilities

2. **Revalidation Hooks (`src/hooks/revalidate.ts`)**
   - Collection and global hooks for automatic cache invalidation
   - Direct `revalidateTag` usage with HTTP fallback
   - Operation-specific cache invalidation

3. **Collection Configurations**
   - Updated hooks in Pages, Blogs collections
   - Updated hooks in Header, Footer globals

## Cache Tags Strategy

### Collections

#### Blogs
- `blogs` - All blog-related data
- `blog-list` - Blog listing pages
- `blog-posts` - Individual blog posts
- `blogs-page` - Main blogs page
- `blog:${slug}` - Specific blog by slug
- `blog-detail` - Blog detail pages

#### Pages
- `pages` - All page-related data
- `pages-list` - Page listings
- `page:${slug}` - Specific page by slug
- `page:home`, `page:` - Home page specific tags

### Globals

#### Header/Footer
- `global:header` - Header global data
- `global:footer` - Footer global data
- `globals:header-footer` - Combined header/footer data

## Usage Examples

### Fetching Cached Data

```typescript
import { 
  getCachedBlogs, 
  getCachedBlogBySlug, 
  getCachedPage,
  getCachedHeaderFooter 
} from '@/lib/cms/payload-client'

// Get all blogs (cached for 1 hour)
const blogs = await getCachedBlogs(50)

// Get specific blog (cached with blog-specific tags)
const blog = await getCachedBlogBySlug('my-blog-post', 2)

// Get page (cached with page-specific tags)
const page = await getCachedPage('about-us', 2)

// Get header and footer (cached together)
const { header, footer } = await getCachedHeaderFooter()
```

### Manual Cache Invalidation

```typescript
import { revalidateCacheTags } from '@/hooks/revalidate'

// Revalidate specific tags
revalidateCacheTags(['blogs', 'blog-list'])

// Revalidate specific blog
revalidateCacheTags(['blog:my-blog-slug'])
```

### Custom Cached Queries

```typescript
import { createCachedQuery } from '@/lib/cms/payload-client'

const getCustomData = createCachedQuery(
  async () => {
    // Your custom query logic
    return await someCustomQuery()
  },
  ['custom-data'], // Cache key
  ['custom', 'data-tag'], // Cache tags
  3600 // Revalidate time (1 hour)
)
```

## Automatic Cache Invalidation

### When Content Changes

The system automatically invalidates relevant cache tags when:

1. **Blog posts** are created, updated, or deleted
   - Invalidates: `blogs`, `blog-list`, `blog-posts`, `blogs-page`, `blog:${slug}`

2. **Pages** are created, updated, or deleted
   - Invalidates: `pages`, `pages-list`, `page:${slug}`

3. **Header/Footer globals** are updated
   - Invalidates: `global:header`, `global:footer`, `globals:header-footer`

### Hook Implementation

Each collection/global has properly typed hooks configured:

```typescript
// In collection config
hooks: {
  afterChange: [revalidateBlogsOnChange], // CollectionAfterChangeHook
  afterDelete: [revalidateBlogsOnDelete], // CollectionAfterDeleteHook
}

// In global config
hooks: {
  afterChange: [revalidateHeaderOnChange], // GlobalAfterChangeHook
}
```

## Performance Benefits

### Before (Without Caching)
- Every page load requires database queries
- Payload client instantiated multiple times
- No cache invalidation strategy
- Slower page load times

### After (With Caching)
- Queries cached for 1 hour (configurable)
- Single Payload client instance reused
- Automatic cache invalidation on content changes
- Significantly faster page load times
- Reduced database load

## Monitoring and Debugging

### Console Logs

The system provides detailed logging:

```
🔄 Revalidating cache tags: ['blogs', 'blog-list', 'blog:my-post']
🌐 HTTP revalidation successful for tags: ['blogs', 'blog-list']
```

### Testing

Run the integration tests:

```bash
npm run test tests/int/cache-invalidation.int.spec.ts
```

Run manual cache test:

```bash
node scripts/test-cache.mjs
```

## Configuration

### Cache Duration

**No automatic revalidation by default** - caches are only invalidated when content changes through hooks. This is perfect for static content that doesn't change frequently.

For custom queries that need time-based revalidation:

```typescript
const getCachedBlogs = createCachedQuery(
  async () => {
    // ... query function
  },
  ['custom-blogs-list'],
  ['blogs', 'blog-list'],
  7200 // 2 hours (optional)
)
```

### Environment Variables

Required for HTTP fallback revalidation:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
REVALIDATION_SECRET=your-secret-key
```

## Best Practices

### 1. Use Appropriate Cache Tags
- Always include collection-level tags (`blogs`, `pages`)
- Add specific tags for individual items (`blog:${slug}`)
- Include page-type tags (`blog-list`, `blog-detail`)

### 2. Handle Errors Gracefully
- All cached functions return `null` or empty arrays on error
- Errors are logged but don't break the application

### 3. Use Appropriate Depth
- Use shallow depth (1-2) for listing pages
- Use deeper depth (2-3) for detail pages
- Consider performance vs. data completeness

### 4. Monitor Cache Performance
- Check console logs for revalidation activity
- Monitor page load times
- Use Next.js built-in performance metrics

## Troubleshooting

### Cache Not Invalidating

1. Check hook configuration in collections/globals
2. Verify cache tags match between query and invalidation
3. Check console logs for revalidation messages
4. Ensure `REVALIDATION_SECRET` is set for HTTP fallback

### Performance Issues

1. Reduce cache duration for frequently changing content
2. Use appropriate query depth
3. Consider pagination for large datasets
4. Monitor database query patterns

### Development vs. Production

- Development uses both direct and HTTP revalidation
- Production primarily uses direct `revalidateTag`
- HTTP fallback provides additional reliability

## Migration Guide

### From Old System

1. Replace direct `getPayload()` calls with cached versions
2. Remove manual revalidation HTTP calls
3. Update collection hooks to use new revalidation system
4. Test cache invalidation flow

### Example Migration

```typescript
// Before
const payload = await getPayload({ config: await import('@/payload.config') })
const { docs } = await payload.find({ collection: 'blogs' })

// After  
const blogs = await getCachedBlogs(50)
```

## Future Enhancements

- [ ] Redis-based caching for multi-instance deployments
- [ ] Cache warming strategies
- [ ] Advanced cache analytics
- [ ] Selective cache invalidation based on content changes
- [ ] Cache compression for large datasets
