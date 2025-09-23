read content-creation.mdc if u havent yet.

Dont forget that we already using collor pallete so the props is not really needed since we can use it from tailwind config read the file. u might need to remove not needed ts in this cases. 
  backgroundColor = "#efefee",
    primaryColor = "#faa636",
    secondaryColor = "#3d426a",
    textColor = "#547b82",

After generating types you dont need to use typescript from given code will be using payload generated types

first component and config:

```"use client"

interface HeroBannerContent {
  title: string
  paragraphs: string[]
  image: {
    src: string
    alt: string
  }
  backgroundColor?: string
  primaryColor?: string
  secondaryColor?: string
  textColor?: string
}

interface HeroBannerBlockProps {
  content: HeroBannerContent
  className?: string
}

export default function HeroBannerBlock({ content, className = "" }: HeroBannerBlockProps) {
  const {
    title,
    paragraphs,
    image,
    backgroundColor = "#efefee",
    primaryColor = "#faa636",
    secondaryColor = "#3d426a",
    textColor = "#547b82",
  } = content

  return (
    <section className={`relative overflow-hidden py-20 lg:py-32 ${className}`} style={{ backgroundColor }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content */}
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: secondaryColor }}>
              {title}
            </h1>
            <div className="text-lg leading-relaxed space-y-4" style={{ color: textColor }}>
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Circular Image Container */}
          <div className="flex-shrink-0">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <div
                className="absolute inset-0 rounded-full overflow-hidden shadow-2xl"
                style={{ backgroundColor: primaryColor }}
              >
                <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
              </div>
              <div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20"
                style={{ backgroundColor: primaryColor }}
              ></div>
              <div
                className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full opacity-30"
                style={{ backgroundColor: secondaryColor }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

second component:
```"use client"

import { useState } from "react"

interface Benefit {
  title: string
  description: string
}

interface PartnershipBenefitsContent {
  title: string
  benefits: Benefit[]
  image: {
    src: string
    alt: string
  }
  colors?: {
    titleColor?: string
    textColor?: string
    backgroundColor?: string
  }
}

interface PartnershipBenefitsBlockProps {
  content: PartnershipBenefitsContent
  className?: string
}

export default function PartnershipBenefitsBlock({ content, className = "" }: PartnershipBenefitsBlockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const {
    title,
    benefits,
    image,
    colors = {
      titleColor: "#3d426a",
      textColor: "#547b82",
      backgroundColor: "bg-gray-50",
    },
  } = content

  return (
    <section className={`py-20 ${colors.backgroundColor} ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left side - Benefits list */}
          <div className="flex-1">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-12 text-center lg:text-left"
              style={{ color: colors.titleColor }}
            >
              {title}
            </h2>

            <div className="space-y-1">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`p-6 border-b border-gray-200 cursor-pointer transition-all duration-300 ${
                    hoveredIndex === index ? "bg-white shadow-md transform translate-x-2" : "bg-transparent"
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <h3 className="font-semibold text-lg mb-2" style={{ color: colors.titleColor }}>
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: colors.textColor }}>
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Sticky image with proper container */}
          <div className="flex-shrink-0 lg:w-96">
            <div className="lg:sticky lg:top-24">
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

third component:
```"use client"

import { Button } from "@/components/ui/button"

interface HighlightSectionContent {
  title: string
  description: string
  button: {
    text: string
    onClick?: () => void
  }
  image: {
    src: string
    alt: string
    overlayText?: {
      main: string
      subtitle: string
    }
  }
  colors?: {
    titleColor?: string
    textColor?: string
    buttonColor?: string
    borderColor?: string
    backgroundColor?: string
  }
}

interface HighlightSectionBlockProps {
  content: HighlightSectionContent
  className?: string
}

export default function HighlightSectionBlock({ content, className = "" }: HighlightSectionBlockProps) {
  const {
    title,
    description,
    button,
    image,
    colors = {
      titleColor: "#3d426a",
      textColor: "#547b82",
      buttonColor: "#faa636",
      borderColor: "#faa636",
      backgroundColor: "bg-white",
    },
  } = content

  return (
    <section className={`py-20 ${colors.backgroundColor} ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Content side */}
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6"
              style={{ color: colors.titleColor }}
            >
              {title}
            </h2>
            <div className="text-base md:text-lg leading-relaxed mb-6 lg:mb-8" style={{ color: colors.textColor }}>
              <p>{description}</p>
            </div>
            <Button
              size="lg"
              className="text-sm md:text-lg px-6 md:px-8 py-3 md:py-4 font-semibold text-white transition-colors duration-300 hover:opacity-90 w-full sm:w-auto"
              style={{ backgroundColor: colors.buttonColor }}
              onClick={button.onClick}
            >
              {button.text}
            </Button>
          </div>

          {/* Visual element side - Single large circle with image */}
          <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div
                className="absolute inset-0 rounded-full overflow-hidden shadow-2xl border"
                style={{ borderColor: colors.borderColor, borderWidth: "1px" }}
              >
                <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
                {/* Overlay with subtle branding */}
                {image.overlayText && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end justify-center pb-4 md:pb-8">
                    <div className="text-white text-center">
                      <div className="text-lg md:text-2xl font-bold">{image.overlayText.main}</div>
                      <div className="text-xs md:text-sm opacity-90">{image.overlayText.subtitle}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```