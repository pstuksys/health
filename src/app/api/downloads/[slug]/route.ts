import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const FILE_MAP: Record<string, string> = {
  ano: 'ano-ipd-leaflet.pdf',
  polywatch: 'polywatch-ipd-guide.pdf',
  somfit: 'somfit-pro-sleep-study-instructions.pdf',
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const fileName = FILE_MAP[slug]

  if (!fileName) return new NextResponse('Not found', { status: 404 })

  try {
    const filePath = path.join(process.cwd(), 'public', fileName)
    const fileBuffer = await fs.readFile(filePath)

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(fileName)}`,
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    console.error('Failed to serve PDF download:', error)
    return new NextResponse('File not found', { status: 404 })
  }
}
