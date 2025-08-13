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
// import { revalidateOnChange } from './hooks/revalidate'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const blobToken = process.env.BLOB_READ_WRITE_TOKEN || ''
if (!blobToken) {
  throw new Error('BLOB_READ_WRITE_TOKEN is required for Vercel Blob storage')
}

export default buildConfig({
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
  collections: [Users, Media, Pages, Blogs],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
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
    vercelBlobStorage({
      collections: { media: true },
      token: blobToken,
    }),
    seoPlugin({
      uploadsCollection: 'media',
      collections: ['pages', 'blogs'],
      tabbedUI: true,
      generateTitle: ({ doc }) => (typeof doc?.title === 'string' ? doc.title : ''),
      generateDescription: ({ doc }) =>
        typeof doc?.metadata?.description === 'string' ? doc.metadata.description : '',
    }),
    formBuilderPlugin({}),
    searchPlugin({
      collections: ['pages', 'blogs'],
    }),
  ],
})
