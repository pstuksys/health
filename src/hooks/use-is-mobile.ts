import { useEffect, useState } from 'react'

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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)
    setIsMobile(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => setIsMobile(event.matches)
    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return isMobile
}
