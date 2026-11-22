import { draftMode } from 'next/headers'
import type { NextRequest } from 'next/server'
import { refererPath, relativeRedirect } from '@/lib/preview'

/**
 * Turn draft mode off and go back to the published version of the page:
 * `?path=` if given, otherwise the page the editor clicked "Exit preview" on.
 */
export async function GET(request: NextRequest) {
  const dm = await draftMode()
  dm.disable()

  const path = request.nextUrl.searchParams.get('path') ?? refererPath(request.headers)
  return relativeRedirect(path)
}
