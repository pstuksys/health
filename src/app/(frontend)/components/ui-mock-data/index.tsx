'use client'

import { useState } from 'react'
// import { Banner } from './components/banner/component'
import { HeroSection } from '../hero-section/component'
import { CTABlock } from '../cta-block/component'
import { MediaBlock } from '../media-block/component'
import { ContentBlock } from '../content-block/component'
import { CardSection } from '../card-section/component'
import { AboutUsSection } from '../about-us-section/component'
import { PartnersBlock } from '../partners-block/component'
import { BlogPostCards } from '../blog-post-cards/component'
import { Carousel } from '../carousel/component'
import { ModalSearch } from '../modal-search/component'

export default function MockData() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const cards = [
    {
      image: '/placeholder.svg',
      title: 'Web Design',
      text: 'Create stunning, responsive websites that engage your audience and drive results.',
      href: '/services/web-design',
    },
    {
      image: '/placeholder.svg',
      title: 'Mobile Development',
      text: 'Build powerful mobile applications for iOS and Android platforms.',
      href: '/services/mobile-development',
    },
    {
      image: '/placeholder.svg',
      title: 'Digital Marketing',
      text: 'Grow your business with data-driven marketing strategies and campaigns.',
      href: '/services/digital-marketing',
    },
  ]

  const partners = [
    { logo: '/placeholder.svg', name: 'TechCorp', href: 'https://example.com' },
    { logo: '/placeholder.svg', name: 'StartupCo', href: 'https://example.com' },
    { logo: '/placeholder.svg', name: 'Enterprise Ltd', href: 'https://example.com' },
    { logo: '/placeholder.svg', name: 'InnovateCorp', href: 'https://example.com' },
    { logo: '/placeholder.svg', name: 'DigitalPro', href: 'https://example.com' },
    { logo: '/placeholder.svg', name: 'ConsultMax', href: 'https://example.com' },
  ]

  const blogPosts = [
    {
      image: '/placeholder.svg',
      title: 'The Future of Web Development: Trends to Watch in 2024',
      excerpt:
        'Discover the latest trends shaping the web development landscape and how they can benefit your business.',
      href: '/blog/web-development-trends-2024',
      date: 'March 15, 2024',
      author: 'John Smith',
    },
    {
      image: '/placeholder.svg',
      title: 'Creating User-Friendly Mobile App Interfaces',
      excerpt:
        'Learn the principles of mobile UI/UX design that keep users engaged and coming back for more.',
      href: '/blog/mobile-app-interfaces',
      date: 'March 10, 2024',
      author: 'Sarah Johnson',
    },
    {
      image: '/placeholder.svg',
      title: '5 Digital Marketing Strategies That Actually Work',
      excerpt:
        'Proven strategies to boost your online presence and drive meaningful engagement with your audience.',
      href: '/blog/digital-marketing-strategies',
      date: 'March 5, 2024',
      author: 'Mike Davis',
    },
  ]

  const carouselItems = [
    {
      image: '/placeholder.svg',
      title: 'Amazing Results',
      description: 'Working with this team transformed our business completely.',
      href: '/testimonials/client-1',
    },
    {
      image: '/placeholder.svg',
      title: 'Professional Service',
      description: 'Exceptional quality and attention to detail in every project.',
      href: '/testimonials/client-2',
    },
    {
      image: '/placeholder.svg',
      title: 'Exceeded Expectations',
      description: 'They delivered more than we asked for and on time.',
      href: '/testimonials/client-3',
    },
    {
      image: '/placeholder.svg',
      title: 'Outstanding Support',
      description: 'Always available to help and provide expert guidance.',
      href: '/testimonials/client-4',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* <Banner
        text="🎉 New website launch! Get 20% off all services this month."
        ctaButton={{ label: 'Learn More', href: '/promotion' }}
        dismissible
      /> */}
      <HeroSection
        title="Build Your <strong>Digital Future</strong> Today"
        subtitle="We create stunning websites and applications that help your business grow and succeed in the digital world."
        backgroundImage="/placeholder.svg"
        gradientOverlay
        ctaButton={{ label: 'Start Your Project', href: '/contact' }}
        secondaryCTA={{ label: 'View Our Work', href: '/portfolio' }}
      />
      <MediaBlock
        image="/placeholder.svg"
        title="Why Choose Our Team?"
        content="<p>We combine creativity with technical expertise to deliver exceptional results. Our team of experienced developers and designers work closely with you to bring your vision to life.</p><p>With over 100 successful projects completed, we understand what it takes to create digital solutions that drive real business growth.</p>"
        ctaButton={{ label: 'Meet Our Team', href: '/about' }}
      />
      <CardSection cards={cards} />
      <CTABlock
        title="Ready to Transform Your Business?"
        description="Join hundreds of satisfied clients who have already taken their business to the next level with our expert solutions."
        ctaButton={{ label: 'Get Free Consultation', href: '/consultation' }}
        variant="gradient"
      />
      <ContentBlock
        title="Our Process"
        content="<p>We follow a proven methodology that ensures your project is delivered on time, within budget, and exceeds your expectations.</p><p><strong>Discovery:</strong> We start by understanding your business goals and requirements.</p><p><strong>Design:</strong> Our designers create beautiful, user-friendly interfaces.</p><p><strong>Development:</strong> Our developers bring the designs to life with clean, efficient code.</p><p><strong>Launch:</strong> We deploy your project and provide ongoing support.</p>"
        layout="split"
        image="/placeholder.svg"
      />
      <AboutUsSection
        title="About Our Company"
        content="<p>Founded in 2020, we've been helping businesses succeed in the digital world through innovative web solutions and exceptional customer service.</p><p>Our mission is to make high-quality web development accessible to businesses of all sizes, from startups to enterprise companies.</p>"
        image="/placeholder.svg"
        ctaButton={{ label: 'Learn More', href: '/about' }}
      />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-light text-center text-ds-dark-blue mb-12">
            What Our Clients Say
          </h2>
          <Carousel items={carouselItems} slidesToShow={3} autoplay />
        </div>
      </section>
      <PartnersBlock partners={partners} />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-light text-center text-ds-dark-blue mb-12">
            Latest from Our Blog
          </h2>
          <BlogPostCards posts={blogPosts} />
        </div>
      </section>
      <ModalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={() => setIsSearchOpen(false)}
      />
    </div>
  )
}
