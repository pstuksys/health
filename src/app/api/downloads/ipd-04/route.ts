import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const FILE_NAME = 'IPD-04_Actigraphy_Patient_Information.pdf'
const PUBLIC_PATH = path.join(process.cwd(), 'public', FILE_NAME)

export async function GET() {
  try {
    const fileBuffer = await fs.readFile(PUBLIC_PATH)
    const arrayBuffer = fileBuffer.buffer.slice(
      fileBuffer.byteOffset,
      fileBuffer.byteOffset + fileBuffer.byteLength,
    ) as ArrayBuffer

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${FILE_NAME}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Failed to serve PDF download:', error)
    return new NextResponse('File not found', { status: 404 })
  }
}
