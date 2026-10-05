import { useSyncExternalStore } from 'react'

function subscribe() {
  return () => {}
}

// false during SSR and the hydration render, true afterwards — without a setState-in-effect re-render
export const useIsHydrated = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
