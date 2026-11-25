import { useEffect, useState } from 'react'

// Third-party embeds (Semble booking, Doctify) can be held back by the cookie consent banner
// until the visitor accepts, so their load events never fire. After this long, show a fallback link.
export const EMBED_LOAD_TIMEOUT_MS = 10_000

/** True once `active` has stayed true for `ms`; resets whenever `active` goes false. */
export function useLoadTimeout(active: boolean, ms = EMBED_LOAD_TIMEOUT_MS): boolean {
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    if (!active) return
    const timer = setTimeout(() => setTimedOut(true), ms)
    return () => {
      clearTimeout(timer)
      setTimedOut(false)
    }
  }, [active, ms])

  return active && timedOut
}
