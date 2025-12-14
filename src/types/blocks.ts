/**
 * Shared type utilities for Payload CMS blocks
 * These types help reduce unsafe casts across components
 */

import type { Page } from '@/payload-types'

/**
 * Extract a specific block type from Page blocks
 * Usage: type MyBlock = ExtractBlock<'contentBlock'>
 */
export type ExtractBlock<T extends PageBlockType> = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: T }
>

/**
 * All possible block type slugs
 */
export type PageBlockType = NonNullable<Page['blocks']>[number]['blockType']

/**
 * Generic page block (union of all blocks)
 */
export type PageBlock = NonNullable<Page['blocks']>[number]
