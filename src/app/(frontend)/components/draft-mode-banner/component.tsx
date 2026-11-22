import { draftMode } from 'next/headers'

/**
 * Shown while draft mode is on (after an admin "Preview"), so editors know
 * they're looking at unpublished changes and can switch back.
 */
export async function DraftModeBanner() {
  const { isEnabled } = await draftMode()
  if (!isEnabled) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] flex items-center justify-center gap-3 bg-ds-dark-blue px-4 py-2 text-sm text-white">
      <span>You are previewing unpublished changes.</span>
      {/* Plain <a>: the exit route sets a cookie and redirects, so it needs a full request */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/preview/exit" className="font-semibold text-ds-accent-yellow underline">
        Exit preview
      </a>
    </div>
  )
}
