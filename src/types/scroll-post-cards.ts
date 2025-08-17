import type { Page } from '@/payload-types'

export type ScrollPostCard = {
  id: string
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  readTime: string
  category: string
  href: string
}

export type ScrollPostCardsProps = {
  title?: string
  subtitle?: string
  posts: ScrollPostCard[]
}

export type ScrollPostCardsBlock = Extract<
  NonNullable<Page['blocks']>[number],
  { blockType: 'scrollPostCards' }
>
