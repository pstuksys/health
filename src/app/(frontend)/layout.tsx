import type React from 'react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { NavigationMenu } from './components/navigation-menu'
import { Footer } from './components/footer/component'
// import { Banner } from './components/banner/component'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Design System App',
  description: 'Built with custom design system',
  generator: 'v0.app',
}

// Sample navigation data - this will be your single source of truth
const navigationItems = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Services',
    megaMenu: {
      categories: [
        {
          title: 'Web Development',
          items: [
            { label: 'Frontend Development', href: '/services/frontend' },
            { label: 'Backend Development', href: '/services/backend' },
            { label: 'Full Stack Development', href: '/services/fullstack' },
          ],
        },
        {
          title: 'Design',
          items: [
            { label: 'UI/UX Design', href: '/services/ui-ux' },
            { label: 'Brand Identity', href: '/services/branding' },
            { label: 'Web Design', href: '/services/web-design' },
          ],
        },
      ],
      featured: [
        { label: 'Custom Solutions', href: '/services/custom' },
        { label: 'Consulting', href: '/services/consulting' },
      ],
    },
  },
  {
    label: 'Portfolio',
    href: '/portfolio',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
]

// Sample footer data - this will be your single source of truth
const footerLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'Support', href: '/support' },
]

const socialLinks = [
  { icon: '📘', href: 'https://facebook.com' },
  { icon: '🐦', href: 'https://twitter.com' },
  { icon: '📷', href: 'https://instagram.com' },
  { icon: '💼', href: 'https://linkedin.com' },
]

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} antialiased`}>
      <body className="font-sans bg-ds-light-neutral">
        {/* TODO enable banner if needed via config and add the text with route. */}
        {/* <Banner
        text="🎉 New website launch! Get 20% off all services this month."
        ctaButton={{ label: 'Learn More', href: '/promotion' }}
        dismissible
      /> */}
        <NavigationMenu
          items={navigationItems}
          ctaButton={{ label: 'Get Started', href: '/contact' }}
          sticky
        />
        <main className="min-h-screen">{children}</main>
        <Footer
          about="We are a digital agency focused on creating exceptional web experiences that help businesses grow and succeed in the modern digital landscape."
          socialLinks={socialLinks}
          footerLinks={footerLinks}
        />
      </body>
    </html>
  )
}
