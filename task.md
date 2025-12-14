# Project Analysis & Improvement Tasks

This document outlines identified areas for simplification, improvement, and cleanup in the Health project codebase.

## 📊 Progress Summary

| Phase | Status | Details |
|-------|--------|---------|
| Phase 1: Quick Wins | ✅ Complete | 4/4 tasks done |
| Phase 2: Type Safety | 🔄 In Progress | RenderBlocks.tsx fixed, 109 `as any` remaining in 26 files |
| Phase 3: Consolidation | ⏳ Pending | - |
| Phase 4: Code Quality | ⏳ Pending | - |

---

## 🔴 Critical Issues

### 1. Heavy `as any` Usage (123+ instances)

**Problem:** The codebase has 123+ instances of `as any` type assertions, violating the project's own TypeScript rules.

**Affected Files:**
- `RenderBlocks.tsx` - 16 instances
- `respiratory-polygrophy-block/component.tsx` - 12 instances
- `vpsg-eeg-block/component.tsx` - 10 instances
- `vpsg-block/component.tsx` - 9 instances
- `mwt-block/component.tsx` - 8 instances
- `mslt-block/component.tsx` - 8 instances
- `cbti-block/component.tsx` - 7 instances
- `actigraphy-block/component.tsx` - 7 instances
- `sleep-apnea/components/test-options/component.tsx` - 6 instances
- `call-to-action-banner-block/component.tsx` - 5 instances
- `single-card/component.tsx` - 4 instances
- And 20+ more files

**Solution:**
1. Run `pnpm payload generate:types` to ensure types are up-to-date
2. Create proper type definitions for block props using `Extract<PageBlock, { blockType: 'xxx' }>`
3. Create utility types for common patterns (e.g., media, CTA buttons)
4. Fix component prop types to match Payload-generated types

---

### 2. Duplicate `isLexicalEditorState` Function

**Problem:** The same function is defined in two places:

```
src/app/(frontend)/components/hero-section/component.tsx (line 239)
src/app/(frontend)/components/ui/rich-text.tsx (line 33) - exported
```

**Solution:**
- Remove the local definition in `hero-section/component.tsx`
- Import from `@/app/(frontend)/components/ui/rich-text`

---

## 🟠 Code Organization Issues

### 3. Empty/Unused Block Directories

**Problem:** Four block directories exist but are completely empty:

```
src/app/(frontend)/components/callout-block/
src/app/(frontend)/components/mini-modal-block/
src/app/(frontend)/components/payment-options/
src/app/(frontend)/components/sleep-assessment-hero/
```

**Solution:** Delete these empty directories.

---

### 4. README File in Block Folder

**Problem:** `src/app/(frontend)/components/icon-text-block/README.md` exists but project rules state:
> "Don't add README or index.ts files for blocks"

**Solution:** Delete `icon-text-block/README.md`.

---

### 5. Navigation Utilities Fragmentation

**Problem:** Navigation logic is split across three files with unclear responsibilities:

| File | Contents | Status |
|------|----------|--------|
| `navigation.ts` | `resolveUrl`, `resolveLinkHref` | Active |
| `navigationUtils.ts` | `findNavigationItem`, `hasMegaMenu` | Mostly commented out |
| `navigation-transformers.ts` | Transform functions | Active |

**Solution:**
1. Delete `navigationUtils.ts` (mostly commented legacy code)
2. Consolidate into a single `navigation.ts` file
3. Move transformers into same file or create clear separation

---

### 6. Duplicate Button Block Implementations

**Problem:** Two very similar button blocks exist:

| Block | File | Features |
|-------|------|----------|
| `button` | `components/button/` | position, spacing, internal/external links |
| `button-block` | `components/button-block/` | simpler, includes IPD download option |

**Solution:**
1. Merge into single `button` block with all features
2. Remove `button-block/` directory
3. Update `RenderBlocks.tsx` and `Pages.ts`

---

### 7. Legacy Commented Code in `navigationUtils.ts`

**Problem:** File contains mostly commented-out legacy functions:

```typescript
/* 
export const getDisplayedItems = (
  megaMenu: NavigationItem['megaMenu'],
  selectedCategory: string | null,
) => { ... }
*/
```

**Solution:** Remove all commented code; if needed in future, it's in git history.

---

## 🟡 Type Safety Improvements

### 8. Create Shared Type Utilities

**Problem:** Many components repeat the same type patterns for:
- CTA buttons (label, linkType, internal, external)
- Media resolution
- Rich text content

**Solution:** Create `src/types/blocks.ts` with:

```typescript
// CTA Button types
export type CTALinkType = 'internal' | 'external'

export type CTAButton = {
  label?: string | null
  linkType?: CTALinkType | null
  internal?: {
    relation?: {
      relationTo?: 'pages' | 'blogs'
      value?: { slug?: string | null } | number
    } | null
  } | null
  external?: {
    href?: string | null
  } | null
  variant?: string | null
}

// Media types
export type MediaField = number | Media | null | undefined

// Rich text type guard
export function isLexicalContent(value: unknown): value is { root: unknown }
```

---

### 9. Fix RenderBlocks Type Casting

**Problem:** `RenderBlocks.tsx` uses `as any` for ~16 blocks:

