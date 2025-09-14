import type { Header } from '@/payload-types'

// Extract types from Header interface
type NavigationItem = NonNullable<Header['navigation']>[number]

export const getDisplayedItems = (
  megaMenu: NavigationItem['megaMenu'],
  selectedCategory: string | null,
) => {
  if (!megaMenu?.categories) return []

  if (selectedCategory) {
    const category = megaMenu.categories.find((cat) => cat.title === selectedCategory)
    return category?.items || []
  }

  // Default to first category's items
  return megaMenu.categories[0]?.items || []
}

export const findNavigationItem = (items: NavigationItem[], label: string) => {
  return items.find((item) => item.label === label)
}

export const hasMegaMenu = (item: NavigationItem) => {
  return Boolean(item.megaMenu?.categories)
}

export const getFirstCategoryTitle = (megaMenu: NavigationItem['megaMenu']) => {
  return megaMenu?.categories?.[0]?.title || null
}
