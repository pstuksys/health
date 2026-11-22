import { draftMode } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { safeRedirectPath } from '@/lib/preview'

/** Turn draft mode off and go back to the published page at `?path=`. */
export async function GET(request: NextRequest) {
  const dm = await draftMode()
  dm.disable()

  const path = safeRedirectPath(request.nextUrl.searchParams.get('path'))
  return NextResponse.redirect(new URL(path, request.url))
}
