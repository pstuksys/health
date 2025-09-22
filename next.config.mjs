import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Standard responsive breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // For icons/thumbnails
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/media/**',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com', // for production blob storage
      },
      {
        protocol: 'https',
        hostname: 'health-dusky-sigma.vercel.app',
        pathname: '/api/media/**',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
        pathname: '/api/media/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
