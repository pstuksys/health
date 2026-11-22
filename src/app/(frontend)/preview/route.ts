import { draftMode } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { getPayloadClient } from '@/lib/cms/payload-client'
import { safeRedirectPath } from '@/lib/preview'

/**
 * Turn on draft mode so unpublished changes are shown, then go to `?path=`.
 * Used by the admin "Preview" buttons. Only logged-in admin users may enable
 * it; otherwise anyone could browse unpublished drafts.
 */
export async function GET(request: NextRequest) {
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: request.headers })

  if (!user) {
    return new NextResponse('Log in to the admin to preview drafts.', { status: 401 })
  }

  const dm = await draftMode()
  dm.enable()

  const path = safeRedirectPath(request.nextUrl.searchParams.get('path'))
  return NextResponse.redirect(new URL(path, request.url))
}
