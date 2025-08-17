export type TwoCardBlockLink = {
  text: string
  variant: 'primary' | 'secondary'
  href: string
  external?: boolean
}

export type TwoCardBlockItem = {
  image: string
  title: string
  description: string
  links: TwoCardBlockLink[]
}

export type TwoCardBlockField = {
  title: string
  subtitle?: string
  items: TwoCardBlockItem[]
}