```typescript
ctaBlock: (block) => {
  const b = block as Extract<PageBlock, { blockType: 'ctaBlock' }>
  return <CTABlock {...(b as any)} />  // ❌
},
```

**Solution:** Ensure component props match generated types exactly, or create adapter functions.

---

## 🔵 Consistency Improvements

### 10. Inconsistent Lucide Icon Imports

**Problem:** 32 components import icons directly from `lucide-react` instead of using the shared `icon-map.ts`:

**Direct imports (inconsistent):**
```typescript
import { CheckCircle, Clock, Brain } from 'lucide-react'
```

**vs. Shared map (preferred for CMS-selected icons):**
```typescript
import { iconMap, type IconKey } from '@/lib/icons/icon-map'
```

**Solution:**
- For static icons (not CMS-selectable): direct imports are acceptable
- For CMS-selectable icons: always use `icon-map.ts`
- Document this distinction in rules

---

### 11. Naming Inconsistency in Content Blocks

**Problem:** Three content block variants exist with unclear naming:

| Block | Purpose |
|-------|---------|
| `content-block` | Basic content with optional image |
| `content-block-v2` | Multi-column layout |
| `content-block-array` | Array of alternating content sections |

**Solution:** Consider renaming for clarity:
- `content-block` → `rich-content-block`
- `content-block-v2` → `columns-block`
- `content-block-array` → `alternating-sections-block`

Or document current naming rationale.

---

### 12. Button/CMSLink Style Duplication

**Problem:** `ui/button.tsx` and `ui/cms-link.tsx` define similar variant styles:

**button.tsx:**
```typescript
primary: 'bg-ds-accent-yellow text-white border-0 transition-all duration-200 hover:scale-[1.03]...'
```

**cms-link.tsx:**
```typescript
primary: 'bg-ds-accent-yellow text-white border-0 transition-all duration-200 hover:scale-[1.03]...'
```

**Solution:**
1. Extract shared variant styles to `design-system.ts`
2. Import and use in both components

```typescript
// design-system.ts
export const buttonVariants = {
  primary: 'bg-ds-accent-yellow text-white border-0 transition-all duration-200 hover:scale-[1.03] hover:brightness-110 active:brightness-95',
  secondary: 'bg-ds-pastille-green text-white border-0 hover:bg-ds-pastille-green/90',
  // ...
}
```

---

## 🟢 Performance & Best Practices

### 13. Add `'use client'` Directive Audit

**Problem:** Some client-side components may be missing the `'use client'` directive.

**Components to verify:**
- All components using hooks (`useState`, `useEffect`, etc.)
- All components using browser APIs
- All components with event handlers

---

### 14. Consider Block Consolidation

**Problem:** Many specialized blocks exist for similar medical services:
- `vpsg-block`
- `vpsg-eeg-block`
- `mslt-block`
- `mwt-block`
- `cbti-block`
- `actigraphy-block`
- `respiratory-polygrophy-block`

**Solution:** Evaluate if these can be consolidated into a configurable "medical-service-detail-block" with:
- Configurable sections (hero, features, CTA, etc.)
- Shared layout patterns
- Service-specific content from CMS

---

## 📋 Implementation Checklist

### Phase 1: Quick Wins (1-2 hours) ✅ COMPLETED
- [x] Delete empty directories (callout-block, mini-modal-block, payment-options, sleep-assessment-hero)
- [x] Delete `icon-text-block/README.md`
- [x] Remove duplicate `isLexicalEditorState` from hero-section
- [x] Delete `navigationUtils.ts` (moved `findNavigationItem` to `navigation.ts`)

### Phase 2: Type Safety (4-6 hours) 🔄 IN PROGRESS
- [x] Create shared type utilities in `src/types/blocks.ts`
- [ ] Run `pnpm payload generate:types`
- [x] Fixed `cta-block/component.tsx` - removed `any` types, using proper Lexical types
- [x] Fixed `blog-post-cards/component.tsx` - using ExtractBlock types
- [x] Fixed `content-block-v2/component.tsx` - removed `any` from map callback
- [x] Fixed `form-block/component.tsx` - replaced `fieldData as any` with type narrowing
- [x] Fixed `RenderBlocks.tsx` - **COMPLETE: 0 `as any` usages** (was 16)
- [x] Fixed high-offender blocks: `respiratory-polygrophy-block`, `vpsg-eeg-block`, `vpsg-block`, `mwt-block`, `mslt-block`, `cbti-block`, `actigraphy-block`, `call-to-action-banner-block`, `sleep-apnea/test-options`, `sleep-assessment-steps`
- [x] Cleared remaining `as any` usages (now 0 matches)

### Phase 3: Consolidation (4-6 hours)
- [ ] Merge button and button-block
- [ ] Extract shared button/link styles to design-system
- [ ] Consolidate navigation utilities

### Phase 4: Code Quality (2-4 hours)
- [ ] Audit `'use client'` directives
- [ ] Review and update component documentation
- [ ] Remove all remaining commented-out code

---

## Notes

- All changes should be tested thoroughly before deployment
- Run `pnpm payload generate:types` after any schema changes
- Follow existing patterns in the codebase when making changes
- Prioritize type safety fixes as they affect long-term maintainability

