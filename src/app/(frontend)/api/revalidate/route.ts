import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }
  const body = await req.json().catch(() => ({}))
  const tags = Array.isArray(body?.tags) ? (body.tags as string[]) : []
  tags.forEach((t) => revalidateTag(t))
  return NextResponse.json({ revalidated: true, tags })
}
