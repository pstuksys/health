import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Blogs } from './collections/Blogs'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Environment variable validation
const requiredEnvVars = {
  BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN || '',
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET || '',
  POSTGRES_URL: process.env.POSTGRES_URL || '',
}

// Check for missing environment variables only in production
if (process.env.NODE_ENV === 'production') {
  const missingEnvVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key)

  if (missingEnvVars.length > 0) {
    throw new Error(`Missing required variables: ${missingEnvVars.join(', ')}.`)
  }
}

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  localization: {
    // locales: ['en', 'es', 'de'],
    locales: ['en'],
    defaultLocale: 'en',
  },
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' | Admin',
    },
    livePreview: {
      url: ({ data }) => {
        const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
        const slug = typeof data?.slug === 'string' ? data.slug : ''
        return `${base}/${slug}`
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  cors: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000', 'http://127.0.0.1:3000'],
  csrf: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000', 'http://127.0.0.1:3000'],
  collections: [Users, Media, Pages, Blogs],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-please-change',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  globals: [Header, Footer],
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: { media: true },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
    seoPlugin({
      uploadsCollection: 'media',
      collections: ['pages', 'blogs'],
      tabbedUI: true,
      generateTitle: ({ doc }) => (typeof doc?.title === 'string' ? doc.title : ''),
    }),
    formBuilderPlugin({}),
    searchPlugin({
      collections: ['pages', 'blogs'],
    }),
  ],
})
