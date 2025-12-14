import { withPayload } from '@payloadcms/next/withPayload'
import { withBotId } from 'botid/next/config'

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
  },
}

export default withBotId(withPayload(nextConfig, { devBundleServerPackages: false }))
