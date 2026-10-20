import { useCallback, useSyncExternalStore } from 'react'

// This code is looking for touch screens devices
// export const useIsMobile = (query = "(pointer: coarse) and (max-width: 768px)") => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const mediaQuery = window.matchMedia(query);
//     setIsMobile(mediaQuery.matches);

//     const handler = (event: MediaQueryListEvent) => setIsMobile(event.matches);
//     mediaQuery.addEventListener("change", handler);

//     return () => mediaQuery.removeEventListener("change", handler);
//   }, [query]);

//   return isMobile;
// };

export const useIsMobile = (query = '(max-width: 768px)') => {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mediaQuery = window.matchMedia(query)
      mediaQuery.addEventListener('change', onChange)
      return () => mediaQuery.removeEventListener('change', onChange)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}
