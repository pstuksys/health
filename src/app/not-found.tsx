import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ds-dark-blue to-ds-dark-blue/90 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-ds-pastille-green to-ds-accent-yellow bg-clip-text text-transparent leading-none">
            404
          </h1>
        </div>

        <div className="mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">Page Not Found</h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-lg mx-auto">
            Sorry, we couldn't find the page you're looking for. The page might have been moved,
            deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button
              size="lg"
              className="bg-ds-accent-yellow hover:ds-accent-yellow/90 text-ds-dark-blue font-bold px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Go Back Home
            </Button>
          </Link>

          <Link href="/contact">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-ds-dark-blue font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105 bg-transparent"
            >
              Contact Support
            </Button>
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-white/20">
          <p className="text-white/60 mb-4">You might be looking for:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/services"
              className="text-ds-pastille-green hover:text-ds-accent-yellow transition-colors"
            >
              Our Services
            </Link>
            <Link
              href="/about"
              className="text-ds-pastille-green hover:text-ds-accent-yellow transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/blog"
              className="text-ds-pastille-green hover:text-ds-accent-yellow transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-ds-pastille-green hover:text-ds-accent-yellow transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
