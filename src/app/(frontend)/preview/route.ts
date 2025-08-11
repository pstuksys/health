import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const dm = await draftMode()
  dm.enable()
  return NextResponse.redirect(
    new URL('/', process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  )
}
