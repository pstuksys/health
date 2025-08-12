import { draftMode, headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const dm = await draftMode()
  dm.enable()
  const h = await headers()
  const referer = h.get('referer') || ''
  const origin = h.get('origin') || (referer ? new URL(referer).origin : undefined)
  const base = origin ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  return NextResponse.redirect(new URL('/', base))
}
