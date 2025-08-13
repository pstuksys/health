export const colors = {
  darkBlue: '#3d426a',
  pastilleGreen: '#547b82',
  accentYellow: '#faa636',
  lightNeutral: '#efefee',
} as const

export const typography = {
  heading: 'font-heading font-light',
  subheading: 'font-heading font-semibold',
  body: 'font-sans font-light',
  cta: 'font-sans font-semibold',
} as const

export const gradients = {
  blueGreen: 'bg-gradient-blue-green',
  subtle: 'bg-gradient-subtle',
} as const

export type AlignmentType = 'left' | 'center' | 'right'

export const getAlignmentClasses = (align: AlignmentType): string => {
  switch (align) {
    case 'center':
      return 'text-center items-center justify-center'
    case 'right':
      return 'text-right items-end justify-end'
    default:
      return 'text-left items-start justify-start'
  }
}

export const animations = {
  scroll: 'animate-scroll',
} as const
