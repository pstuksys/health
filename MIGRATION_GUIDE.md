# CMS Image Component Migration Guide

We've created a centralized `CMSImage` component that handles all Payload CMS media logic. This guide shows how to migrate existing components.

## New Centralized Image Component

### Features
- ✅ Automatic size selection based on use case
- ✅ Responsive sizes prop generation  
- ✅ Alt text extraction from CMS
- ✅ Fallback handling
- ✅ Modern format support (AVIF/WebP)
- ✅ TypeScript support with proper types

### Import Options

```tsx
// Individual imports
import { CMSImage, HeroImage, CardImage, ThumbnailImage, GalleryImage } from '@/app/(frontend)/components/ui/cms-image'

// Or from the UI barrel export
import { CMSImage, HeroImage, CardImage, ThumbnailImage, GalleryImage } from '@/app/(frontend)/components/ui'
```

## Migration Patterns

### Before (Old Pattern)
```tsx
import Image from 'next/image'
import { getMediaUrl, getImageSizes, getMediaAlt } from '@/lib/media'

// Usage
<Image
  src={getMediaUrl(image, 'card')}
  alt={getMediaAlt(typeof image === 'object' ? image : undefined, 'fallback')}
  fill
  sizes={getImageSizes('card')}
  className="object-cover"
/>
```

### After (New Pattern)
```tsx
import { CardImage } from '@/app/(frontend)/components/ui'

// Usage - Much cleaner!
<CardImage
  media={image}
  alt="fallback"
  fill
  className="object-cover"
/>
```

## Use Case Examples

### Hero Images
```tsx
import { HeroImage } from '@/app/(frontend)/components/ui'

<HeroImage
  media={backgroundImage}
  alt="Hero background"
  fill
  priority
  className="object-cover"
/>
```

### Card Images
```tsx
import { CardImage } from '@/app/(frontend)/components/ui'

<CardImage
  media={cardImage}
  alt={cardTitle}
  width={400}
  height={300}
  className="rounded-lg"
/>
```

### Thumbnail Images
```tsx
import { ThumbnailImage } from '@/app/(frontend)/components/ui'

<ThumbnailImage
  media={thumbnail}
  alt={title}
  width={100}
  height={100}
  className="rounded-full"
/>
```

### Gallery Images
```tsx
import { GalleryImage } from '@/app/(frontend)/components/ui'

<GalleryImage
  media={galleryImage}
  alt={description}
  fill
  className="object-cover"
/>
```

### Custom Use Cases
```tsx
import { CMSImage } from '@/app/(frontend)/components/ui'

<CMSImage
  media={customImage}
  useCase="original" // or any other use case
  alt="Custom image"
  sizes="(max-width: 768px) 100vw, 50vw" // custom sizes override
  width={600}
  height={400}
/>
```

## Components to Migrate

The following components still need to be migrated to use the new CMSImage component:

### Remaining Components with Old Pattern:
1. `content-block/component.tsx` 
2. `single-card/component.tsx`
3. `carousel/component.tsx` 
4. `full-width-banner/component.tsx`
5. `two-card-block/component.tsx`
6. `scroll-post-cards/component.tsx`
7. `corporate-health/component.tsx`
8. `medical-services-grid/component.tsx`
9. `content-block-array/component.tsx`
10. `card-section/component.tsx`
11. `services-banner-block/component.tsx`
12. `partners-block/component.tsx`
13. `parallax-hero/component.tsx`
14. `about-us-section/component.tsx`

### Migration Steps:

1. **Replace imports:**
   ```tsx
   // Remove
   import Image from 'next/image'
   import { getMediaUrl, getImageSizes, getMediaAlt } from '@/lib/media'
   
   // Add
   import { CardImage, HeroImage, ThumbnailImage } from '@/app/(frontend)/components/ui'
   ```

2. **Replace Image components:**
   ```tsx
   // Old
   <Image
     src={getMediaUrl(media, 'card')}
     alt={getMediaAlt(typeof media === 'object' ? media : undefined, fallback)}
     sizes={getImageSizes('card')}
     // ... other props
   />
   
   // New
   <CardImage
     media={media}
     alt={fallback}
     // ... other props (sizes automatically handled)
   />
   ```

3. **Choose appropriate component:**
   - Hero sections → `HeroImage`
   - Cards/previews → `CardImage`
   - Small icons/logos → `ThumbnailImage`
   - Gallery views → `GalleryImage`
   - Custom needs → `CMSImage` with `useCase` prop

## Benefits

✅ **Consistency**: All images use the same logic  
✅ **Maintainability**: Changes in one place affect all components  
✅ **Type Safety**: Full TypeScript support  
✅ **Performance**: Automatic optimization  
✅ **Developer Experience**: Much cleaner, simpler API  
✅ **Future-proof**: Easy to add new features or change behavior  

## Testing

After migration, verify:
- Images load correctly across all breakpoints
- Alt text is properly set
- AVIF/WebP formats are served when supported
- Responsive behavior works as expected
- No console errors or warnings
