/**
 * Single source of truth for hero text color configuration
 * This prevents mismatches between CMS options and component logic
 */

export type HeroTextColor = 'auto' | 'light' | 'dark' | 'green' | 'yellow'

export const HERO_TEXT_COLOR_OPTIONS = [
  { label: 'Auto (based on background)', value: 'auto' },
  { label: 'Light (white/light)', value: 'light' },
  { label: 'Dark (dark text)', value: 'dark' },
  { label: 'Green', value: 'green' },
  { label: 'Yellow', value: 'yellow' },
]

/**
 * Maps hero text color values to CSS classes
 */
export function getHeroTextColorClass(
  textColor: HeroTextColor,
  hasBackground: boolean = false,
): string {
  if (textColor === 'dark') {
    return 'text-ds-dark-blue'
  }
  if (textColor === 'light') {
    return 'text-white'
  }
  if (textColor === 'green') {
    return 'text-ds-pastille-green'
  }
  if (textColor === 'yellow') {
    return 'text-ds-accent-yellow'
  }
  // Auto - based on background
  if (hasBackground) {
    return 'text-white'
  }
  return 'text-ds-dark-blue'
}

/**
 * Validates and normalizes hero text color values
 * Returns 'auto' for any invalid values
 */
export function normalizeHeroTextColor(rawValue: unknown): HeroTextColor {
  if (
    rawValue === 'auto' ||
    rawValue === 'light' ||
    rawValue === 'dark' ||
    rawValue === 'green' ||
    rawValue === 'yellow'
  ) {
    return rawValue
  }
  return 'auto'
}

/**
 * Hero alignment type
 */
export type HeroAlignment = 'left' | 'center' | 'right'

/**
 * Get alignment classes for hero content (text and buttons)
 * Includes max-width constraint for better readability
 */
export function getHeroAlignmentClasses(alignment: HeroAlignment) {
  switch (alignment) {
    case 'center':
      return {
        text: 'mx-auto text-center',
        buttons: 'justify-center',
      }
    case 'right':
      return {
        text: 'ml-auto text-right',
        buttons: 'justify-end',
      }
    case 'left':
    default:
      return {
        text: 'mr-auto text-left',
        buttons: 'justify-start',
      }
  }
}

export type HeroOverlayDarkness = 'none' | 'light' | 'medium' | 'dark' | 'very-dark'

export const HERO_OVERLAY_DARKNESS_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Light (10%)', value: 'light' },
  { label: 'Medium (30%)', value: 'medium' },
  { label: 'Dark (50%)', value: 'dark' },
  { label: 'Very Dark (70%)', value: 'very-dark' },
]

export function normalizeHeroOverlayDarkness(rawValue: unknown): HeroOverlayDarkness {
  if (
    rawValue === 'none' ||
    rawValue === 'light' ||
    rawValue === 'medium' ||
    rawValue === 'dark' ||
    rawValue === 'very-dark'
  ) {
    return rawValue
  }
  return 'medium'
}

export function getHeroOverlayClass(darkness?: HeroOverlayDarkness | null): string {
  switch (darkness) {
    case 'none':
      return 'bg-transparent'
    case 'light':
      return 'bg-black/10'
    case 'medium':
      return 'bg-black/30'
    case 'dark':
      return 'bg-black/50'
    case 'very-dark':
      return 'bg-black/70'
    default:
      return 'bg-black/30'
  }
}
