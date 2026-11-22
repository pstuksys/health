import { draftMode } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { getPayloadClient } from '@/lib/cms/payload-client'
import { relativeRedirect } from '@/lib/preview'

/**
 * Turn on draft mode so unpublished changes are shown, then go to `?path=`.
 * Used by the admin "Preview" buttons. Only editors and admins may enable it,
 * matching who can read drafts in the admin (Pages/Blogs access rules);
 * viewers only see published content there, so they don't get previews either.
 */
export async function GET(request: NextRequest) {
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: request.headers })

  if (!user) {
    return new NextResponse('Log in to the admin to preview drafts.', { status: 401 })
  }

  const role = (user as { role?: string }).role
  if (role !== 'editor' && role !== 'admin') {
    return new NextResponse('Only editors and admins can preview drafts.', { status: 403 })
  }

  const dm = await draftMode()
  dm.enable()

  return relativeRedirect(request.nextUrl.searchParams.get('path') ?? '/')
}
