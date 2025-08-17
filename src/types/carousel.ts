export type CarouselItem = {
  image: string
  title: string
  description?: string
  href?: string
}

export type CarouselField = {
  title?: string
  subtitle?: string
  items: CarouselItem[]
  slidesToShow?: number
  autoplay?: boolean
  autoplayInterval?: number
  showArrows?: boolean
  showDots?: boolean
}
