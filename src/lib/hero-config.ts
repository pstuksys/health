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
