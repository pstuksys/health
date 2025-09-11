import type { Header, Footer } from '@/payload-types'
import { getCachedHeaderFooter } from './payload-client'

type HeaderFooter = { header: Header | null; footer: Footer | null }

export const getHeaderFooter = (): Promise<HeaderFooter> => getCachedHeaderFooter()
